import mongoose, { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
});

export const Address = model("Address", addressSchema);
