import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("");

const ThemeProvider = ({ children }) => {
  // default light mode
  const [theme, setTheme] = useState(true);
  // change theme func
  const ChangeTheme = () => {
    setTheme(!theme);
  };
  return (
    <>
      <ThemeContext.Provider value={[theme, ChangeTheme]}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};
// use them func for accessing them state
export const usetheme = () => useContext(ThemeContext);

export default ThemeProvider;
