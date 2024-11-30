import React, { createContext, useState, useContext, ReactNode } from "react";
import { URLS } from "@/constants/apiUrls";
import { PATHS } from "@/constants/paths";
import { apiCall } from "@/service/apiCall";
import { jwtDecode } from "jwt-decode";

// Define types for user and login body
interface User {
  [key: string]: any; // You can be more specific based on the decoded token structure
}

interface LoginBody {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (body: LoginBody) => Promise<any>;
  logout: () => void;
}

// Create the AuthContext with a default value of `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Define the AuthProvider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = async (body: LoginBody) => {
    const { password, email } = body;
    const trimmedPassword = password.trimEnd();
    const trimmedUsername = email.trim();
    const trimmedBody = {
      password: trimmedPassword,
      email: trimmedUsername,
    };
    
    const response = await apiCall("post", URLS.LOGINURL, trimmedBody);
    const { refreshToken, accessToken } = response?.message?.data?.token;

    if (accessToken && refreshToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const decodedUser = jwtDecode(accessToken);
      setUser(decodedUser);
    }

    return response?.message?.data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = PATHS.LOGIN;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
