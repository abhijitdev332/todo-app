import React from "react";
import { useTodos } from "../services/store/Store";

const useSetTodos = () => {
  const [todos, setTodos] = useTodos();
  const object = JSON.parse(localStorage.getItem("todos")) ?? [];

  function setter() {
    if (object.length > 0) {
      setTodos(object?.filter((ele) => ele?.status !== "completed"));
    } else {
      setTodos(object);
    }
  }
  return [setter];
};

export default useSetTodos;
