import { Router } from "express";
import {
    addCart,
    getCartItems,
    removeAllItems,
    removeOneItem,
    allCarts,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(allCarts);

router.use(verifyJWT);

router.route("/user").get(getCartItems);
router.route("/user/add").post(addCart);
router.route("/user/:productId").delete(removeOneItem);
router.route("/remove").delete(removeAllItems);

export default router;
