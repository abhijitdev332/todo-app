import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { sidebar } from "../../constants/constant.js";
import { AiOutlineFileDone } from "react-icons/ai";
import cl from "classnames";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { usetheme } from "../../services/providers/ThemeProvider.jsx";
import style from "./sidebar.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTodos } from "../../services/store/Store.jsx";
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [_, setTodos] = useTodos();
  const [theme] = usetheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const addCategory = () => {
    if (newCategory.trim("") !== "") {
      sidebar.push({
        id: Math.floor(Math.random() * 100),
        title: newCategory,
        link: newCategory,
        bg: getRandomColor(),
      });

      setNewCategory("");
      localStorage.setItem("sidebar", JSON.stringify(sidebar));
    } else {
      toast.error("Please enter New Category");
    }
  };
  useEffect(() => {
    if (selectedCategory == "") {
      let data = JSON.parse(localStorage.getItem("todos")) ?? [];
      return setTodos(data?.filter((ele) => ele?.status !== "completed"));
    } else {
      setTodos(
        JSON.parse(localStorage.getItem("todos"))?.filter(
          (ele) => ele.category.toLowerCase() == selectedCategory?.toLowerCase()
        )
      );
    }
  }, [selectedCategory]);
  const handleClose = () => {
    setShowSidebar(false);
  };
  useEffect(() => {
    if (selectedCategory !== "") {
      setShowSidebar(false);
    }
  }, [selectedCategory]);
  return (
    <>
      <aside
        className={cl(
          "p-6 bg-inherit lg:container lg:mx-auto",
          style.sidebar,
          showSidebar ? "left-0" : "-left-[100%]",
          "md:left-0",
          !theme ? "bg-slate-500" : "bg-white"
        )}
      >
        <button
          className={cl(style.closeBtn, "md:hidden hover:text-green-400")}
        >
          <IoIosCloseCircleOutline
            fontSize={"2rem"}
            color="inherit"
            onClick={handleClose}
          />
        </button>
        <div
          className={cl(
            "container mx-auto px-8 h-[80%] flex justify-center",
            style.hide__scroll
          )}
        >
          <div className="flex flex-col relative h-fit">
            <div
              className="font-bold lg:text-xl text-lg font-serif cursor-pointer hover:text-green-400 transition-all"
              onClick={() => {
                setShowSidebar(false);
                let data = JSON.parse(localStorage.getItem("todos")) ?? [];
                setTodos(data?.filter((ele) => ele?.status !== "completed"));
              }}
            >
              All tasks
            </div>
            <ul className="flex flex-col gap-5 py-10">
              {sidebar.map((ele, i) => {
                return (
                  <li
                    key={i + 1}
                    className={cl(
                      "p-2 hover:text-green-400 transition-all font-semibold",
                      selectedCategory == ele.title && "text-green-400"
                    )}
                  >
                    <button
                      className="capitalize text-lg"
                      onClick={() => {
                        setSelectedCategory(ele?.title);
                      }}
                    >
                      {ele.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* <div className="flex flex-col gap-5">
              <button
                className="flex gap-3 text-slate-700 items-center hover:text-green-400 transition-all w-full"
                onClick={() => {
                  setSelectedCategory("completed");
                }}
              >
                <AiOutlineFileDone /> <span>Completed Task</span>
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-2 bottom-10 left-0  mx-auto  ">
          <input
            type="text"
            className="bg-transparent p-2 outline-none rounded-md border-2 border-slate-900"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                addCategory();
              }
            }}
          />
          <div>
            <button
              className="bg-green-500 px-3 w-full py-2 text-center rounded-md cursor-pointer"
              onClick={addCategory}
            >
              Add
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
