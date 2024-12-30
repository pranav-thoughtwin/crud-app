import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./slices/detailsSlice"

const store = configureStore({
  reducer: {
    details: detailsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;