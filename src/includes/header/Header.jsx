import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import cl from "classnames";
import { useNavigate } from "react-router-dom";
import { usetheme } from "../../services/providers/ThemeProvider";
import useUserHook from "../../hooks/UserHook";
import { AiOutlineFileDone } from "react-icons/ai";
import { useTodos } from "../../services/store/Store";
// styles

const Header = () => {
  const [_, setTodos] = useTodos();
  const navigate = useNavigate();
  const { user, session } = useUserHook();
  const [theme, changetheme] = usetheme();
  // handle logout
  const handleLogout = () => {
    // clear the session
    sessionStorage.removeItem("session");
    // navigate to auth page
    navigate("/", { replace: true });
  };
  // task complete click
  const handleCompleteClick = () => {
    const object = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(object?.filter((ele) => ele.status == "completed"));
  };
  return (
    <>
      <header
        className={cl(
          theme ? "bg-slate-600" : "bg-slate-300",
          "sticky top-0 z-50 h-fit"
        )}
      >
        <div className="lg:container lg:mx-auto py-5 px-3">
          <div className="flex">
            <div className="basis-1/3">
              <div className="logo font-bold sm:text-2xl">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    const object =
                      JSON.parse(localStorage.getItem("todos")) ?? [];
                    setTodos(
                      object?.filter((ele) => ele?.status !== "completed")
                    );
                  }}
                >
                  Todo <span className="inline-block text-green-500">A</span>pp
                </span>
              </div>
            </div>
            <div className="basis-2/3 flex ">
              <div className="navbar flex justify-end sm:gap-4  w-full md:px-5 items-center">
                {/* <ul className="navlist flex list-none gap-6 items-center px-5 transition-all">
                  <li className="font-semibold hover:text-green-500">Home</li>
                  <li className="font-semibold hover:text-green-500">Todos</li>
                </ul> */}
                <button
                  className="flex items-center"
                  onClick={handleCompleteClick}
                >
                  <AiOutlineFileDone fontSize={"1.6rem"} />
                  <span>Completed</span>
                </button>

                <button onClick={changetheme} className="px-5">
                  {theme ? (
                    <FaSun fontSize={"1.5rem"} />
                  ) : (
                    <FaMoon fontSize={"1.5rem"} />
                  )}
                </button>

                <div className="profile flex gap-1 sm:gap-3">
                  {/* <FaRegUserCircle fontSize={"1.5rem"} /> */}
                  <span
                    title={user?.name}
                    className=" px-2 bg-slate-400 rounded-full font-bold text-lg text-white"
                  >
                    {user && user?.name?.charAt(0).toUpperCase()}
                  </span>
                  <span
                    onClick={handleLogout}
                    className="font-semibold sm:text-lg cursor-pointer"
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
