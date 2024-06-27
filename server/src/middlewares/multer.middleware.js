import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Required Destination folder for storing files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// // Multer file filter configuration
// const fileFilter = (req, file, cb) => {
//     // Check file type
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true); // Accept image files
//     } else {
//         cb(new Error("Only images are allowed!"), false); // Reject non-image files
//     }
// };

export const upload = multer({ storage });
