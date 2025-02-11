import React, { useEffect, useState } from "react";
import { sidebar } from "../../constants/constant.js";
import cl from "classnames";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { usetheme } from "../../services/providers/ThemeProvider.jsx";
import style from "./sidebar.module.scss";
import { useTodos } from "../../services/store/Store.jsx";
// random color genarator function
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  // global state
  const [_, setTodos] = useTodos();
  const [theme] = usetheme();
  // local states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [deletedCategoryIn, SetDeletedCategory] = useState(null);
  // todo setter fucntion
  const todoSetter = () => {
    let data = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(data?.filter((ele) => ele?.status !== "completed"));
  };
  // category add function
  const addCategory = () => {
    if (newCategory.trim("") !== "" && newCategory.length < 12) {
      sidebar.push({
        id: Math.floor(Math.random() * 100),
        title: newCategory,
        link: newCategory,
        bg: getRandomColor(),
      });

      setNewCategory("");
      localStorage.setItem("sidebar", JSON.stringify(sidebar));
    } else {
      toast.error("Please enter valid Category within 12 charcters");
    }
  };
  // category delete func
  const handleDeleteClick = () => {
    sidebar?.splice(deletedCategoryIn, 1);
    localStorage.setItem("sidebar", JSON.stringify(sidebar));
    SetDeletedCategory(null);
  };
  // sidebar close func
  const handleClose = () => {
    setShowSidebar(false);
  };
  // fillter and settodos on category changes
  useEffect(() => {
    if (selectedCategory == "") {
      todoSetter();
    } else {
      setTodos(
        JSON.parse(localStorage.getItem("todos"))?.filter(
          (ele) =>
            ele?.category?.toLowerCase() ==
            selectedCategory?.title?.toLowerCase()
        )
      );
    }
  }, [selectedCategory]);
  // hide sidebar if its not empty in small screen
  useEffect(() => {
    if (selectedCategory !== "") {
      setShowSidebar(false);
    }
  }, [selectedCategory]);
  // handle category delete
  useEffect(() => {
    if (deletedCategoryIn == null || deletedCategoryIn == undefined) {
      return;
    }
    handleDeleteClick();
  }, [deletedCategoryIn]);
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
              className="font-semibold cursor-pointer hover:text-green-400 transition-all"
              onClick={() => {
                setShowSidebar(false);
                todoSetter();
              }}
            >
              Pending Tasks
            </div>
            <ul className="flex flex-col gap-5 py-10">
              {sidebar.map((ele, i) => {
                return (
                  <li
                    key={i + 1}
                    className={cl(
                      "p-2 hover:text-green-400 transition-all font-semibold flex justify-between gap-2",
                      selectedCategory == ele.title && "text-green-400",
                      style.listItem
                    )}
                  >
                    <button
                      className="capitalize text-lg whitespace-nowrap"
                      onClick={() => {
                        setSelectedCategory(ele);
                      }}
                    >
                      {ele.title}
                    </button>

                    <button
                      className="invisible"
                      onClick={() => {
                        SetDeletedCategory(i);
                      }}
                    >
                      <IoClose fontSize={"1.7rem"} />
                    </button>
                  </li>
                );
              })}
            </ul>
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
