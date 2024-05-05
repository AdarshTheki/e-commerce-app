import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
