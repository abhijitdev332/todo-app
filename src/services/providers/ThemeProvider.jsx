import React, { createContext, useContext, useState } from "react";

const themeContext = createContext("");

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const ChangeTheme = () => {
    setTheme(!theme);
  };
  return (
    <>
      <themeContext.Provider value={[theme, ChangeTheme]}>
        {children}
      </themeContext.Provider>
    </>
  );
};

export const usetheme = () => useContext(themeContext);

export default ThemeProvider;
