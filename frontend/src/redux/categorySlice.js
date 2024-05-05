import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { status, instance } from '../utils';

const initialState = {
    categories: [],
    categoriesStatus: status.idle,
    categoryProducts: [],
    categoryProductsStatus: status.idle,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.categoriesStatus = status.loading;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = status.succeed;
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoriesStatus = status.failed;
            })

            .addCase(fetchProductsOfCategory.pending, (state, action) => {
                state.categoryProductsStatus = status.loading;
            })

            .addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
                state.categoryProducts = action.payload;
                state.categoryProductsStatus = status.succeed;
            })

            .addCase(fetchProductsOfCategory.rejected, (state, action) => {
                state.categoryProductsStatus = status.failed;
            });
    },
});

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
    const response = await instance.get('/products/categories');
    return response.data.data;
});

export const fetchProductsOfCategory = createAsyncThunk(
    'category-products/fetch',
    async (category) => {
        const response = await instance.get(`/products/category/${category}`);
        return response.data.data;
    }
);

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state) => state.category.categoryProductsStatus;

export default categorySlice.reducer;
