import React, { useEffect } from "react";

const UserHook = () => {
  const user = JSON.parse(localStorage.getItem("user")) ?? false;
  const session = sessionStorage.getItem("session") ?? false;
  useEffect(() => {}, [user, session]);
  if (user !== "" && session == "active") {
    return { user, session };
  } else {
    return { user: false, session: false };
  }
};

export default UserHook;
