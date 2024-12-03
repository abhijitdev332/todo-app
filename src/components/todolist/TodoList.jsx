import React, { useState } from "react";
import { Todo } from "../component";
import cl from "classnames";
import { usetheme } from "../../services/providers/ThemeProvider";
const TodoList = ({ todos }) => {
  return (
    <main>
      <div className="container py-4">
        <div className="flex flex-col gap-3">
          {todos?.length > 0 ? (
            todos.map((ele, i) => <Todo todo={ele} key={i + 1} />)
          ) : (
            <p>no todos in here</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoList;
