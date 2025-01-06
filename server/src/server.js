import { app } from "./app.js";
import connectDB from "./connectDB.js";

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Running http://localhost:${port}`);
        });
    })
    .catch((err) => console.log("MongoDB Connection Error !! ", err?.message));
