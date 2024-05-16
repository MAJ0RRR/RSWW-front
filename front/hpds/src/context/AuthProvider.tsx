import { ReactNode, createContext, useState, useEffect } from "react";

interface AuthInfo {
  is_logged_in: boolean;
  token: string;
}

export interface AuthContextType {
  auth: AuthInfo;
  setAuth: (authInfo: AuthInfo) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuthState] = useState<AuthInfo>(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedIsLoggedIn = sessionStorage.getItem("is_logged_in");
    return {
      is_logged_in: storedIsLoggedIn === "true",
      token: storedToken || "",
    };
  });

  //Function to set auth state and update sessionStorage
  const setAuth = (authInfo: AuthInfo) => {
    sessionStorage.setItem("token", authInfo.token);
    sessionStorage.setItem("is_logged_in", authInfo.is_logged_in.toString());
    setAuthState(authInfo);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedIsLoggedIn = sessionStorage.getItem("is_logged_in");

    if (storedToken && storedIsLoggedIn) {
      setAuthState({
        is_logged_in: storedIsLoggedIn === "true",
        token: storedToken,
      });
    }
  }, []); // Empty dependency array to run only once when component mounts

  const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("is_logged_in");
    setAuthState({
      is_logged_in: false,
      token: "",
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
