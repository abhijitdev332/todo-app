import React, { useState } from "react";
import { Header, Sidebar } from "../includes/includes";
import { TodoList } from "../components/component";
import { sidebar } from "../constants/constant";
import toast, { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "react-router-dom";
import SearchInput from "../components/searchInput/SearchInput";
import { IoClose } from "react-icons/io5";
import { usetheme } from "../services/providers/ThemeProvider";
import { GiHamburgerMenu } from "react-icons/gi";
// styles
import style from "./home.module.scss";
import cl from "classnames";
import { useTodos } from "../services/store/Store";

const Home = () => {
  const [theme] = usetheme();
  const [_, setTodos] = useTodos();
  const [modalShow, setModalShow] = useState(false);
  const [newTask, setnewTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("work");
  const [showSidebar, setShowSidebar] = useState(false);
  const handleModalShow = () => {
    setModalShow(!modalShow);
    setnewTask("");
    setTaskCategory("work");
  };
  const handleTaskAdd = () => {
    let date = new Date();
    let id = Math.floor(Math.random() * 100);
    let data = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (newTask.trim() !== "" && taskCategory !== "") {
      let newData = {
        id: id,
        title: newTask,
        createdAt: date.toLocaleDateString("en-GB"),
        status: "pending",
        category: taskCategory,
      };
      localStorage.setItem("todos", JSON.stringify([...data, newData]));
      data = JSON.parse(localStorage.getItem("todos")) ?? [];
      // setter();
      setTodos(data?.filter((ele) => ele?.status !== "completed"));
      setModalShow(!modalShow);
      setnewTask("");
      setTaskCategory("");
    } else {
      toast.error("Please enter a task", {
        duration: 2000,
      });
    }
  };

  const handleHamClick = () => {
    setShowSidebar(true);
  };

  return (
    <>
      <ScrollRestoration />
      <div className={cl(theme ? "bg-white" : "bg-slate-900")}>
        <Header />
        <div className="wrapper">
          <main className={style.main}>
            <div className="flex h-full">
              <div className={cl("m-5 h-[30px]", style.ham)}>
                <GiHamburgerMenu fontSize={"1.4rem"} onClick={handleHamClick} />
              </div>
              <Sidebar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <div className={cl(" bg-inherit w-full h-full p-3 md:p-10")}>
                <div className="flex flex-col gap-5 w-full">
                  <SearchInput />
                  <div className="flex md:justify-start justify-center">
                    <button
                      className="p-3 bg-green-400 rounded-md font-semibold text-lg"
                      onClick={handleModalShow}
                    >
                      Add Task
                    </button>
                  </div>
                  <div className={cl(style.list__wrapper)}>
                    <TodoList />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        className={cl(
          "modal fixed top-0 left-0 bg-[#f0f0f07b] w-screen h-screen",
          modalShow ? "block" : "hidden"
        )}
      >
        <div className="modal-wrapper h-full w-full flex justify-center items-center">
          <div className="form relative flex flex-col items-center gap-5 p-10 bg-[#50727B] rounded-md">
            <button
              className="absolute top-[10px] right-[10px] border-2 border-white"
              onClick={handleModalShow}
            >
              <IoClose fontSize={"1.4rem"} />
            </button>
            <p className="font-semibold text-lg">Add New Task</p>
            <input
              type="text"
              placeholder="Enter Task"
              className="bg-transparent outline-none border-2 text-white border-white p-2 rounded-md"
              value={newTask}
              onChange={(e) => {
                setnewTask(e.target.value);
              }}
            />
            <select
              className="bg-slate-300 w-full p-3 rounded-md outline-none capitalize"
              onChange={(e) => {
                setTaskCategory(e.target.value);
              }}
              value={taskCategory}
            >
              {sidebar.map((ele, i) => (
                <option className="capitalize" key={i + 1}>
                  {ele.title}
                </option>
              ))}
            </select>
            <button
              className="bg-teal-500 p-3 w-full rounded-lg font-bold text-lg font-serif"
              onClick={handleTaskAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Home;
