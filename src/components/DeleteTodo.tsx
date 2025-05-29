import { useDeleteTodoMutation } from "../state/todos/todosApiSlice";
import loadingIcon from "../assets/loading-white.svg";
import { toast } from "sonner";

interface deleteTodoTypes {
  id: string;
  title: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteTodo = ({ id, title, setState }: deleteTodoTypes) => {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const handleDelete = async () => {
    try {
      await deleteTodo(id).unwrap();
      setState(false);
      toast.success("Task deleted successflly");
    } catch (error: any) {
      toast.error(
        `${error?.error ?? "Something went wrong, please try agian!"}`
      );
    }
  };

  return (
    <section className="fixed top-0 left-0 w-full h-full z-50 bg-black/30 flex items-center justify-center">
      <div className="rounded-lg p-[40px] bg-white flex flex-col items-center gap-4">
        <p className="font-semibold">Delete this task "{title}"?</p>

        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={() => handleDelete()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold duration-150 cursor-pointer"
          >
            {isLoading ? (
              <img
                className="w-[25px] h-[25px]"
                src={loadingIcon}
                alt="loadingIcon"
              />
            ) : (
              "yes"
            )}
          </button>
          <button
            type="button"
            onClick={() => setState(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold duration-150 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteTodo;
