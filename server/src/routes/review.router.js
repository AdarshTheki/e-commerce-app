import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
} from "../controllers/review.controller.js";

const router = Router();

router.route("/product/:productId").get(getReviewsByProduct);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

router.route("/").post(verifyJWT, createReview);

export default router;
