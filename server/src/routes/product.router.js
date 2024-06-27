import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    singleProduct,
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    productSearch,
    brands,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/categories").get(getAllCategories);
router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/search").get(productSearch);
router.route("/id/:productId").get(singleProduct);
router.route("/brands").get(brands);

router.use(verifyJWT);

router.route("/user/add").post(
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 4 },
    ]),
    addProduct
);
router.route("/user/:productId").patch(
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 4 },
    ]),
    updateProduct
);
router.route("/user/:productId").delete(deleteProduct);

export default router;
