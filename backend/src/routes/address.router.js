import { Router } from "express";
import {
    getAddress,
    createAddress,
    deleteAddress,
    toggleDefaultAddress,
} from "../controllers/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAddress);
router.route("/create").post(createAddress);
router.route("/update/:id").patch(toggleDefaultAddress).delete(deleteAddress);

export default router;
