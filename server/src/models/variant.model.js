import mongoose, { Schema } from "mongoose";

// Create the Counter with Increment by One
const skuCounterSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // e.g., "skuCounter"
    value: { type: Number, required: true, default: 1 }, // Starting value
});
export const SkuCounter = mongoose.model("Sku_Counter", skuCounterSchema);

const variantSchema = new Schema(
    {
        images: [String],
        size: { type: String, required: true },
        color: { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        sku: { type: String, unique: true, index: true },
        original_price: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

variantSchema.index({ sku: "text" });

variantSchema.pre("save", async function (next) {
    if (!this.sku) {
        try {
            const counter = await SkuCounter.findOneAndUpdate(
                { key: "skuCounter" },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );

            // Format the SKU: GIFSIX + Padded Number
            const paddedNumber = String(counter.value).padStart(6, "0"); // Ensure 6 digits
            this.sku = `GIFSIX${paddedNumber}`;

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export const Variant = mongoose.model("Variant", variantSchema);
