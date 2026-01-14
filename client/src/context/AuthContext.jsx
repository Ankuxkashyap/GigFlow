import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const login = async (email, password) => {
    
    const res = await api.post("/auth/login", { email, password },{withCredentials: true});
    setUser(res.data.user);
    if(user?.role === "client") { 
      window.location.href = "/dashboard"
    }else{
      window.location.href = "/Gigs"
    }
    return res;
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
    },{withCredentials: true});
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    await api.get("/auth/logout", { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
