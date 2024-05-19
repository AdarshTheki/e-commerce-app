import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { totalPrice, discountedPrice, totalProducts, totalQuantity } =
            req.body;

        const userCart = await Cart.find({ user: req.user._id });

        if (userCart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No cart found of this user account",
            });
        }

        const newOrder = await Order.create({
            user: req.user._id,
            totalPrice,
            discountedPrice,
            totalProducts,
            totalQuantity,
            status: "success",
        });

        if (!newOrder) {
            return res.status(400).json({
                success: false,
                message: "Order not created",
            });
        }

        await Cart.deleteMany({ user: req.user._id });

        return res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
});

const getUserOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        if (!orders || orders.length === 0) {
            throw new ApiError(401, "order not exists of this account");
        }
        return res.status(200).json(orders);
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
});

export { createOrder, getUserOrder };
