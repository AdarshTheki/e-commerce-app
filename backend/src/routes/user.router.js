import { Router } from "express";
import {
    register,
    logout,
    generateToken,
    changePassword,
    getCurrentUser,
    updateUser,
    getUserOrderHistory,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/generate-token").get(generateToken);

router.use(verifyJWT);

router.route("/update").patch(upload.single("avatar"), updateUser);
router.route("/change-password").patch(changePassword);
router.route("/logout").get(logout);
router.route("/current-user").get(getCurrentUser);
router.route("/order").get(getUserOrderHistory);

export default router;
