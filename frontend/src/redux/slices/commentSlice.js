import { apiSlice } from './apiSlice';

const USERS_URL = '/api/user';

export const commentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCurrentPostComment: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/comments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    addNewPostComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    deletePostComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comments`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useAddNewPostCommentMutation,
  useDeletePostCommentMutation,
  useFetchCurrentPostCommentQuery,
} = commentSlice;
