import React from "react";
import { Todo } from "../component";
import cl from "classnames";
import { MdErrorOutline } from "react-icons/md";

import { useTodos } from "../../services/store/Store";
const TodoList = () => {
  const [todos] = useTodos();
  return (
    <div className="wrapper">
      <div className="py-4">
        <div className={cl("flex gap-4 flex-wrap")}>
          {todos?.length > 0 ? (
            todos.map((ele, i) => <Todo todo={ele} key={i + 1} />)
          ) : (
            <div className="p-3 bg-slate-300 rounded flex gap-2 items-center">
              <MdErrorOutline fontSize={"1.3rem"} color="red" />
              <span>no todos in here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
