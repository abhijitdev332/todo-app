import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error__wrapper">
      <div className="h-screen">
        <div className="flex justify-center items-center h-full px-5">
          <div className="card bg-[#6242ff] p-4 rounded-md flex flex-col justify-center">
            <div
              style={{
                width: "100%",
                height: 0,
                paddingBottom: "86%",
                position: "relative",
              }}
            >
              <iframe
                src="https://giphy.com/embed/LBPi9kAlVrYkf4bmPs"
                width="100%"
                height="100%"
                style={{ position: "absolute", borderRadius: "10px" }}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="font-semibold text-lg text-white py-2">
              Something Went Wrong!!
            </h3>
            <p className="font-semibold  text-white">Please Go Back!!</p>
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
