import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: [
            "https://full-stack-ecommerce-app-page.vercel.app",
            "http://localhost:5173",
            process.env.CORS_ORIGIN,
        ],
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// http://localhost:8000/api/v1/users

import { User } from "./models/user.model.js";

app.post("/api/v1/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log(404, "user does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            console.log(401, "Invalid user credentials");
        }

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
                console.log(error.message);
            }
        };

        const { accessToken, refreshToken } = await createToken(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const payload = {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("accessToken", refreshToken)
            .json({
                statusCode: 200,
                loggedInUser,
                accessToken,
                refreshToken,
                message: "User :: Logged In",
            });
    } catch (error) {
        console.log(500, error.message);
    }
});

// import files
import healthCheckRoute from "./routes/healthCheck.router.js";
import userRoute from "./routes/user.router.js";
import productRoute from "./routes/product.router.js";
import cartRoute from "./routes/cart.router.js";
import orderRoute from "./routes/order.router.js";
import addressRoute from "./routes/address.router.js";

app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/address", addressRoute);

export { app };
