import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.get("/api/v1", (req, res) => {
    res.send("<h3>Hello World</h3> <br/> <h1>Home Page!</h1>");
});

export { app };
