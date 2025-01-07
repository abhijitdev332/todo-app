import React, { useEffect, useMemo, useState } from "react";
import Chip from "../chip/Chip";
import { sidebar } from "../../constants/constant";
import tick from "../../assets/svgs/Vector.svg";
import { MdDeleteForever } from "react-icons/md";
import cl from "classnames";
import { useTodos } from "../../services/store/Store";
const Todo = ({ todo }) => {
  const [todos, setTodos] = useTodos();
  const [checked, setChecked] = useState(
    todo.status == "completed" ? true : false
  );
  const findColor = useMemo(() => {
    return sidebar.find((ele) => ele.title == todo?.category);
  }, [todo, checked]);
  const removeFromList = () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    let index = data?.findIndex((ele) => ele?.id == todo?.id);
    let updateData = data?.toSpliced(index, 1, {
      ...todo,
      status: "completed",
    });
    // set item to localstroage
    localStorage.setItem("todos", JSON.stringify(updateData));
    setTimeout(() => {
      setTodos([...updateData.filter((ele) => ele.status !== "completed")]);
    }, 1000);
  };
  const handleChange = () => {
    if (checked) {
      return;
    } else {
      setChecked(!checked);
      removeFromList();
    }
  };
  const handleDelete = () => {
    setTodos(todos.filter((ele) => ele.id !== todo.id));
    let data = JSON.parse(localStorage.getItem("todos"));
    let updatedData = data.filter((ele) => ele.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(updatedData));
  };
  useEffect(() => {
    setChecked(todo.status == "completed" ? true : false);
  }, [todo]);
  return (
    <div className={cl("w-fit", checked ? "animate-pulse" : "")}>
      <div className="flex flex-col gap-1 rounded-md bg-slate-300  p-3 sm:p-6">
        <div className="flex gap-3 w-fit">
          <div
            className="box w-[25px] h-[25px] rounded bg-transparent border-4 border-red-400"
            onClick={handleChange}
          >
            {checked ? <img src={tick} alt="tick" /> : ""}
          </div>
          <p
            className={cl(
              "text-black cursor-pointer",
              checked ? "text-red-500 line-through" : "text-black no-underline "
            )}
          >
            {todo.title}
          </p>
          <Chip title={todo.category} color={findColor?.bg ?? "orange"} />
        </div>
        <p className="text-sm font-semibold">Created-{todo?.createdAt}</p>
        {checked && (
          <button
            className="bg-red-300 p-3 rounded flex justify-center cursor-pointer"
            onClick={handleDelete}
          >
            <MdDeleteForever
              fontSize={"1.3rem"}
              color="red"
              className="hover:scale-125 transition-all"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
