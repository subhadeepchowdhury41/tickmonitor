"use client";

import axios from "axios";
import { parseCookies } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthContextType {
  user: any;
  accessToken: string | JwtPayload | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  updateRefreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null | JwtPayload>(
    null
  );
  const [user, setUser] = useState();

  const fetchUser = () => {
    const cookies = parseCookies();
    console.log(cookies);
    const accessToken = cookies.accessToken;
    if (accessToken) {
      setAccessToken(jwt.decode(accessToken));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/sigin", { email, password });
      setUser(response.data);
      setAccessToken(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const signup = async (email: string, password: string) => {
    try {
      const resposne = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      setUser(resposne.data);
      console.log(resposne.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateRefreshToken = async () => {
    try {
      const response = await axios.post("/api/auth/refresh");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        user,
        updateRefreshToken,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
