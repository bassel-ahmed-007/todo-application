import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { todoTypes } from "../../types";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const todosApiSlice = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ["Todos", "singleTodo"],
  refetchOnFocus: true,

  endpoints: (builder) => ({
    // getting all todos
    getTodos: builder.query<todoTypes[], void>({
      query: () => `/todos`,
      providesTags: ["Todos"],
    }),

    // getting just one todo
    getSingleTodo: builder.query<todoTypes, string>({
      query: (todoId) => `/todos/${todoId}`,
      providesTags: ["singleTodo"],
    }),

    // creating a new todo
    createTodo: builder.mutation<todoTypes, Omit<todoTypes, "id">>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),

    // editing a specifec todo
    editTodo: builder.mutation<todoTypes, { todoId: string; data: todoTypes }>({
      query: ({ todoId, data }) => ({
        url: `/todos/${todoId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todos", "singleTodo"],
    }),

    // deleting a specifec todo with id
    deleteTodo: builder.mutation<todoTypes, string>({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodoQuery,
  useCreateTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todosApiSlice;
