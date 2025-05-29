import AddTodo from "../components/AddTodo";
import Header from "../components/Header";
import TodosList from "../components/TodosList";

const Todos = () => {
  return (
    <>
      <Header />

      <main className="mainContainer py-12 flex flex-col gap-6">
        {/* add new todo task  */}
        <AddTodo />

        {/* todos list section  */}
        <section>
          <h2 className="font-semibold my-2">Your todos list tasks:</h2>
          <TodosList />
        </section>
      </main>
    </>
  );
};

export default Todos;
