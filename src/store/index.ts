import { configureStore } from "@reduxjs/toolkit";

import dogsReducer from "@/store/dogs";
import authReducer from "@/store/auth";

const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    auth: authReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
