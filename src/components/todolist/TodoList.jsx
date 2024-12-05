import React from "react";
import { Todo } from "../component";
import cl from "classnames";
import style from "./style.module.scss";
const TodoList = ({ todos }) => {
  return (
    <div className="wrapper">
      <div className="py-4">
        <div className={cl("flex flex-col gap-3")}>
          {todos?.length > 0 ? (
            todos.map((ele, i) => <Todo todo={ele} key={i + 1} />)
          ) : (
            <p>no todos in here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
