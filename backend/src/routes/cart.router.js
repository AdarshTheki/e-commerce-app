import { Router } from "express";
import {
    addCart,
    allCarts,
    userCart,
    removeAllItems,
    removeOneItem,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(allCarts);

router.use(verifyJWT);

router.route("/user").get(userCart);
router.route("/user/add").post(addCart);
router.route("/user/:productId").delete(removeOneItem)
router.route('/remove-all').delete(removeAllItems)
export default router;
