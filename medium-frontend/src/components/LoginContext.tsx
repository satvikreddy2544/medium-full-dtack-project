import { createContext } from "react";


interface LoginContextType {
    // Define your context properties here
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
  }
  
  // Provide a default value for the context
  const defaultLoginContext: LoginContextType = {
    text: "",
    setText: () => {}
  };
  
  // Create the context with the default value
  const LoginContext = createContext<LoginContextType>(defaultLoginContext);
  
  export default LoginContext;