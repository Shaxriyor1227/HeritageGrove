const express = require("express");
const router = express.Router();
const customerCardController = require("../controller/customerCardController");

/**
 * @swagger
 * tags:
 *   name: CustomerCards
 *   description: Customer card management
 */

/**
 * @swagger
 * /api/customer-cards:
 *   post:
 *     tags: [CustomerCards]
 *     summary: Create a new customer card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - number
 *               - customer_id
 *               - year
 *               - month
 *               - is_active
 *               - is_main
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               customer_id:
 *                 type: integer
 *               year:
 *                 type: integer
 *               month:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Customer card created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/customer-cards", customerCardController.createCustomerCard);

/**
 * @swagger
 * /api/customer-cards:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get all customer cards
 *     responses:
 *       200:
 *         description: List of customer cards
 *       500:
 *         description: Server error
 */
router.get("/customer-cards", customerCardController.getCustomerCards);

/**
 * @swagger
 * /api/customer-cards/search:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Search customer cards by name, phone, number, year, or month
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for name, phone, card number, year, or month
 *     responses:
 *       200:
 *         description: List of customer cards matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get("/customer-cards/search", customerCardController.searchCustomerCard);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer card ID
 *     responses:
 *       200:
 *         description: Customer card details
 *       404:
 *         description: Customer card not found
 *       500:
 *         description: Server error
 */
router.get("/customer-cards/:id", customerCardController.getCustomerCardById);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   put:
 *     tags: [CustomerCards]
 *     summary: Update customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               customer_id:
 *                 type: integer
 *               year:
 *                 type: integer
 *               month:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Customer card updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Customer card not found
 *       500:
 *         description: Server error
 */
router.put("/customer-cards/:id", customerCardController.updateCustomerCard);

/**
 * @swagger
 * /api/customer-cards/{id}:
 *   delete:
 *     tags: [CustomerCards]
 *     summary: Delete customer card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Customer card ID
 *     responses:
 *       200:
 *         description: Customer card deleted
 *       404:
 *         description: Customer card not found
 *       500:
 *         description: Server error
 */
router.delete("/customer-cards/:id", customerCardController.deleteCustomerCard);

module.exports = router;
