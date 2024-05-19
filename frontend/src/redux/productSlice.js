import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status, instance } from '../utils';

const initialState = {
    products: [],
    productsStatus: status.idle,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.productsStatus = status.loading;
        });
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            state.products = payload;
            state.productsStatus = status.succeed;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.productsStatus = status.failed;
        });
    },
});

// for getting the products list with limited numbers & also page
export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async ({ limit = 100, page = 1 }) => {
        const response = await instance.get(`/products?limit=${limit}&page=${page}`);
        return response.data;
    }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;

export default productSlice.reducer;
