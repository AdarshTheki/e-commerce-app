import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Running Ports http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("MongoDB Connection Failed !! ", err?.message));
