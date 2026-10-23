const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API with Swagger & PostgreSQL",
      version: "1.0.0",
      description: "PostgreSQL, Sequelize, and Express REST API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),
    "./routes/*.js",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { setupSwagger };
