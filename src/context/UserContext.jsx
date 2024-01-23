import { createContext, useState } from "react";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const initialState = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {
        isAuth: false,
        tokens: {
          access: "",
          refresh: "",
        },
      };
  const [user, setUser] = useState(initialState);

  function setData(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function setTokens(access, refresh) {
     setData({ ...user, tokens: { access, refresh } });
  }

  function setIsAuth(auth) {
     setData({ ...user, isAuth: auth });
  }

  function setUserData(user){
    setData(user)
  }

  return (
    <UserContext.Provider value={{ user, setTokens, setIsAuth, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider