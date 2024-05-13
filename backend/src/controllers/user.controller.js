import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";

// Generate New Access/Refresh Token
export const createToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Generate access and refresh tokens by user method
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
};

const register = asyncHandler(async (req, res, _) => {
    const { email, password, username, role } = req.body;
    try {
        // Validate that all fields are not empty
        if ([email, password, username].some((field) => field?.trim() === "")) {
            return res
                .status(401)
                .json(
                    new ApiResponse(
                        401,
                        null,
                        "user :: All fields are required"
                    )
                );
        }
        // Check if a user with the same username or email already exists
        const exitsUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (exitsUser) {
            return res
                .status(401)
                .json(
                    new ApiResponse(
                        401,
                        null,
                        "User :: Email or Username already exists"
                    )
                );
        }
        // Create a new user object and save it to the database
        const user = await User.create({
            email,
            password,
            role,
            username: username?.toLowerCase(),
        });
        const createdUser = await User.findById(user?._id).select(
            "-password -refreshToken"
        );
        if (!createdUser) {
            return res
                .status(403)
                .json(new ApiResponse(403, null, "Created new user failed"));
        }
        return res
            .status(201)
            .json(new ApiResponse(200, {}, "Create New User successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const login = asyncHandler(async (req, res, _) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json(new ApiResponse(404, null, "user does not exist"));
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "Invalid user credentials"));
        }
        const { accessToken, refreshToken } = await createToken(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        const twoDays = 2 * 24 * 60 * 60 * 1000;

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                maxAge: twoDays,
                httpOnly: true,
                secure: true,
            })
            .cookie("accessToken", accessToken, {
                maxAge: twoDays,
                httpOnly: true,
                secure: true,
            })
            .json(
                new ApiResponse(
                    200,
                    { loggedInUser, accessToken, refreshToken },
                    "User :: Logged In"
                )
            );
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const logout = asyncHandler(async (req, res, _) => {
    const userId = req?.user?._id;
    try {
        if (!isValidObjectId(userId)) {
            return res
                .status(401)
                .json(
                    new ApiResponse(401, null, "User :: user Id is not valid")
                );
        }
        await User.findByIdAndUpdate(
            userId,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );
        return res
            .status(200)
            .clearCookie("refreshToken", { httpOnly: true })
            .clearCookie("accessToken", { httpOnly: true })
            .json(new ApiResponse(200, {}, "User :: Logged Out"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const generateToken = asyncHandler(async (req, res, _) => {
    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            return res
                .status(401)
                .json(
                    new ApiError(
                        401,
                        "User :: Un-Authorize Access Token Request"
                    )
                );
        }
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return res
                .status(401)
                .json(
                    new ApiResponse(401, null, "User :: Invalid Refresh Token")
                );
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "User :: Token is Expired"));
        }
        const { accessToken, refreshToken } = await createToken(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "User :: Access Token"
                )
            );
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const changePassword = asyncHandler(async (req, res, _) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(401)
                .json(
                    new ApiResponse(401, null, "User :: User does not exists")
                );
        }

        const isPasswordValid = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "user :: Password invalid"));
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password Change successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const getCurrentUser = asyncHandler(async (req, res, _) => {
    if (!req.user) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "User :: Current User NOt Found"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User :: Get Current User"));
});

const updateUser = asyncHandler(async (req, res, _) => {
    const { username, role } = req.body;
    const userId = req.user?._id;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res
                .status(404)
                .json(
                    new ApiResponse(404, null, "user :: user does not exists")
                );
        }
        if (username && user.username !== username) {
            user.username = username;
            if (["customer", "admin"].includes(role)) {
                user.role = role;
            }
            await user.save({ validateBeforeSave: false });
            return res
                .status(200)
                .json(new ApiResponse(200, {}, "User :: Updated successfully"));
        } else {
            return res
                .status(200)
                .json(new ApiResponse(200, {}, "User :: Not Updated"));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const getUserOrderHistory = asyncHandler(async (req, res, _) => {
    try {
        const userId = req.user._id;
        const orderHistory = await Order.aggregate([
            { $match: { user: userId } }, // Match orders with the current user's ID
            {
                $lookup: {
                    from: "products", // Assuming the collection name of products
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "orderedProducts",
                },
            },
        ]);

        if (orderHistory.length === 0) {
            return res
                .status(401)
                .json(
                    new ApiResponse(
                        401,
                        {},
                        "user :: order history does not exists"
                    )
                );
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    orderHistory,
                    "User :: Get user order history"
                )
            );
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

export {
    register,
    logout,
    generateToken,
    changePassword,
    getCurrentUser,
    updateUser,
    getUserOrderHistory,
};
