import { api } from "./index";

const singlePage = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: (id) => ({
        url: `users/${id}`,  // reqres API expects this URL pattern
      }),
    }),
  }),
});

export const { useGetSingleUserQuery } = singlePage;