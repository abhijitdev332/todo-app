import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("");

const ThemeProvider = ({ children }) => {
  // default light mode
  const [theme, setTheme] = useState(!!localStorage.getItem("theme") || true);
  // change theme func
  const ChangeTheme = () => {
    setTheme(!theme);
  };
  // run effect on theme change and set to localstorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
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
