import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const allCategory = asyncHandler(async (req, res, next) => {
    try {
        const allData = await Category.find();
        res.status(200).json(allData);
    } catch (error) {
        next(error);
    }
});

const createCategory = asyncHandler(async (req, res, next) => {
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

        const category = await Category.create({
            name,
            description,
            thumbnail: thumbnailPath,
        });

        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
});

// params: categoryId
const updateCategory = asyncHandler(async (req, res, next) => {
    const thumbnail = req.file;
    const { name, description } = req.body;
    try {
        const category = await Category.findOne({ _id: req.params.categoryId });

        if (thumbnail?.path) {
            const thumbnailPath = await uploadSingleImg(thumbnail?.path);
            if (thumbnailPath) {
                await removeSingleImg(category.thumbnail);
                category.thumbnail = thumbnailPath;
            }
        }

        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

        if (!category) {
            throw new ApiError(401, "not update category failed");
        }

        await category.save();

        return res.status(200).json(category);
    } catch (error) {
        next(error);
    }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    try {
        const deleted = await Category.findOneAndDelete({
            _id: req.params.categoryId,
        });

        await removeSingleImg(deleted.thumbnail);

        if (!deleted) {
            throw new ApiError(404, "category not deleted on database");
        }

        return res.status(200).json({
            message: "category deleted successfully",
            statusCode: 200,
        });
    } catch (error) {
        next(error);
    }
});

export { allCategory, createCategory, updateCategory, deleteCategory };
