import { Router } from "express";
import {
    createCategory,
    allCategory,
    deleteCategory,
    updateCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
    .route("/")
    .get(allCategory)
    .post(upload.single("thumbnail"), createCategory);

router
    .route("/:categoryId")
    .patch(upload.single("thumbnail"), updateCategory)
    .delete(deleteCategory);

export default router;
