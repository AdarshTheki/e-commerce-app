import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    uploadSingleImg,
    uploadMultiImg,
    removeSingleImg,
    removeMultiImg,
} from "../utils/cloudinary.js";

const singleProduct = asyncHandler(async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!isValidObjectId(productId)) {
            throw new ApiError(401, "Invalid product ID");
        }

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            throw new ApiError(401, "Product not found");
        }
        const related = await Product.find({ category: product.category });
        const reviews = await Review.find({ productId }).populate("userId");

        return res.status(200).json({ product, related, reviews });
    } catch (error) {
        next(error);
    }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
    try {
        const {
            q,
            category,
            brand,
            price, // Filter by price range, e.g., "10,50"
            sort, // Sorting options, e.g., "price_asc"
            page = 1,
            limit = 10,
        } = req.query;

        const query = {};

        if (q) {
            query.name = { $regex: q, $options: "i" }; // Case-insensitive search
        }

        if (category) {
            query.category = category; // Assuming category is stored as an ID
        }

        if (brand) {
            query.brand = brand; // Assuming brand is stored as an ID
        }

        if (price) {
            const [min, max] = price.split(",").map(Number);
            query.price = { $gte: min, $lte: max }; // $gte: greater than or equal, $lte: less than or equal
        }

        let sortOption = {};
        if (sort) {
            const [field, order] = sort.split("_"); // e.g., "price_asc"
            sortOption[field] = order === "asc" ? 1 : -1; // 1: ascending, -1: descending
        }

        const products = Product.aggregate([query]);

        const options = {
            page: Number(page),
            limit: Number(limit),
        };

        const results = await Product.aggregatePaginate(products, options);
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const addProduct = asyncHandler(async (req, res, next) => {
    const { thumbnail, images } = req.files;
    const {
        title,
        description,
        category,
        brand,
        price,
        discount,
        rating,
        stock,
    } = req.body;
    const userId = req?.user._id;
    try {
        if (!thumbnail[0] || images.length === 0) {
            throw new ApiError(401, "files not upload properly");
        }

        if (!userId) {
            throw new ApiError(404, "user is not authenticated");
        }

        if (
            !title ||
            !description ||
            !category ||
            !brand ||
            !price ||
            !discount ||
            !rating ||
            !stock
        ) {
            throw new ApiError(401, "please fill data properly data");
        }

        const thumbnailPath = await uploadSingleImg(thumbnail[0].path);
        const imagesPath = await uploadMultiImg(images);

        if (!thumbnailPath && !imagesPath.length === 0) {
            throw new ApiError(401, "files not upload properly on cloudinary");
        }

        const product = await Product.create({
            title,
            description,
            category,
            brand,
            price,
            discount,
            rating,
            stock,
            owner: userId,
            thumbnail: thumbnailPath,
            images: imagesPath,
        });

        if (!product) {
            throw new ApiError(401, "create product failed");
        }

        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

const updateProduct = asyncHandler(async (req, res, next) => {
    const { title, description, category, price } = req.body;
    const { thumbnail, images } = req.files;
    try {
        const product = await Product.findOne({ _id: req.params.productId });

        if (thumbnail[0]?.path) {
            const thumbnailPath = await uploadSingleImg(thumbnail[0]?.path);
            product.thumbnail = thumbnailPath;
        }

        if (images.length > 0) {
            const imagesPath = await uploadMultiImg(images);
            product.images = imagesPath;
        }

        if (title) {
            product.title = title;
        }

        if (description) {
            product.description = description;
        }
        if (category) {
            product.category = category;
        }
        if (price) {
            product.price = price;
        }

        if (!product) {
            throw new ApiError(401, "create product failed");
        }

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const deleted = await Product.findOneAndDelete({
            _id: req.params.productId,
        });

        await removeSingleImg(deleted?.thumbnail);
        await removeMultiImg(deleted?.images);

        if (!deleted) {
            throw new ApiError(404, "product not deleted on database");
        }

        return res.status(200).json({
            message: "product deleted with thumbnail & images successfully",
            statusCode: 200,
        });
    } catch (error) {
        next(error);
    }
});

export {
    addProduct,
    singleProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
