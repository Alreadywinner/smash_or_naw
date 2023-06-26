import { apiSlice } from './apiSlice';

const ADMIN_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    addAd: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/ad`,
        method: 'POST',
        body: data,
      }),
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/post`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/post`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/post`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useAddAdMutation,
} = userApiSlice;
