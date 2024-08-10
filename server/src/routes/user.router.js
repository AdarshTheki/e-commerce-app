import { Router } from "express";
import {
    signUp,
    signIn,
    getRefreshToken,
    getMe,
    logout,
    changePassword,
    wishlist,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/refresh").get(getRefreshToken);
router.route("/sign-in").post(signIn);

router.use(verifyJWT);

router.route("/me").get(getMe);
router.route("/change-password").patch(changePassword);
router.route("/logout").get(logout);

router.route("/wishlist/:productId").post(wishlist);

export default router;
