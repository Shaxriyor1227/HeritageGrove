const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Heritage Grove handcrafted ceramic products management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve ceramic products with optional search, category, and sorting
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (e.g. Vases, Tableware, Decor)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query matching name or description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price-low, price-high, name]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
router.get("/products", productController.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get single product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new artisanal ceramic product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               tag:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               inStock:
 *                 type: boolean
 *               stockCount:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 */
router.post("/products", productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/products/:id", productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
