import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
    name: String,
    description: String,
    thumbnail: String,
});

export const Brand = mongoose.model("Brand", brandSchema);
