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

const signUp = asyncHandler(async (req, res, _) => {
    const { email, password, username, role } = req.body;
    try {
        // Validate that all fields are not empty
        if ([email, password, username].some((field) => field?.trim() === "")) {
            throw new ApiError(401, "user :: All fields are required");
        }
        // Check if a user with the same username or email already exists
        const exitsUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (exitsUser) {
            throw new ApiError(401, "User :: Email or Username already exists");
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
            throw new ApiError(403, null, "Created new user failed");
        }
        return res.status(200).json(createdUser);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const signIn = asyncHandler(async (req, res, _) => {
    const { email, password } = req.body;
    try {
        const tempUser = await User.findOne({ email });
        if (!tempUser) {
            throw new ApiError(404, "user does not exist");
        }

        const isPasswordValid = await tempUser.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, null, "Invalid user credentials");
        }

        const { accessToken, refreshToken } = await createToken(tempUser._id);

        const user = await User.findById(tempUser._id).select(
            "-password -refreshToken"
        );

        const payload = {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, payload)
            .cookie("accessToken", accessToken, payload)
            .json({ user, accessToken, refreshToken });
    } catch (error) {
        throw new ApiError(500, null, error.message);
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

const getRefreshToken = asyncHandler(async (req, res, _) => {
    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(401, "Un-Authorize Access Token Request");
        }

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "User :: Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "User :: Token is Expired");
        }

        const { accessToken, refreshToken } = await createToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json({ user, accessToken, refreshToken });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const changePassword = asyncHandler(async (req, res, _) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new ApiError(401, "User :: User does not exists");
        }

        const isPasswordValid = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordValid) {
            throw new ApiError(401, "user :: Password invalid");
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json(user);
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

const getMe = asyncHandler(async (req, res, _) => {
    return res.status(200).json(req.user);
});

const updateMe = asyncHandler(async (req, res, _) => {
    const { username, role } = req.body;
    const userId = req.user?._id;
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new ApiError("user :: user does not exists");
        }

        if (username && user.username !== username) {
            user.username = username;

            if (["customer", "admin"].includes(role)) {
                user.role = role;
            }

            await user.save({ validateBeforeSave: false });

            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const getMeOrder = asyncHandler(async (req, res, _) => {
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
            throw new ApiError(401, "user :: order history does not exists");
        }

        return res.status(200).json(orderHistory);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    signUp,
    signIn,
    getRefreshToken,
    getMe,
    getMeOrder,
    logout,
    changePassword,
    updateMe,
};
