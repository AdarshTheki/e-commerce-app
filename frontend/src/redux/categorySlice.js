import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../utils';

const initialState = {
    categories: [],
    categoriesStatus: 'idle',
    categoryProducts: [],
    categoryProductsStatus: 'idle',
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.categoriesStatus = 'loading';
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = 'succeed';
            })

            .addCase(fetchCategories.rejected, (state) => {
                state.categoriesStatus = 'failed';
            })

            .addCase(fetchProductsOfCategory.pending, (state) => {
                state.categoryProductsStatus = 'loading';
            })

            .addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
                state.categoryProducts = action.payload;
                state.categoryProductsStatus = 'succeed';
            })

            .addCase(fetchProductsOfCategory.rejected, (state) => {
                state.categoryProductsStatus = 'failed';
            });
    },
});

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
    const response = await instance.get('/products/categories');
    return response.data;
});

export const fetchProductsOfCategory = createAsyncThunk(
    'category-products/fetch',
    async (category) => {
        const response = await instance.get(`/products/category/${category}`);
        return response.data;
    }
);

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state) => state.category.categoryProductsStatus;

export default categorySlice.reducer;
