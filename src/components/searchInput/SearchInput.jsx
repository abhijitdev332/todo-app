import React, { useEffect, useState } from "react";
import { useTodos } from "../../services/store/Store";
import useSetTodos from "../../hooks/UseSetTodos";

const SearchInput = () => {
  const [todos, setTodos] = useTodos();
  const [search, SetSearch] = useState("");
  const [setter] = useSetTodos();
  useEffect(() => {
    // const object = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (search.trim() == "") {
      return setter();
      //   setTodos(object?.filter((ele) => ele?.status !== "completed"));
    } else if (
      search.trim() == "" &&
      todos?.every((ele) => ele?.status == "completed")
    ) {
      return setter();
      //   setTodos(object?.filter((ele) => ele?.status == "completed"));
    }
    setTodos((prev) =>
      prev?.filter((ele) => {
        const regex = new RegExp(search, "gi");
        return ele?.title?.match(regex);
      })
    );
  }, [search]);

  return (
    <div>
      <h2 className="font-bold text-3xl text-black text-center md:text-start py-5">
        Tasks
      </h2>
      <input
        type="text"
        placeholder="Start Searching..."
        className="bg-slate-200 py-2 px-1 rounded outline-none w-full md:w-fit"
        value={search}
        onChange={(e) => SetSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
