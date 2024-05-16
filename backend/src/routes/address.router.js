import { Router } from "express";
import {
    getAddress,
    createAddress,
} from "../controllers/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getAddress);
router.route("/create").post(verifyJWT, createAddress);

export default router;
