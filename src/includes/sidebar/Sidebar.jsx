import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { sidebar } from "../../constants/constant.js";
import { AiOutlineFileDone } from "react-icons/ai";
import cl from "classnames";
import toast from "react-hot-toast";
import { usetheme } from "../../services/providers/ThemeProvider.jsx";
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Sidebar = ({ setTodos }) => {
  const [theme] = usetheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const inputRef = useRef(null);
  const addCategory = (e) => {
    e.stopPropagation();
    if (newCategory.trim("") !== "") {
      sidebar.push({
        id: Math.floor(Math.random() * 100),
        title: newCategory,
        link: newCategory,
        bg: getRandomColor(),
      });
      setShowInput(false);
      setNewCategory("");
      localStorage.setItem("sidebar", JSON.stringify(sidebar));
    } else {
      toast.error("Please enter New Category");
    }
  };
  useEffect(() => {
    if (selectedCategory == "") {
      return setTodos(JSON.parse(localStorage.getItem("todos")) ?? []);
    } else if (selectedCategory == "completed") {
      let object = JSON.parse(localStorage.getItem("todos")) ?? [];
      return setTodos(object?.filter((ele) => ele.status == "completed"));
    }
    setTodos(
      JSON.parse(localStorage.getItem("todos"))?.filter(
        (ele) => ele.category.toLowerCase() == selectedCategory?.toLowerCase()
      )
    );
  }, [selectedCategory]);
  useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);
  return (
    <>
      <aside
        className={cl(theme ? "bg-slate-200" : "bg-slate-800", "p-10 h-screen")}
        onClick={() => {
          if (showInput) {
            setShowInput(false);
          }
        }}
      >
        <div className="container mx-auto px-8">
          <div className="flex flex-col">
            <div
              className="font-bold lg:text-xl text-lg font-serif cursor-pointer hover:text-green-400 transition-all"
              onClick={() => {
                setSelectedCategory("");
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
              <div className={cl("gap-3", showInput ? "flex" : "hidden")}>
                <input
                  type="text"
                  className="bg-transparent p-2 outline-none rounded-md border-2 border-slate-900"
                  value={newCategory}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewCategory(e.target.value);
                  }}
                  ref={inputRef}
                />
                <button
                  className="bg-green-500 px-3 py-2 text-center rounded-md cursor-pointer"
                  onClick={addCategory}
                >
                  Add
                </button>
              </div>
            </ul>
            <div className="flex flex-col gap-5">
              <button
                className="flex gap-3 text-slate-700 items-center hover:text-green-400 transition-all w-full"
                onClick={() => {
                  setShowInput(!showInput);
                }}
              >
                <FaPlus /> <span>New Category</span>
              </button>
              <button
                className="flex gap-3 text-slate-700 items-center hover:text-green-400 transition-all w-full"
                onClick={() => {
                  setSelectedCategory("completed");
                }}
              >
                <AiOutlineFileDone /> <span>Completed Task</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
