const { Product } = require("../models");
const { validateProduct } = require("../validations/productValidation");
const { Op } = require("sequelize");

const INITIAL_PRODUCTS = [
  {
    name: "Celadon Crane Tall Vase",
    category: "Vases",
    price: 185,
    tag: "Bestseller",
    description: "Fluted porcelain finished in pale celadon glaze with hand-carved crane motifs.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 15,
  },
  {
    name: "Pine Mist Tea Set",
    category: "Tableware",
    price: 140,
    tag: "Limited Edition",
    description: "Four ceremonial cups and a wood-handled kyusu teapot glazed in slate mist.",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 8,
  },
  {
    name: "Earthen Grove Fruit Bowl",
    category: "Decor",
    price: 95,
    tag: "New Arrival",
    description: "Hand-thrown stoneware bowl with unglazed rim revealing natural mineral specks.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 22,
  },
  {
    name: "Canyon Ribbed Incense Burner",
    category: "Decor",
    price: 65,
    tag: "Artisan Favorite",
    description: "Sculptural ribbed vessel designed for long burning coils and dried botanicals.",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 30,
  },
  {
    name: "Mountain Dusk Serving Platter",
    category: "Tableware",
    price: 120,
    tag: "Handmade",
    description: "Wide oval platter with reactive iron slip mimicking dusk over fogged ridges.",
    image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 12,
  },
  {
    name: "Lotus Petal Water Basin",
    category: "Vases",
    price: 210,
    tag: "Signature",
    description: "Low silhouette vessel ideal for ikebana, floating floral blooms, or centerpiece display.",
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 6,
  },
];

let isSeeded = false;
const productCache = new Map();
const CACHE_TTL_MS = 30000; // 30 seconds

const clearProductCache = () => {
  productCache.clear();
};

// Helper to seed products if database table is empty (runs only once)
const ensureProductsSeeded = async () => {
  if (isSeeded) return;
  try {
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(INITIAL_PRODUCTS);
      console.log("PostgreSQL: Initial Heritage Grove products seeded successfully.");
    } else {
      // Sync image fixes for tea set and fruit bowl in PostgreSQL
      await Product.update(
        { image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80" },
        { where: { name: "Pine Mist Tea Set" } }
      );
      await Product.update(
        { image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80" },
        { where: { name: "Earthen Grove Fruit Bowl" } }
      );
    }
    isSeeded = true;
  } catch (err) {
    console.warn("Product seed check warning:", err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    await ensureProductsSeeded();

    const cacheKey = JSON.stringify(req.query);
    const cached = productCache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      res.setHeader("X-Cache", "HIT");
      res.setHeader("Cache-Control", "public, max-age=30");
      return res.status(200).json(cached.data);
    }

    const { category, search, sort, tag } = req.query;
    const where = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (tag) {
      where.tag = tag;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    let order = [["id", "ASC"]];
    if (sort === "price-low") {
      order = [["price", "ASC"]];
    } else if (sort === "price-high") {
      order = [["price", "DESC"]];
    } else if (sort === "name") {
      order = [["name", "ASC"]];
    }

    const products = await Product.findAll({ where, order });

    productCache.set(cacheKey, { timestamp: now, data: products });
    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "public, max-age=30");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = await Product.create(req.body);
    clearProductCache();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    await product.update(req.body);
    clearProductCache();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const deleted = product.toJSON();
    await product.destroy();
    clearProductCache();
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
