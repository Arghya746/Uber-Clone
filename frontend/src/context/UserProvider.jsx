import React, { useState } from "react";
import { UserDataContext } from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: { firstName: "", lastName: "" },
  });

  return <UserDataContext.Provider value={{ user, setUser }}>{children}</UserDataContext.Provider>;
};

export default UserProvider;
