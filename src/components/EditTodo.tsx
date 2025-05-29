import { useFormik } from "formik";
import * as yup from "yup";
import {
  useEditTodoMutation,
  useGetSingleTodoQuery,
} from "../state/todos/todosApiSlice";
import type { todoTypes } from "../types";
import loadingIcon from "../assets/loading-white.svg";
import loadingIconBlack from "../assets/loading.svg";
import { toast } from "sonner";
import erroricon from "../assets/erroricon.svg";

interface editTodoTypes {
  id: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTodo = ({ id, setState }: editTodoTypes) => {
  // fetching data for single todo
  const {
    data: singleTodo,
    isLoading: dataLoading,
    error: dataFetchingError,
  } = useGetSingleTodoQuery(id);

  // editing
  const [editTodo, { isLoading: editingLoading }] = useEditTodoMutation();

  // form validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: singleTodo?.id ?? "",
      title: singleTodo?.title ?? "",
      description: singleTodo?.description ?? "",
      status: singleTodo?.status ?? "",
    },

    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      status: yup.string().required("Status is required"),
    }),

    onSubmit: async (values: todoTypes) => {
      try {
        await editTodo({
          todoId: values?.id,
          data: values,
        }).unwrap();
        formik.resetForm();
        toast.success("Todo updated successfully");
        setState(false);
      } catch (error: any) {
        toast.error(
          `${error?.error ?? "Something went wrong, please try agian!"}`
        );
      }
    },
  });

  return (
    <section className="fixed top-0 left-0 w-full h-full z-50 bg-black/30 flex items-center justify-center">
      {dataLoading ? (
        <div>
          {" "}
          <img
            className="w-[60px] h-[60px]"
            src={loadingIconBlack}
            alt="loading"
          />
        </div>
      ) : dataFetchingError ? (
        <div className="rounded-lg p-[20px] bg-white flex flex-col items-center gap-4">
          <div className="flex  items-center justify-center gap-4">
            <img className="w-[25px] h-[25px]" src={erroricon} alt="error" />
            <p className="text-lg text-red-500 font-semibold">
              Fetching data error, please try again!
            </p>
          </div>

          <div
            onClick={() => setState(false)}
            className="cursor-pointer p-[10px] rounded-lg bg-red-500 flex items-center justify-center font-semibold text-white"
          >
            close
          </div>
        </div>
      ) : (
        <div className="rounded-lg p-[40px] bg-white flex flex-col items-center gap-4">
          <div className="w-full flex items-center justify-between">
            <h2 className="font-semibold my-2">Edit task</h2>
            <div
              onClick={() => setState(false)}
              className="cursor-pointer w-[30px] h-[30px] rounded-full bg-amber-300 flex items-center justify-center font-semibold"
            >
              X
            </div>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 items-center justify-between"
          >
            <div className="flex flex-col items-center gap-8">
              {/* title  */}
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder="Task Tilte"
                  disabled={dataLoading || editingLoading}
                  className={`pl-4 w-[300px] h-[40px] rounded-lg focus:outline-none border ${
                    formik.errors.title ? "border-red-500" : "border-gray-200"
                  }`}
                />

                <div className="pl-4">
                  {formik.errors.title && (
                    <p className="text-red-500">{formik.errors.title}</p>
                  )}
                </div>
              </div>

              {/* description */}
              <div className="flex flex-col gap-1">
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Task Description"
                  disabled={dataLoading || editingLoading}
                  className={`pl-4 pt-2 w-[300px] h-[40px] rounded-lg focus:outline-none border ${
                    formik.errors.description
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                ></textarea>

                <div className="pl-4">
                  {formik.errors.description && (
                    <p className="text-red-500">{formik.errors.description}</p>
                  )}
                </div>
              </div>

              {/* status  */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  Status:
                  <input
                    type="radio"
                    id="doneEdit"
                    name="status"
                    value="done"
                    checked={formik.values.status === "done"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={dataLoading || editingLoading}
                  />
                  <label
                    htmlFor="doneEdit"
                    className="ml-[-10px] cursor-pointer"
                  >
                    Done
                  </label>
                  <input
                    type="radio"
                    id="inprogressEdit"
                    name="status"
                    value="inprogress"
                    disabled={dataLoading || editingLoading}
                    checked={formik.values.status === "inprogress"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    htmlFor="inprogressEdit"
                    className="ml-[-10px] cursor-pointer"
                  >
                    In Progress
                  </label>
                </div>

                <div className="pl-4">
                  {formik.touched.status && formik.errors.status && (
                    <p className="text-red-500">{formik.errors.status}</p>
                  )}
                </div>
              </div>
            </div>

            {/* save button  */}
            <button
              type="submit"
              className="w-[80px] h-[40px] bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold duration-150 cursor-pointer flex items-center justify-center"
            >
              {editingLoading ? (
                <img
                  className="w-[25px] h-[25px]"
                  src={loadingIcon}
                  alt="loadingIcon"
                />
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default EditTodo;
