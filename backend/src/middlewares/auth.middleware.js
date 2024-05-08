import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.headers["authorization"]?.replace("Bearer ", "") ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiNWNiMTc3NTZmNmI5MzAxNGJiZTgiLCJlbWFpbCI6ImFkYXJzaHZlcm1hNTQ5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRhcnNoIHZlcm1hIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzE1MTY2Mzk1LCJleHAiOjE3MTUzMzkxOTV9.3alZRDoRdK5pO9QcFL0ammf39bDhatZx0PEq4zF9jwM";

        if (!token) {
            throw new ApiError(401, "Un-Authorization Request!");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access Token ! Please Login User");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(500, error?.message || "Authentication user");
    }
});
