const express = require("express");
const router = express.Router();
const subscriberController = require("../controller/subscriberController");

/**
 * @swagger
 * tags:
 *   name: Subscribers
 *   description: Newsletter subscription management
 */

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     tags: [Subscribers]
 *     summary: Subscribe an email to the newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       200:
 *         description: Already subscribed
 *       400:
 *         description: Invalid email format
 *       500:
 *         description: Server error
 */
router.post("/subscribe", subscriberController.subscribe);

/**
 * @swagger
 * /api/subscribers:
 *   get:
 *     tags: [Subscribers]
 *     summary: Get all subscribers
 *     responses:
 *       200:
 *         description: List of subscribers
 *       500:
 *         description: Server error
 */
router.get("/subscribers", subscriberController.getSubscribers);

/**
 * @swagger
 * /api/subscribers/{id}:
 *   delete:
 *     tags: [Subscribers]
 *     summary: Delete a subscriber by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subscriber ID
 *     responses:
 *       200:
 *         description: Subscriber deleted
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Server error
 */
router.delete("/subscribers/:id", subscriberController.deleteSubscriber);

module.exports = router;
