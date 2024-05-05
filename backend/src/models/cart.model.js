import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
});

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
});

export const Cart = mongoose.model("Cart", cartSchema);
