import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String },
    isDefault: { type: Boolean, default: false },
});

export const Address = mongoose.model("Address", addressSchema);
