import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status, instance } from '../utils';

const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        carts: [],
        cartsStatus: status.idle,
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity, price } = action.payload;
            const existingProduct = state.carts.find((product) => product.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.carts.push({ id, quantity, price });
            }
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            state.carts = state.carts.filter(
                (product) => product?.productId?.toString() !== productId?.toString()
            );
        },
        clearCart: (state) => {
            state.carts = [];
        },
        // 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarts.pending, (state) => {
                state.cartsStatus = status.loading;
            })
            .addCase(fetchCarts.fulfilled, (state, action) => {
                state.carts = action.payload;
                state.cartsStatus = status.succeed;
            })
            .addCase(fetchCarts.rejected, (state) => {
                state.cartsStatus = status.failed;
            });
    },
});

export const fetchCarts = createAsyncThunk('cart/fetchCart', async () => {
    const response = await instance.get('/carts/user');
    return response.data.data;
});

export const getCarts = (state) => state.cart.carts;
export const getCartsStatus = (state) => state.cart.cartsStatus;

export const { removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
