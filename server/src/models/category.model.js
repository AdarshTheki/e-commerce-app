import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        minlength: [5, "please enter a valid string range of 5 to 50"],
        maxlength: [50, "please enter a valid string range of 5 to 50"],
    },
    description: {
        type: String,
        required: true,
        minlength: [50, "please enter a valid string range of 50 to 500"],
        maxlength: [500, "please enter a valid string range of 50 to 500"],
    },
    thumbnail: String,
});

export const Category = mongoose.model("Category", categorySchema);
