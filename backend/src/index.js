import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

dotenv.config({ path: "./.env" });

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`running port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("mongoDB connection failed", err?.message));
