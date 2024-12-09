import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error__wrapper">
      <div className="h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="card bg-[#6242ff] p-4 rounded flex flex-col  justify-center">
            <h3 className="font-semibold text-lg text-white">
              Something Went Wrong
            </h3>
            <p className="font-semibold  text-white">
              Please try after sometimes
            </p>
            <Link
              to={-1}
              replace={true}
              className="p-3 my-3 font-medium hover:scale-105 transition-all bg-gray-100 rounded text-center"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
