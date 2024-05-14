import mongoose, { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    fullName: String,
    streetAddress: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
    phoneNumber: Number,
});

export const Address = model("Address", addressSchema);
