import { useContext } from "react";
import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "Ram Preet",
    email: "rampreet@root.com",
  });

  const updateUser = (updatedUser) => {
    setUser({ ...user, ...updatedUser });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
