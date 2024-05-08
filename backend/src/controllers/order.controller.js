import { asyncHandler } from "../utils/asyncHandler.js";
import { razorpay } from "../utils/razorpay.js";
import crypto from "crypto";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const checkout = asyncHandler(async (req, res) => {
    const price = Number(req.body.amount);
    try {
        const order = await razorpay.orders.create({
            amount: price * 100,
            currency: "INR",
        });

        if (!order) {
            res.status(500).json({
                success: false,
                message: "Internal error order price",
            });
        }
        return res.status(200).json({
            success: true,
            order,
            message: "Order price receive successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
});

const paymentVerification = asyncHandler(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

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
            `http://localhost:5173/checkout?refrence=${razorpay_payment_id}`
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

export { checkout, paymentVerification, getKey };
