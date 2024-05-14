import { Address } from "../models/address.model.js";

const createAddress = async (req, res) => {
    try {
        const userAddress = await Address.findOneAndUpdate(
            { user: req.user._id },
            { ...req.body },
            { new: true }
        );

        if (userAddress) {
            return res.status(202).json({
                code: 202,
                success: true,
                data: userAddress,
                message: "Address updated success of this account",
            });
        }

        const address = await Address.create({
            ...req.body,
            user: req.user._id,
        });

        return res.status(201).json({
            code: 201,
            success: true,
            message: "Address created successfully",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: error?.message,
        });
    }
};

const toggleDefaultAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Address not found",
            });
        }

        address.isDefault = !address.isDefault;
        await address.save();

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Address updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: error?.message,
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Address not found",
            });
        }

        await Address.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: error?.message,
        });
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
        return res.status(200).json({
            code: 200,
            success: true,
            message: "get address success",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: error?.message,
        });
    }
};

export { getAddress, createAddress, toggleDefaultAddress, deleteAddress };
