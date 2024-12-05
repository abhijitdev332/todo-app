import React from "react";
import { FaMoon, FaSun, FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import cl from "classnames";
import { useNavigate } from "react-router-dom";
import { usetheme } from "../../services/providers/ThemeProvider";
import useUserHook from "../../hooks/UserHook";
import { AiOutlineFileDone } from "react-icons/ai";
import { useTodos } from "../../services/store/Store";
// styles
import style from "./header.module.scss";
const Header = () => {
  const [_, setTodos] = useTodos();
  const navigate = useNavigate();
  const { user, session } = useUserHook();
  const [theme, changetheme] = usetheme();
  // handle logout
  const handleLogout = () => {
    // clear the session
    localStorage.removeItem("session");
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
          theme ? "bg-slate-600" : "bg-lime-300",
          "sticky top-0 z-50 h-fit"
          // showSidebar ? "block" : "hidden"
        )}
      >
        <div className="lg:container lg:mx-auto py-5 px-3">
          <div className="flex">
            <div className="basis-1/3">
              <div className="logo font-bold sm:text-2xl">
                <span
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
                  <span className=" px-1 bg-slate-400 rounded-full font-bold text-white">
                    {user && user?.name?.charAt(0).toUpperCase()}
                  </span>
                  <span
                    onClick={handleLogout}
                    className="font-semibold sm:text-lg"
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
