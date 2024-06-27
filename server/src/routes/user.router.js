import { Router } from "express";
import {
    signUp,
    signIn,
    getRefreshToken,
    getMe,
    getMeOrder,
    logout,
    changePassword,
    updateMe,
    likeReview,
    dislikeReview,
    wishlist,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/refresh").get(getRefreshToken);
router.route("/sign-in").post(signIn);

router.use(verifyJWT);

router.route("/me").get(getMe);
router.route("/update").patch(upload.single("avatar"), updateMe);
router.route("/change-password").patch(changePassword);
router.route("/logout").get(logout);

router.route("/wishlist/:productId").post(wishlist);
router.route("/:reviewId/like").post(likeReview);
router.route("/:reviewId/dislike").post(dislikeReview);
// Order
router.route("/order").get(getMeOrder);

export default router;
