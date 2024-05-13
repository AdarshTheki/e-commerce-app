import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.replace("Bearer ", "") ||
            "";

        if (!token) {
            console.log(401, "Un-Authorization Request!");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            console.log(401, "Invalid Access Token ! Please Login User");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log( 500, error?.message || "Authentication user");
    }
};
