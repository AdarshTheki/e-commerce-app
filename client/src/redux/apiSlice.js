import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// baseURL=http://localhost:8000/api/v1
// baseURL=https://full-stack-ecommerce-api-pi.vercel.app/api/v1
// baseURL=https://full-stack-ecommerce-app-sq9o.onrender.com/api/v1

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        products: builder.query({
            query: ({ limit = 20, page = 1, sortBy = '_id' }) =>
                `/products?limit=${limit}&page=${page}&sortBy=${sortBy}`,
        }),
        productById: builder.query({
            query: (id) => `/products/id/${id}`,
        }),
        brandList: builder.query({
            query: () => '/products/brands',
        }),
        categoryList: builder.query({
            query: () => '/products/categories',
        }),
        category: builder.query({
            query: (category) => `/products/category/${category}`,
        }),
        search: builder.query({
            query: (search) => `/products/search?q=${search}`,
        }),
        order: builder.query({
            query: () => `/orders/all`,
        }),
        me: builder.query({
            query: () => `/auth/me`,
        }),
        login: builder.mutation({
            query: (item) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: item,
            }),
        }),
        signIn: builder.mutation({
            query: (item) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: item,
            }),
        }),
        changePassword: builder.mutation({
            query: (item) => ({
                url: '/auth/change-password',
                method: 'PATCH',
                body: item,
            }),
        }),
        updateUser: builder.mutation({
            query: (item) => ({
                url: '/auth/update',
                method: 'PATCH',
                body: item,
            }),
        }),
        checkout: builder.mutation({
            query: (item) => ({
                url: '/orders/checkout-stripe',
                method: 'POST',
                body: item,
            }),
        }),
        handleWishlist: builder.mutation({
            query: (productId) => ({
                url: `/auth/wishlist/${productId}`,
                method: 'POST',
            }),
        }),
        getReviews: builder.query({
            query: (productId) => `/reviews/product/${productId}`,
        }),
        handleAddReview: builder.mutation({
            query: (item) => ({
                url: `/reviews`,
                method: 'POST',
                body: JSON.stringify(item),
            }),
        }),
        handleUpdateReview: builder.mutation({
            query: ({ reviewId, rating, comment }) => ({
                url: `/reviews/${reviewId}`,
                method: 'PUT',
                body: { rating, comment },
            }),
        }),
        handleDeleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useBrandListQuery,
    useCategoryListQuery,
    useCategoryQuery,
    useProductByIdQuery,
    useProductsQuery,
    useSearchQuery,
    useMeQuery,
    useOrderQuery,
    useLoginMutation,
    useSignInMutation,
    useChangePasswordMutation,
    useUpdateUserMutation,
    useCheckoutMutation,
    useHandleWishlistMutation,
    useGetReviewsQuery,
    useHandleAddReviewMutation,
    useHandleUpdateReviewMutation,
    useHandleDeleteReviewMutation,
} = apiSlice;
