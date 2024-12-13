import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMultiImg = async (images = []) => {
    try {
        if (images.length === 0) return [];
        console.log(
            "images:",
            images.map((i) => i?.path)
        );
        const uploadPromises = images.map((file) =>
            cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                folder: "cartify-demo",
            })
        );
        const urls = await Promise.all(uploadPromises);
        const result = urls.map((url) => url.secure_url);
        images.map((img) => fs.unlinkSync(img.path));
        return result;
    } catch (error) {
        images.map((img) => fs.unlinkSync(img.path));
        return [];
    }
};

const uploadSingleImg = async (localFilePath = "") => {
    try {
        console.log("image path", localFilePath);
        if (!localFilePath) return "";

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            folder: "cartify-demo",
        });
        fs.unlinkSync(localFilePath);
        return res.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return "";
    }
};

const removeSingleImg = async (url = "") => {
    try {
        if (!url) return "";

        const publicId = url.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            folder: "cartify-demo",
        });
        return true;
    } catch (err) {
        return "";
    }
};

const removeMultiImg = async (images = []) => {
    try {
        if (images.length === 0) return false;

        const publicIds = images.map((url) => {
            const publicId = url.split("/").pop().split(".")[0];
            return publicId;
        });

        const removePromises = publicIds.map((public_id) =>
            cloudinary.uploader.destroy(public_id, {
                resource_type: "image",
                folder: "cartify-demo",
            })
        );

        await Promise.all(removePromises);

        return true;
    } catch (error) {
        return false;
    }
};

export { uploadSingleImg, removeSingleImg, uploadMultiImg, removeMultiImg };
