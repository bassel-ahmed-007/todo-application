import { configureStore } from "@reduxjs/toolkit";
import { todosApiSlice } from "./todos/todosApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: { [todosApiSlice.reducerPath]: todosApiSlice.reducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todosApiSlice.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
