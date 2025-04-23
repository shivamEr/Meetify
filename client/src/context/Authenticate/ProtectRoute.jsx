import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
