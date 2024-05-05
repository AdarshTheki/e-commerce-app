import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addProduct,
    singleProduct,
    allProducts,
    categories,
    productsCategory,
    productSearch,brands
} from "../controllers/product.controller.js";

const router = Router();



router.route("/").get(allProducts);
router.route("/categories").get(categories);
router.route("/brands").get(brands);
router.route("/category/:categoryId").get(productsCategory);
router.route("/search").get(productSearch);
router.route("/:productId").post(singleProduct);

router.use(verifyJWT);
router.route("/add").post(addProduct);

export default router;
