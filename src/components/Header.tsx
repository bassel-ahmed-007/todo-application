import { Link } from "react-router-dom";
import { useGetTodosQuery } from "../state/todos/todosApiSlice";

const Header = () => {
  const { data: todos } = useGetTodosQuery();

  const inprogressTasks = todos?.filter(
    (todo) => todo?.status === "inprogress"
  )?.length;

  const doneTasks = todos?.filter((todo) => todo?.status === "done")?.length;

  return (
    <header className="w-full h-[80px] bg-gray-200 sticky top-0 shadow-lg">
      <div className="mainContainer h-full flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          My Todos
        </Link>

        <div className="flex items-center gap-6">
          <p className="text-lg font-semibold">
            In progress:
            <span className="font-bold text-blue-700">{inprogressTasks}</span>
          </p>
          <p className="text-lg font-semibold">
            Done: <span className="font-bold text-green-600">{doneTasks}</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
