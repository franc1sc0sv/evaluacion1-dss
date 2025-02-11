import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getUser } from "../api/user";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
