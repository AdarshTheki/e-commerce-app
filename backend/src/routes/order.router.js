import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    checkout,
    paymentVerification,
    getKey,
} from "../controllers/order.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/get-key").get(getKey);
router.route("/checkout").post(checkout);


router.route("/payment-verification").post(paymentVerification);

export default router;
