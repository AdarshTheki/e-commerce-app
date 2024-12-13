import { Router } from "express";
import {
    createBrand,
    allBrand,
    deleteBrand,
    updateBrand,
} from "../controllers/brand.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(allBrand).post(upload.single("thumbnail"), createBrand);

router
    .route("/:brandId")
    .patch(upload.single("thumbnail"), updateBrand)
    .delete(deleteBrand);

export default router;
