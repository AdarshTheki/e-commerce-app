import { Cart } from "../models/cart.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import NodeCache from "node-cache";

const nodeCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// POST : carts/add
const addCart = asyncHandler(async (req, res, _) => {
    const userId = req.user._id;
    const { cartItems } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: cartItems,
            });
        } else {
            const index = cart.items?.findIndex(
                (item) =>
                    item.productId.toString() ===
                    cartItems.productId?.toString()
            );
            if (index !== -1) {
                cart.items[index].quantity += cartItems.quantity;
            } else {
                cart.items.push(cartItems);
            }
        }

        nodeCache.del("userCart");

        await cart.save();

        if (!cart) {
            return res
                .status(400)
                .json({ success: false, error: "Cart not found" });
        }

        return res.status(200).json(new ApiResponse(200, cart, "Added Cart"));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// DELETE : carts/user/:productId
const removeOneItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(productId)) {
        throw new ApiError("Invalid product ID");
    }

    try {
        let result = await Cart.findOne({ user: userId });

        if (!result) {
            throw new ApiError(404, "items not found");
        }

        result.items = result.items.filter(
            (item) => item.productId.toString() !== productId?.toString()
        );

        nodeCache.del("userCart");

        await result.save();

        return res
            .status(200)
            .json(new ApiResponse(200, result, "remove one cart item"));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// DELETE : carts/user/remove-all
const removeAllItems = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const result = await Cart.findOneAndUpdate(
            {
                user: userId,
            },
            { items: [] },
            { new: true }
        );

        nodeCache.del("userCart");

        if (!result) {
            throw new ApiError(404, "Cart items not found");
        }
        return res.status(200).json(200, {}, "Remove all items");
    } catch (error) {
        throw new ApiError(500, error?.message);
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
                        { $sort: { _id: 1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $lookup: {
                                from: "users",
                                localField: "user",
                                foreignField: "_id",
                                as: "user",
                            },
                        },
                        {
                            $unwind: "$user",
                        },
                        {
                            $project: {
                                _id: 1,
                                user: {
                                    username: "$user.username",
                                    email: "$user.email",
                                },
                                items: { $size: "$items" },
                            },
                        },
                    ],
                    totals: [{ $count: "count" }],
                },
            },
        ]);

        if (!result) {
            throw new ApiError(400, "products does not exists");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    cartItems: result[0]?.cartItems || [],
                    totals: result[0]?.totals[0]?.count || 0,
                    skip: (page - 1) * limit,
                    limit: limit,
                },
                "Fetch All Carts"
            )
        );
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

// GET : carts/user
const userCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        let carts;
        if (nodeCache.has("userCart")) {
            carts = JSON.parse(nodeCache.get("userCart"));
        } else {
            carts = await Cart.aggregate([
                { $match: { user: userId } }, // Match orders with the current user's ID
                {
                    $lookup: {
                        from: "products",
                        localField: "items.productId",
                        foreignField: "_id",
                        as: "populatedItems",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        items: {
                            $map: {
                                input: "$items",
                                as: "item",
                                in: {
                                    $mergeObjects: [
                                        "$$item",
                                        {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$populatedItems",
                                                        as: "populatedItem",
                                                        cond: {
                                                            $eq: [
                                                                "$$populatedItem._id",
                                                                "$$item.productId",
                                                            ],
                                                        },
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            ]);
            nodeCache.set("userCart", JSON.stringify(carts));
        }

        if (carts[0]?.items?.length === 0) {
            throw new ApiError(401, "cart item does not exists");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, carts[0], "Get user cart items"));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

export { addCart, allCarts, userCart, removeAllItems, removeOneItem };
