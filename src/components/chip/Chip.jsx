import React from "react";
import cl from "classnames";

const Chip = ({ title = "chip", color = "ornage" }) => {
  return (
    <>
      <div className="chip">
        <div className="flex">
          <div
            className={cl(
              "rounded-full text-center px-2 py-1 flex items-center"
            )}
            style={{ background: color }}
          >
            <span className="text-white font-serif capitalize text-sm">
              {title}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chip;
