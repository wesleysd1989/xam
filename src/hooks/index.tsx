import React from "react";

import { UserProvider } from "./user";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppProvider;
