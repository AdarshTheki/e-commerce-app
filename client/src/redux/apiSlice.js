import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
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
            query: (limit = 20) => `/products?limit=${limit}`,
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
        handleLike: builder.mutation({
            query: (reviewId) => ({
                url: `/auth/${reviewId}/like`,
                method: 'POST',
            }),
        }),
        handleDislike: builder.mutation({
            query: (reviewId) => ({
                url: `/auth/${reviewId}/dislike`,
                method: 'POST',
            }),
        }),
        getReviews: builder.query({
            query: (productId) => `/reviews/product/${productId}`,
        }),
        handleAddReview: builder.mutation({
            query: ({ productId, star, comment }) => ({
                url: `/reviews`,
                method: 'POST',
                body: { productId, star, comment },
            }),
        }),
        handleUpdateReview: builder.mutation({
            query: ({ reviewId, star, comment }) => ({
                url: `/reviews/${reviewId}`,
                method: 'PUT',
                body: { star, comment },
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
    useHandleDislikeMutation,
    useHandleLikeMutation,
    useHandleWishlistMutation,
    useGetReviewsQuery,
    useHandleAddReviewMutation,
    useHandleUpdateReviewMutation,
    useHandleDeleteReviewMutation,
} = apiSlice;
