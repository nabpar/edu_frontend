import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Protected = () => {
  const { user} = useAuth();
  return user!== null ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default Protected;