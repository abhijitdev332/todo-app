import React, { createContext, useContext, useState } from "react";
let object = JSON.parse(localStorage.getItem("todos")) ?? [];
const TodoContext = createContext(null);
const StoreProvider = ({ children }) => {
  // todo state
  const [todos, setTodos] = useState(
    object.length > 0
      ? [...object.filter((ele) => ele?.status == "pending")]
      : []
  );
  return (
    <TodoContext.Provider value={[todos, setTodos]}>
      {children}
    </TodoContext.Provider>
  );
};
export default StoreProvider;
// useTodos hook for using todocontext
export const useTodos = () => useContext(TodoContext);
