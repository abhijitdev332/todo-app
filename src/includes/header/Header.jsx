import React from "react";
import { FaMoon, FaSun, FaRegUserCircle } from "react-icons/fa";
import cl from "classnames";
import { usetheme } from "../../services/providers/ThemeProvider";

// styles
import style from "./header.module.scss";
const Header = () => {
  const [theme, changetheme] = usetheme();
  return (
    <>
      <header className={cl(theme ? "bg-slate-600" : "bg-lime-300", "header")}>
        <div className="lg:container lg:mx-auto py-5 px-3">
          <div className="flex">
            <div className="basis-1/3">
              <div className="logo font-bold text-lg">
                Todo <span className="inline-block text-green-500">A</span>pp
              </div>
            </div>
            <div className="basis-2/3 flex ">
              <div className="navbar flex justify-end gap-4 w-full px-5 items-center">
                <div className="ham hidden">ham</div>
                <ul className="navlist flex list-none gap-6 items-center px-5 transition-all">
                  <li className="font-semibold hover:text-green-500">Home</li>
                  <li className="font-semibold hover:text-green-500">
                    Profile
                  </li>
                  <li className="font-semibold hover:text-green-500">Todos</li>
                  <li className="font-semibold hover:text-green-500">Logout</li>
                </ul>

                <button onClick={changetheme} className="px-7">
                  {theme ? (
                    <FaSun fontSize={"1.5rem"} />
                  ) : (
                    <FaMoon fontSize={"1.5rem"} />
                  )}
                </button>

                <div className="profile flex gap-3">
                  <FaRegUserCircle fontSize={"1.5rem"} />
                  <span>Admin</span>
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
