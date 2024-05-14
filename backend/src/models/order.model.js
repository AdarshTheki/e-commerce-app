import mongoose, { Schema } from "mongoose";
import { cartItemSchema } from "./cart.model.js";

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        products: [cartItemSchema],
        totals: Number,
        status: {
            type: String,
            enum: ["pending", "success"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
