import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
  );
  const nav = useNavigate();

  // check if user is already logged in from session storage
  
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (username, password,role) => {
        const response = await axios.post("login/", {
         email : username,
          password: password,
          // role:role
        });
        sessionStorage.setItem("user", JSON.stringify(response?.data));
        setUser(response?.data);
  };
    //for LOGOUT
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    nav("/", { replace: true });
  };

  const register = async (name,email,password,password2,contact,role) => {
      return await axios.post("register/", {
        name: name,
        email: email,
        password: password,
        password2: password2,
        contact:contact,
        role:role
      });
      
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${user.token.access}`,
        },
      })
      console.log(response)
      const data=response?.data
      setUser({ ...user, ...data });
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...data })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const checkLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        getUser,
        checkLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
