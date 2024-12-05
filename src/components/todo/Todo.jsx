import React, { useEffect, useMemo, useState } from "react";
import Chip from "../chip/Chip";
import { sidebar } from "../../constants/constant";
import tick from "../../assets/svgs/Vector.svg";
import cl from "classnames";
const Todo = ({ todo }) => {
  const [checked, setChecked] = useState(
    todo.status == "completed" ? true : false
  );
  const findColor = useMemo(() => {
    return sidebar.find((ele) => ele.title == todo.category);
  }, [todo]);
  const handleChange = () => {
    setChecked(!checked);
  };

  // useEffect(() => {
  //   let object = JSON.parse(localStorage.getItem("todos"));
  //   let matchItem = object.find((ele) => ele?.id == todo?.id);
  //   let ObjIndex = object.findIndex((ele) => ele?.id == matchItem?.id);
  //   let updatedArr = object?.toSpliced(ObjIndex, 1, {
  //     ...matchItem,
  //     status: checked ? "completed" : "pending",
  //   });
  //   localStorage.setItem("todos", JSON.stringify(updatedArr));
  // }, [checked]);
  return (
    <div>
      <div className="flex  items-center">
        {/* <input
          type="checkbox"
          // checked={todo.status == "completed" ? true : ""}
          onChange={handleChange}
          className="w-[25px] h-[25px]"
        
        /> */}
        <div className="flex gap-3  w-fit" onClick={handleChange}>
          <div className="box w-[25px] h-[25px] rounded bg-transparent border-4 border-red-400">
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
          <Chip title={todo.category} color={findColor.bg} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
