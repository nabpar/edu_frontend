import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const RoleBased = ({roles=['*']}) => {
  const { user} = useAuth();
  return roles.includes(user?.role) || roles.includes('*')?
  <Outlet /> : <Navigate to="/unauthorized" replace={true} />;
};

export default RoleBased;