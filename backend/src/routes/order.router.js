import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getUserOrder
} from "../controllers/order.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(createOrder);
router.route("/user").get(getUserOrder);

export default router;
