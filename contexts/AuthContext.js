import React, { useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const username = "heykarthikwithu";
  const password = "password";
  const base64Credentials = Buffer.from(`${username}:${password}`).toString(
    "base64"
  );

  const value = {
    base64Credentials,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
