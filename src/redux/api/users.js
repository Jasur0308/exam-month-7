import { api } from "./index";

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: '/login',  // Change this to the correct endpoint for fetching user profile
      }),
    }),   
    getUsers: build.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["USERS"],
    }),
    deleteUsers: build.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USERS"],
    }),
    updateUsers: build.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["USERS"],
    }),
    createUsers: build.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["USERS"],
    })
  }),
});

export const { useGetProfileQuery, useGetUsersQuery, useDeleteUsersMutation, useCreateUsersMutation, useUpdateUsersMutation } = profileApi;