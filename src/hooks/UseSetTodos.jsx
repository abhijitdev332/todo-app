import React from "react";
import { useTodos } from "../services/store/Store";

const useSetTodos = () => {
  // import from store
  const [todos, setTodos] = useTodos();
  // get todos from localstorage
  const object = JSON.parse(localStorage.getItem("todos")) ?? [];
  // setter function
  function setter() {
    if (object.length > 0) {
      setTodos(object?.filter((ele) => ele?.status !== "completed"));
    } else {
      setTodos(object);
    }
  }
  // return setter fucntion
  return [setter];
};

export default useSetTodos;
