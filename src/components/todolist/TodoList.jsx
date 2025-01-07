import React, { useEffect, useState } from "react";
import { Todo } from "../component";
import cl from "classnames";
import { MdErrorOutline } from "react-icons/md";
import { useTodos } from "../../services/store/Store";
const TodoList = () => {
  const [todos] = useTodos();
  const [fillterTodo, setFillterTodo] = useState(todos || []);

  useEffect(() => {
    setFillterTodo(todos);
  }, [todos]);
  return (
    <div className="wrapper">
      <div className="py-4">
        <div className={cl("flex gap-4 flex-wrap")}>
          {fillterTodo?.length > 0 ? (
            fillterTodo.map((ele, i) => <Todo todo={ele} key={i + 1} />)
          ) : (
            <div className="p-3 bg-slate-300 rounded flex flex-col gap-2 items-center">
              <MdErrorOutline fontSize={"1.3rem"} color="red" />
              <span>No Todos in here</span>
              <span>Please Add a Todo!!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
