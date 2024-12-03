import React, { useEffect, useState, useTransition } from "react";
import { Header, Sidebar } from "../includes/includes";
import { TodoList } from "../components/component";
import { sidebar } from "../constants/constant";
import toast, { Toaster } from "react-hot-toast";
import cl from "classnames";
import { IoClose } from "react-icons/io5";
import { usetheme } from "../services/providers/ThemeProvider";
let object = JSON.parse(localStorage.getItem("todos")) ?? [];
const Home = () => {
  const [theme] = usetheme();
  const [todos, setTodos] = useState(object.length > 0 ? object : []);
  const [modalShow, setModalShow] = useState(false);
  const [newTask, setnewTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("work");
  const [search, SetSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const handleModalShow = () => {
    setModalShow(!modalShow);
    setnewTask("");
    setTaskCategory("work");
  };
  const handleChange = (e) => {
    setnewTask(e.target.value);
  };
  const handleTaskAdd = () => {
    let date = new Date();
    let id = Math.floor(Math.random() * 100);
    if (newTask.trim() !== "" && taskCategory !== "") {
      setTodos((prev = []) => {
        localStorage.setItem(
          "todos",
          JSON.stringify([
            ...prev,
            {
              id: id,
              title: newTask,
              createdAt: date.toLocaleDateString(),
              status: "completed",
              category: taskCategory,
            },
          ])
        );
        return [
          ...prev,
          {
            id: id,
            title: newTask,
            createdAt: date.toLocaleDateString(),
            status: "completed",
            category: taskCategory,
          },
        ];
      });
      setModalShow(!modalShow);
      setnewTask("");
      setTaskCategory("");
    } else {
      toast.error("Please enter a task", {
        duration: 2000,
      });
    }
  };
  const inputChange = (ev) => {
    if (ev.target.value == "") {
      SetSearch("");
      return setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    startTransition(() => {
      SetSearch(ev.target.value);
      setTodos((prev) =>
        prev?.filter((ele) => {
          const regex = new RegExp(search, "gi");
          return ele?.title?.match(regex);
        })
      );
    });
  };
  // effects

  return (
    <>
      <div className="wrapper h-screen overflow-y-hidden">
        <Header />
        <main className="main">
          <div className="lg-container">
            <div className="flex">
              <Sidebar setTodos={setTodos} />
              <div
                className={cl(
                  theme ? "bg-white" : "bg-slate-900",
                  "w-full p-10"
                )}
              >
                <div className="w-8/12 flex flex-col gap-5">
                  <h2 className="font-bold text-3xl text-black">All Tasks</h2>
                  <input
                    type="text"
                    placeholder="Start Searching..."
                    className="bg-slate-200 py-2 px-1 rounded outline-none w-fit"
                    value={search}
                    onChange={inputChange}
                  />
                  <div className="flex justify-start">
                    <button
                      className="p-3 bg-green-400 rounded-md font-semibold text-lg"
                      onClick={handleModalShow}
                    >
                      Add Task
                    </button>
                  </div>
                  <TodoList todos={todos} />
                </div>
              </div>
            </div>
          </div>
        </main>
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
              onChange={handleChange}
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
