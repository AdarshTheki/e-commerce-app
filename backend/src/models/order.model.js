import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        totalPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        totalProducts: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "success"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
