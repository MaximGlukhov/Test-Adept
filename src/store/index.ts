import { configureStore } from "@reduxjs/toolkit";
import companies from "./companySlice";

export const store = configureStore({
    reducer: {
        list: companies,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
