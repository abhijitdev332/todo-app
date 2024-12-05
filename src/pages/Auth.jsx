import React from "react";
import { Outlet } from "react-router-dom";
import AuthImage from "../assets/images/auth.jpg";
import { Toaster } from "react-hot-toast";

const Auth = () => {
  return (
    <>
      <div className="bg-slate-900 md:h-screen">
        <div className="flex md:w-10/12 mx-auto p-5 justify-center items-center h-full">
          <div className="card flex bg-slate-100 p-7  h-full rounded-md  flex-col md:mx-7 md:flex-row">
            <div className="basis-1/2 order-2 md:order-1">
              <Outlet />
            </div>
            <div className="basis-1/2 order-1 md:order-2">
              <div className="img-wrapper h-full ">
                <img
                  src={AuthImage}
                  alt="auth_image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Auth;