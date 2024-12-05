import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-300">
      <button type="button" className="flex gap-3" disabled>
        <svg
          className="animate-spin h-5 w-5 mr-3 bg-indigo-500"
          viewBox="0 0 40 40"
        ></svg>
        <span>Processing...</span>
      </button>
    </div>
  );
};

export default Loader;
