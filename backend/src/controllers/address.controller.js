import { Address } from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";

const createAddress = async (req, res) => {
    try {
        const userAddress = await Address.findOneAndUpdate(
            { user: req.user._id },
            { ...req.body },
            { new: true }
        );

        if (userAddress) {
            return res.status(202).json(userAddress);
        }

        const address = await Address.create({
            ...req.body,
            user: req.user._id,
        });

        return res.status(200).json(address);
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
};

const getAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ user: req.user._id });
        if (!address) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Address not found of this users",
            });
        }

        return res.status(200).json(address);
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
};

export { getAddress, createAddress };
