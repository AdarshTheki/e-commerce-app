import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
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
    const { path } = req.files;
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
        return res
            .status(401)
            .json(new ApiResponse(401, null, "missing inputs fields"));
    }

    try {
        const thumbnailPath = await uploadOnCloudinary(path.thumbnail);
        const imagesPath = await uploadOnCloudinary(path.images);

        if (!thumbnailPath && !imagesPath) {
            return res
                .status(401)
                .json(
                    new ApiResponse(
                        401,
                        null,
                        "files not upload properly on cloudinary"
                    )
                );
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
            thumbnail: thumbnailPath.url,
            images: [imagesPath.url],
        });

        if (!product) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "create product failed"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, product, "create product"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const singleProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (!isValidObjectId(productId)) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "Invalid product ID"));
    }
    try {
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res
                .status(401)
                .json(new ApiResponse(401, null, "Product not found"));
        }
        return res
            .status(200)
            .json(new ApiResponse(200, product, "Fetch Single Product"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const allProducts = asyncHandler(async (req, res) => {
    let { page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    try {
        const products = await Product.aggregate([
            {
                $facet: {
                    products: [
                        { $sort: { _id: 1 } },
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                brand: 1,
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
                .status(500)
                .json(new ApiResponse(500, null, "products does not exists"));
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    products: products[0].products,
                    totals:
                        products[0].totals.length > 0
                            ? products[0].totals[0].count
                            : 0,
                    skip: (page - 1) * limit,
                    limit: limit,
                },
                "Fetch All Products"
            )
        );
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const categories = asyncHandler(async (req, res) => {
    try {
        const results = await Product.distinct("category");
        return res
            .status(200)
            .json(new ApiResponse(200, results, "fetch all categories"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const brands = asyncHandler(async (req, res) => {
    try {
        const results = await Product.distinct("brand");
        return res
            .status(200)
            .json(new ApiResponse(200, results, "fetch all brands"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const productsCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const results = await Product.find({ category: categoryId });
        return res
            .status(200)
            .json(new ApiResponse(200, results, "fetch products by category"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

const productSearch = asyncHandler(async (req, res) => {
    try {
        const { q } = req.query;
        const results = await Product.find({
            $or: [
                { title: { $regex: new RegExp(q, "i") } },
                { brand: { $regex: new RegExp(q, "i") } },
                { category: { $regex: new RegExp(q, "i") } },
            ],
        });
        return res
            .status(200)
            .json(new ApiResponse(200, results, "fetch products by query"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error?.message));
    }
});

export {
    addProduct,
    singleProduct,
    allProducts,
    categories,
    productsCategory,
    productSearch,
    brands,
};
