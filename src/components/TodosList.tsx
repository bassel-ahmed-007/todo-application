import { useGetTodosQuery } from "../state/todos/todosApiSlice";
import type { todoTypes } from "../types";
import loadingIcon from "../assets/loading.svg";
import erroricon from "../assets/erroricon.svg";
import { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import { toast } from "sonner";

const TodosList = () => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const { data: todos, isLoading, isError, isFetching } = useGetTodosQuery();

  if (isError) {
    toast.error("Something went wrong, please try agian!");
  }

  return (
    <section className="flex flex-col items-center gap-4">
      {isLoading || isFetching ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
          <img
            src={loadingIcon}
            alt="loading todos"
            className="w-[80px] h-[80px]"
          />

          <p className="font-semibold">Loading todos ...</p>
        </div>
      ) : isError ? (
        <div className="min-h-[400px] flex  items-center justify-center gap-4">
          <img className="w-[25px] h-[25px]" src={erroricon} alt="error" />
          <p className="text-lg lg:text-2xl text-red-500 font-semibold">
            Failed to load todos
          </p>
        </div>
      ) : todos?.length === 0 ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
          <p className="text-lg lg:text-2xl font-semibold">
            No todos were found!
          </p>
        </div>
      ) : (
        todos?.map((todo: todoTypes) => {
          return (
            <div
              key={todo?.id}
              className="w-full bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row items-center justify-between gap-8 hover:scale-101 hover:bg-slate-100 duration-200"
            >
              {/* Content Section */}
              <div className="w-full flex flex-col items-center lg:items-start gap-4">
                <p className="text-xl font-semibold text-gray-800">
                  {todo?.title}
                </p>
                <p className="text-gray-600 text-sm text-center lg:text-left lg:max-w-[70%]">
                  {todo?.description}
                </p>

                {todo?.status === "done" ? (
                  <p className="text-sm text-green-600 font-medium">Done</p>
                ) : (
                  <p className="text-sm text-blue-600 font-medium">
                    In progress
                  </p>
                )}
              </div>

              {/* Buttons Section */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(todo?.id);
                    setShowEditPopup(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold duration-150 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(todo?.id);
                    setSelectedTitle(todo?.title);
                    setShowDeletePopup(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold duration-150 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}

      {/* handle showing popups  */}
      {showDeletePopup && (
        <DeleteTodo
          id={selectedId}
          title={selectedTitle}
          setState={setShowDeletePopup}
        />
      )}
      {showEditPopup && (
        <EditTodo id={selectedId} setState={setShowEditPopup} />
      )}
    </section>
  );
};

export default TodosList;
