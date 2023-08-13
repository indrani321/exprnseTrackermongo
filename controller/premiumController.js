const path = require('path');
const mongoose = require('mongoose');
const Rozarpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
const { generateAccessToken } = require('../utils/token');
const dotenv = require('dotenv').config();

const purchasePremium = async (req, res, next) => {
    try {
        var rzp = new Rozarpay({
            key_id: `${process.env.RAZORPAY_KEY_ID}`,
            key_secret: `${process.env.RAZORPAY_KEY_SECRECT}`
        });
        const amount = 4500;
        const order = await rzp.orders.create({ amount, currency: 'INR' });

        const newOrder = new Order({
            orderid: order.id,
            status: 'PENDING'
        });

        await newOrder.save();

        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const order_id = req.body.order_id;
        const payment_id = req.body.payment_id;
        const userId = req.user.id;

        const order = await Order.findOne({ orderid: order_id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.updateOne({ paymentid: payment_id, status: 'SUCCESS' });

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.updateOne({ ispremiumuser: true });

        const token = generateAccessToken(userId, true);

        res.status(201).json({ message: 'Transaction successful', token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateFailure = async (req, res, next) => {
    try {
        const order_id = req.body.order_id;
        const order = await Order.findOne({ orderid: order_id });
        await order.updateOne({ status: 'FAILURE' });
        res.status(200).json({ message: 'Order status updated to FAILURE' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { purchasePremium, updateOrder, updateFailure };
