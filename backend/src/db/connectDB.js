import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const response = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(`\n mongoDB connect !! ${response.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection Failed", error?.message);
    }
};

export default connectDB;
