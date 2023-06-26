import { apiSlice } from './apiSlice';

const USERS_URL = '/api/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    fetchAllPosts: builder.query({
      query: () => ({
        url: `${USERS_URL}/posts`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    fetchAllAds: builder.query({
      query: () => ({
        url: `${USERS_URL}/ads`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useFetchAllPostsQuery,
  useFetchAllAdsQuery,
} = userApiSlice;
