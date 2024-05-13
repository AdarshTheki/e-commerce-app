import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    payOrder,
    paymentVerification,
    getKey,
    getAllOrder,
    getSingleOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/get-key").get(getKey);
router.route("/checkout").post(payOrder);
router.route("/user/order").get(getAllOrder);
router.route("/user/:id").get(getSingleOrder);

router.route("/payment-verification").post(paymentVerification);

export default router;
