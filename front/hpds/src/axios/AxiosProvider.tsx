import axios, { AxiosInstance } from "axios";
import { API_URL } from "../consts/consts";
import { ReactNode, createContext, useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

export interface AxiosContextType {
  axiosInstance: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextType | null>(null);

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = useContext(AuthContext) as AuthContextType;
  const API_URL = `${window.location.origin}/api`;
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (auth.is_logged_in && auth.token) {
        config.headers["Authorization"] = auth.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={{ axiosInstance }}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosContext;
