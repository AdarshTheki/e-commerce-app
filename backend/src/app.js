import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: [
            "https://full-stack-ecommerce-app-page.vercel.app",
            "http://localhost:5173",
            "http://localhost:8000",
            "http://localhost:3000",
            "*",
        ],
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://full-stack-ecommerce-app-page.vercel.app"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// http://localhost:8000/api/v1/users

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

app.get("*", (req, res, next) => {
    res.status(200).json({
        message: "bad request",
    });
});

export { app };
