import React, { useState } from "react";
import hand from "../assets/icons/hand.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignUp = () => {
    for (let ele in inputState) {
      if (inputState[ele].trim() == "") {
        toast.error(`Please enter ${ele} field`);
        return;
      }
    }
    // set user in localstorage and redirect to todo page
    localStorage.setItem("user", JSON.stringify(inputState));
    localStorage.setItem("session", "active");
    navigate("/home");
  };
  return (
    <div className="flex flex-col gap-3 md:gap-7  py-7 px-5 max-w-prose">
      <h2 className="flex items-center justify-center gap-2 text-black font-bold font-serif ">
        <span>Welcome</span>
        <span>
          <img src={hand} alt="handwave" className="w-[20px] h-[20px]" />
        </span>
      </h2>
      <p className="font-semibold font-serif text-center md:px-3">
        Today is a new day. It's your day.You shape it.
      </p>
      <p className="font-semibold font-serif text-center md:px-3">
        Sign up to start managing your Todos
      </p>
      <div className="flex wrapper flex-col gap-3 mx-auto w-full ">
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Name:
          <input
            type="text"
            name="name"
            value={inputState.name}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Name"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Email:
          <input
            type="text"
            name="email"
            value={inputState.email}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Email"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Password:
          <input
            type="text"
            name="password"
            value={inputState.password}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Password"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>

        <button
          className="bg-gray-900 py-2 px-3 rounded-md text-white my-3 lg:w-8/12 lg:mx-auto"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
      <p className="font-sans text-center">
        have an account?
        <Link to={"/"} className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;