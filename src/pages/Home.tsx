import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />

      <main className="mainContainer min-h-[600px] flex flex-col items-center justify-center gap-8">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Welcome to My Todos Application
        </h2>
        <Link
          to="/todos"
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md inline-block transition"
        >
          Go to my todos list
        </Link>
      </main>
    </>
  );
};

export default Home;
