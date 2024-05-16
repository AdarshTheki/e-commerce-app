import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";

// POST : carts/add
const addCart = asyncHandler(async (req, res, _) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        let cartItem = await Cart.findOne({ productId, user: userId });
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ user: userId, productId, quantity });
        }
        await cartItem.save();
        return res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// GET: carts/user
const getCartItems = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await Cart.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $set: {
                    total: {
                        $multiply: ["$product.price", "$quantity"],
                    },
                },
            },
            {
                $set: {
                    discountedTotal: {
                        $multiply: [
                            "$total",
                            {
                                $subtract: [
                                    1,
                                    {
                                        $divide: ["$product.discount", 100],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: '$user',
                    totalPrice: {
                        $sum: "$total",
                    },
                    discountedPrice: {
                        $sum: "$discountedTotal",
                    },
                    totalProducts: {
                        $sum: 1,
                    },
                    totalQuantity: {
                        $sum: "$quantity",
                    },
                    products: {
                        $push: {
                            _id: "$productId",
                            title: "$product.title",
                            price: "$product.price",
                            quantity: "$quantity",
                            totalPrice: "$total",
                            discountPercentage: "$product.discount",
                            discountedPrice: "$discountedTotal",
                            thumbnail: "$product.thumbnail",
                        },
                    },
                },
            },
        ]);

        return res.json(cartItems[0]);
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// DELETE : carts/user/:productId
const removeOneItem = asyncHandler(async (req, res) => {
    try {
        await Cart.findOneAndDelete(
            {
                user: req.user._id,
            },
            {
                productId: req.params.productId,
            }
        );
        return res
            .status(200)
            .json({ message: "remove cart item successfully" });
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// DELETE : carts/remove
const removeAllItems = asyncHandler(async (req, res) => {
    try {
        await Cart.deleteOne({ user: req.user._id });
        return res
            .status(200)
            .json({ message: "Remove all items successfully" });
    } catch (error) {
        throw new ApiError(500, null, error?.message);
    }
});

// GET : carts
const allCarts = asyncHandler(async (req, res) => {
    let { page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const result = await Cart.aggregate([
            {
                $facet: {
                    cartItems: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "user",
                                foreignField: "_id",
                                as: "newuser",
                            },
                        },
                        {
                            $unwind: "$newuser",
                        },
                        {
                            $lookup: {
                                from: "products",
                                localField: "productId",
                                foreignField: "_id",
                                as: "newproduct",
                            },
                        },
                        {
                            $unwind: "$newproduct",
                        },
                        {
                            $project: {
                                userId: "$newuser._id",
                                username: "$newuser.username",
                                email: "$newuser.email",
                                productId: "$newproduct._id",
                                title: "$newproduct.title",
                                price: "$newproduct.price",
                                quantity: "$quantity",
                                category: "$newproduct.category",
                                thumbnail: "$newproduct.thumbnail",
                            },
                        },
                        {
                            $sort: {
                                quantity: -1,
                                owner: -1,
                            },
                        },
                        {
                            $limit: 10,
                        },
                    ],
                    totals: [{ $count: "count" }],
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(401).json({ message: "All carts not found" });
        }

        return res.status(200).json({
            carts: result[0]?.cartItems || [],
            total: result[0]?.totals[0]?.count || 0,
            skip: (page - 1) * limit,
            limit: limit,
        });
    } catch (error) {
        return res.status(401).json(new ApiResponse(500, null, error?.message));
    }
});

export { addCart, getCartItems, allCarts, removeAllItems, removeOneItem };
