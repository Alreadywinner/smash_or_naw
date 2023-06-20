import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const apiSlice = createApi({
  baseQuery,
  // this tagTypes is used to specify to cache or not
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
