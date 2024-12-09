import React, { useState } from "react";
import hand from "../assets/icons/hand.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = () => {
    for (let ele in inputState) {
      if (inputState[ele].trim() == "") {
        toast.error(`Please enter ${ele} field`);
        return;
      }
    }
    // check user from localstorage
    // redirect to todo page
    let user = JSON.parse(localStorage.getItem("user"));
    if (user == "" || user == undefined || user == null) {
      toast("Please Create Sign Up first");
      return;
    } else if (
      user?.email == inputState.email &&
      user?.password == inputState.password
    ) {
      sessionStorage.setItem("session", "active");
      return navigate("/home");
    } else {
      toast("Please enter correct credentials");
    }
  };
  return (
    <div className="flex flex-col px-3 py-2  max-w-prose">
      <h2 className="flex items-center justify-center gap-2 text-black font-bold font-serif ">
        <span>Welcome Back</span>
        <span>
          <img src={hand} alt="handwave" className="w-[20px] h-[20px]" />
        </span>
      </h2>
      <p className="font-semibold font-serif text-center md:px-3">
        Today is a new day. It's your day.You shape it.
      </p>
      <p className="font-semibold font-serif text-center py-3 md:px-3">
        Sign in to start managing your Todos
      </p>

      <label
        htmlFor=""
        className="flex flex-col justify-start font-serif py-2 lg:w-8/12 lg:mx-auto"
      >
        Email:
        <input
          type="text"
          value={inputState.email}
          onChange={(e) =>
            setInputState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="email"
          placeholder="Email"
          className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
        />
      </label>
      <label
        htmlFor=""
        className="flex flex-col justify-start font-serif py-2 lg:w-8/12 lg:mx-auto"
      >
        Password:
        <input
          type="text"
          value={inputState.password}
          onChange={(e) =>
            setInputState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
          placeholder="Password"
          className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
        />
      </label>

      <button
        className="bg-gray-900 py-2 px-3 rounded-md text-white my-3 lg:w-8/12 lg:mx-auto"
        onClick={handleSignIn}
      >
        Sign in
      </button>
      <p className="font-sans text-center">
        Don't have an account?
        <Link to={"/register"} className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
