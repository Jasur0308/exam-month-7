import { api } from "./index";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: "/register",  // Correct URL for register
        method: "POST",
        body,
      }),
    }),
    logIn: build.mutation({
      query: (body) => ({
        url: "/login",  // Correct URL for login
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation } = authApi;