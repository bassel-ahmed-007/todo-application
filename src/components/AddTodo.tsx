import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateTodoMutation } from "../state/todos/todosApiSlice";
import type { todoTypes } from "../types";
import { toast } from "sonner";
import loadingIcon from "../assets/loading-white.svg";

const AddTodo = () => {
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
    },

    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      status: yup.string().required("Status is required"),
    }),

    onSubmit: async (values: Omit<todoTypes, "id">) => {
      try {
        await createTodo(values).unwrap();
        formik.resetForm();
        toast.success("Todo created successfully");
      } catch (error: any) {
        toast.error(`${error?.error ?? "Something went wrong"}`);
      }
    },
  });

  return (
    <section>
      <h2 className="font-semibold my-2">You can add tasks easily below:</h2>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between "
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* title  */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Task Tilte"
              disabled={isLoading}
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
              disabled={isLoading}
              className={`pl-4 pt-2 w-[300px] h-[40px] rounded-lg focus:outline-none border ${
                formik.errors.description ? "border-red-500" : "border-gray-200"
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
            <div className="h-[40px] flex items-center gap-4">
              Status:
              <input
                type="radio"
                id="done"
                name="status"
                value="done"
                checked={formik.values.status === "done"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
              />
              <label htmlFor="done" className="ml-[-10px] cursor-pointer">
                Done
              </label>
              <input
                type="radio"
                id="inprogress"
                name="status"
                value="inprogress"
                disabled={isLoading}
                checked={formik.values.status === "inprogress"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="inprogress" className="ml-[-10px] cursor-pointer">
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

        {/* add button  */}
        <button
          type="submit"
          className="w-[80px] h-[40px] bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold duration-150 cursor-pointer flex items-center justify-center"
        >
          {isLoading ? (
            <img
              className="w-[25px] h-[25px]"
              src={loadingIcon}
              alt="loadingIcon"
            />
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddTodo;
