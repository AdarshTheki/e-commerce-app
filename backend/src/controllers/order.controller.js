import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const payOrder = asyncHandler(async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.user._id });

        if (!userCart) {
            return res.status(400).json({
                success: false,
                message: "No cart found",
            });
        }

        const newOrder = await Order.create({
            user: req.user._id,
            products: userCart.items,
            totals: req.body.totals,
            status: "success",
        });

        if (!newOrder) {
            return res.status(400).json({
                success: false,
                message: "Order not created",
            });
        }

        userCart.items = [];
        await userCart.save();

        return res
            .status(200)
            .json({ success: true, newOrder, message: " Order Success" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
});

const paymentVerification = asyncHandler(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

    try {
        let concatString = razorpay_order_id + "|" + razorpay_payment_id;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(concatString)
            .digest("hex");

        let status =
            razorpay_signature === generated_signature ? "success" : "pending";

        // Save to DataBase
        const userCart = await Cart.findOne({ user: req.user._id });

        if (!userCart) {
            return res.status(400).json({
                success: false,
                message: "No cart found",
            });
        }
        const newOrder = await Order.create({
            user: req.user._id,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            signature: razorpay_signature,
            products: userCart.items,
            status,
        });

        if (!newOrder) {
            return res.status(400).json({
                success: false,
                message: "Order not created",
            });
        }

        userCart.items = [];
        await userCart.save();

        // Redirect to UI page
        res.redirect(
            `http://localhost:5173/order/success?refrence=${razorpay_payment_id}`
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
});

const getKey = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_ID,
    });
});

const getAllOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).select(
            "-products"
        );
        if (!orders) {
            return res.status(400).json({
                success: false,
                message: "No orders found",
            });
        }
        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
});

const getSingleOrder = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "No order found",
            });
        }
        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
});

export { payOrder, paymentVerification, getKey, getAllOrder, getSingleOrder };
