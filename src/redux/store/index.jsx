import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";
import { api } from "../api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})