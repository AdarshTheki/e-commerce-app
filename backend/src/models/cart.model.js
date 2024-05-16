import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true },
});

export const Cart = mongoose.model("Cart", cartSchema);
