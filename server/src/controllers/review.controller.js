import { Review } from "../models/review.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
    try {
        const { productId, star, comment } = req.body;
        const userId = req.user._id;
        const review = new Review({ productId, userId, star, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getReviewsByProduct = asyncHandler(async (req, res) => {
    try {
        const reviews = await Review.find({
            productId: req.params.productId,
        }).populate({ path: "userId", select: "username _id" });
        res.status(200).json(reviews);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const updateReview = asyncHandler(async (req, res) => {
    try {
        const { star, comment } = req.body;
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { star, comment },
            { new: true }
        );
        res.status(200).json(review);
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const deleteReview = asyncHandler(async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { createReview, getReviewsByProduct, updateReview, deleteReview };
