import React, { createContext } from "react";
import { useSettings } from "./SettingGsneral";
import { useAuth } from "./AuthContext";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const auth = useAuth();  
  const settings = useSettings();   

  return (
    <AppContext.Provider
      value={{
        ...auth,       
        ...settings,   
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
