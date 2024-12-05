import React, { createContext, useContext, useState } from "react";
let object = JSON.parse(localStorage.getItem("todos")) ?? [];
const todoContext = createContext(null);
const StoreProvider = ({ children }) => {
  const [todos, setTodos] = useState(
    object.length > 0
      ? [...object.filter((ele) => ele?.status == "pending")]
      : []
  );
  return (
    <todoContext.Provider value={[todos, setTodos]}>
      {children}
    </todoContext.Provider>
  );
};
export default StoreProvider;
export const useTodos = () => useContext(todoContext);
