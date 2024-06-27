import { Router } from "express";
import {
    createReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
} from "../controllers/review.controller.js";
const router = Router();

import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/product/:productId").get(getReviewsByProduct);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

router.use(verifyJWT);
router.route("/").post(createReview);

export default router;
