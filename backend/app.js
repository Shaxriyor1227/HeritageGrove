const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const customerCardRoute = require("./routes/customerCardRoute");
const subscriberRoutes = require("./routes/subscriberRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { setupSwagger } = require("./swagger/swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_ORIGIN === "*" ? "*" : [CLIENT_ORIGIN, "http://localhost:5173"],
  credentials: true,
}));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api", userRoutes);
app.use("/api", customerRoutes);
app.use("/api", customerCardRoute);
app.use("/api", subscriberRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Swagger Documentation
setupSwagger(app);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// Database sync and server start
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL database synchronized successfully with Sequelize.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    // Server start anyway so user can see API docs or fix db connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (DB offline, check credentials)`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  });

module.exports = app;
