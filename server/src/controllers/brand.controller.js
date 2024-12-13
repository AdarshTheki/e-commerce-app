import { Brand } from "../models/brand.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const allBrand = asyncHandler(async (req, res, next) => {
    try {
        const allData = await Brand.find();
        res.status(200).json(allData);
    } catch (error) {
        next(error);
    }
});

const createBrand = asyncHandler(async (req, res, next) => {
    const thumbnail = req.file;
    const { name, description } = req.body;
    try {
        if (!thumbnail) throw new ApiError(401, "files not upload properly");

        if (!name || !description)
            throw new ApiError(401, "not define the name and description");

        const thumbnailPath = await uploadSingleImg(thumbnail.path);

        if (!thumbnailPath) {
            throw new ApiError(401, "files not upload properly on cloudinary");
        }

        const data = await Brand.create({
            name,
            description,
            thumbnail: thumbnailPath,
        });

        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// params: brandId
const updateBrand = asyncHandler(async (req, res, next) => {
    const thumbnail = req.file;
    const { name, description } = req.body;
    try {
        const brand = await Brand.findOne({ _id: req.params.brandId });

        if (thumbnail?.path) {
            const thumbnailPath = await uploadSingleImg(thumbnail?.path);
            if (thumbnailPath) {
                await removeSingleImg(brand.thumbnail);
                brand.thumbnail = thumbnailPath;
            }
        }

        if (name) {
            brand.name = name;
        }

        if (description) {
            brand.description = description;
        }

        if (!brand) {
            throw new ApiError(401, "not update brand failed");
        }

        await brand.save();

        return res.status(200).json(brand);
    } catch (error) {
        next(error);
    }
});

const deleteBrand = asyncHandler(async (req, res, next) => {
    try {
        const deleted = await Brand.findOneAndDelete({
            _id: req.params.brandId,
        });

        await removeSingleImg(deleted.thumbnail);

        if (!deleted) {
            throw new ApiError(404, "brand not deleted on database");
        }

        return res.status(200).json({
            message: "brand deleted successfully",
            statusCode: 200,
        });
    } catch (error) {
        next(error);
    }
});

export { allBrand, createBrand, updateBrand, deleteBrand };
