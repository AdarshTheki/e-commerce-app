import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        ui: uiReducer,
    },
});
const data = [
    {
        _id: { $oid: '66323027cc5a700743090b40' },
        user: { $oid: '6630c6a50ca173e69a645505' },
        items: [
            {
                productId: { $oid: '6631eb1cebf765c1bfc45bb0' },
                quantity: { $numberInt: '3' },
                _id: { $oid: '6632360b1cf06bee33561013' },
            },
            {
                productId: { $oid: '6631eb1cebf765c1bfc45bb1' },
                quantity: { $numberInt: '1' },
                _id: { $oid: '6632360b1cf06bee33561014' },
            },
            {
                productId: { $oid: '6631eb1cebf765c1bfc45bb3' },
                quantity: { $numberInt: '4' },
                _id: { $oid: '6632360b1cf06bee33561015' },
            },
        ],
        __v: { $numberInt: '1' },
    },
];