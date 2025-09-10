import { AuthContextProvider } from "./AuthContext";

function RootContextProvider({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default RootContextProvider;
