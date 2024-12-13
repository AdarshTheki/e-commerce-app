import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: String,
    description: String,
    thumbnail: String,
});

export const Category = mongoose.model("Category", categorySchema);
