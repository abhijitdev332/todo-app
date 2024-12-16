import React, { useEffect, useState } from "react";

const UserHook = () => {
  // get user and session from storage
  const userLocal = JSON.parse(localStorage.getItem("user")) ?? false;
  const sessionLocal = sessionStorage.getItem("session") ?? false;

  const [userStatus, setUSerStatus] = useState({
    user: userLocal,
    session: sessionLocal,
  });
  // effect to check user and its session
  useEffect(() => {}, [userLocal, sessionLocal]);
  // return user and session
  if (userStatus?.user !== "" && userStatus?.session == "active") {
    return { user: userStatus?.user, session: userStatus?.session };
  } else {
    return { user: false, session: false };
  }
};

export default UserHook;
