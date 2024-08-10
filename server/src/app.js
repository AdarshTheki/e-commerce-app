import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// import all routing files
import healthCheckRoute from "./routes/healthCheck.router.js";
import userRoute from "./routes/user.router.js";
import productRoute from "./routes/product.router.js";
import orderRoute from "./routes/order.router.js";
import reviewRoute from "./routes/review.router.js";

// http://localhost:8000/api/v1/healthcheck

app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);

app.use(errorHandler);

export { app };
