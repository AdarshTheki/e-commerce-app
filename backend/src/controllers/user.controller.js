import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { isValidObjectId } from "mongoose";
import { uploadOnCloudinary, removeOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Generate New Access/Refresh Token
const createToken = async (userId) => {
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
    // Get user details from the frontend request body
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
            throw new ApiError(409, "User :: Email or Username already exists");
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
            throw new ApiError(401, "user :: error registering of the user");
        }
        return res
            .status(201)
            .json(new ApiResponse(200, createdUser, "Create New User"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const login = asyncHandler(async (req, res, _) => {
    try {
        const { email, password } = req.body;
        if (!password && !email) {
            throw new ApiError(400, "user :: Email or password is required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, "User :: user does not exist");
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "user :: Invalid user credentials");
        }
        const { accessToken, refreshToken } = await createToken(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        return res
            .status(200)
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .cookie("accessToken", accessToken, { httpOnly: true })
            .json(
                new ApiResponse(
                    200,
                    { loggedInUser, accessToken, refreshToken },
                    "User :: Logged In"
                )
            );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const logout = asyncHandler(async (req, res, _) => {
    const userId = req?.user?._id;
    try {
        if (!isValidObjectId(userId)) {
            throw new ApiError(401, "User :: userId is not valid");
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
        res.status(500).json({ message: error.message });
    }
});

const generateToken = asyncHandler(async (req, res, _) => {
    try {
        const incomingRefreshToken =
            req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(
                401,
                "User :: Un-Authorize Access Token Request"
            );
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
            .json(
                new ApiResponse(
                    200,
                    { user, accessToken, refreshToken },
                    "User :: Access Token"
                )
            );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const changePassword = asyncHandler(async (req, res, _) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user?._id);
        if (!user) throw new ApiError(401, "User :: User does not exists");

        const isPasswordValid = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordValid)
            throw new ApiError(401, "user :: Password invalid");

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password Change"));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getCurrentUser = asyncHandler(async (req, res, _) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User :: Get Current User"));
});

const updateUser = asyncHandler(async (req, res, _) => {
    const { username, role } = req.body;
    const avatarPath = req.file?.path;
    const userId = req.user?._id;
    try {
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            throw new ApiError(404, "user :: user does not exists");
        }
        if (username) {
            user.username = username;
        }
        if (avatarPath) {
            await removeOnCloudinary(avatarPath);
            const uploadAvatar = await uploadOnCloudinary(avatarPath);
            if (!uploadAvatar.url) {
                throw new ApiError(404, "user :: avatar uploaded failed");
            } else {
                user.avatar = uploadAvatar.url;
            }
        }
        if (role) {
            user.role = role;
        }
        await user.save({ validateBeforeSave: false });
        return res
            .status(200)
            .json(new ApiResponse(200, user, "User :: Updated successfully"));
    } catch (error) {
        res.status(500).json({ message: error.message });
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
            throw new ApiError(404, "user :: order history does not exists");
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
        res.status(500).json({ message: error.message });
    }
});

export {
    register,
    login,
    logout,
    generateToken,
    changePassword,
    getCurrentUser,
    updateUser,
    getUserOrderHistory,
};
