const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Heritage Grove customer order and checkout operations
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Place a new order from cart checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_name
 *               - customer_phone
 *               - shipping_address
 *               - items
 *             properties:
 *               customer_name:
 *                 type: string
 *               customer_email:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               shipping_address:
 *                 type: string
 *               payment_method:
 *                 type: string
 *                 enum: [cash_on_delivery, member_card, card]
 *               notes:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - price
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: integer
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid order payload
 */
router.post("/orders", orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get all customer orders with order items
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/orders", orderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/orders/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Update order status
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status
 */
router.patch("/orders/:id/status", orderController.updateOrderStatus);

module.exports = router;
