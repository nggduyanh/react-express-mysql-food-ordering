import { createContext } from "react";

const AdminContext = createContext();
export default function AdminLayoutContext({ children }) {
  const tokenJSON = JSON.parse(localStorage.getItem("token-admin"));
  const token = tokenJSON.token;
  return (
    <AdminContext.Provider value={{ token }}>{children}</AdminContext.Provider>
  );
}
export { AdminContext };
