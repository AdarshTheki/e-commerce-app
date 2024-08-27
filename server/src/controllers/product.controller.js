import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadSingleImg, uploadMultiImg } from "../utils/cloudinary.js";

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
    let { page = 1, limit = 20, sortBy = "_id" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const products = await Product.aggregate([
            {
                $facet: {
                    products: [
                        { $sort: { [`${sortBy}`]: 1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                rating: 1,
                                category: 1,
                                discount: 1,
                                price: 1,
                                images: 1,
                            },
                        },
                    ],
                    totals: [{ $count: "count" }],
                },
            },
        ]);

        if (products.length === 0) {
            return res
                .status(204)
                .json({ products: [], message: "products does not exists" });
        }

        return res.status(200).json({
            products: products[0].products,
            totals:
                products[0].totals.length > 0 ? products[0].totals[0].count : 0,
            skip: (page - 1) * limit,
            limit: limit,
        });
    } catch (error) {
        next(error);
    }
});

const getAllCategories = asyncHandler(async (req, res, next) => {
    try {
        const results = await Product.distinct("category");
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const brands = asyncHandler(async (req, res, next) => {
    try {
        const results = await Product.distinct("brand");
        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const getProductsByCategory = asyncHandler(async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const results = await Product.find({ category: categoryId });

        return res.status(200).json(results);
    } catch (error) {
        next(error);
    }
});

const productSearch = asyncHandler(async (req, res, next) => {
    try {
        const { q } = req.query;
        const results = await Product.find({
            $or: [
                { title: { $regex: new RegExp(q, "i") } },
                { brand: { $regex: new RegExp(q, "i") } },
                { category: { $regex: new RegExp(q, "i") } },
            ],
        }).limit(10);

        if (results.length === 0) {
            throw new ApiError(500, "items does not found");
        }

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
    try {
        if (!thumbnail[0] || images.length === 0) {
            throw new ApiError(401, "files not upload properly");
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
    try {
        const product = await Product.findOne({ _id: req.params.productId });

        // if (req?.files?.thumbnail[0]?.path) {
        //     const thumbnailPath = await uploadSingleImag(
        //         req?.files?.thumbnail[0]?.path
        //     );
        //     product.thumbnail = thumbnailPath;
        // }

        // if (req?.files?.images.length > 0) {
        //     const imagesPath = await uploadMultiImg(req?.files?.images);
        //     product.images = imagesPath;
        // }

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
        const deleted = await Product.deleteOne({ _id: req.params.productId });
        if (!deleted) {
            throw new ApiError(404, "product not deleted on database");
        }

        return res.status(200).json({
            message: "product deleted successfully",
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
    getAllCategories,
    getProductsByCategory,
    productSearch,
    brands,
    updateProduct,
    deleteProduct,
};
