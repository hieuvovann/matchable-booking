import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Topbar from "@/components/Topbar";
import { Cart } from "@/types/types";

interface ProtectedRouteProps {
  cartList: Cart[];
  handleRemoveFromCart: (index: number) => void;
};

export const ProtectedRoute = ({ cartList, handleRemoveFromCart }: ProtectedRouteProps) => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <>
    <Topbar cartList={cartList} handleRemoveFromCart={handleRemoveFromCart} />
    <div className="p-6"><Outlet /></div>
  </>;
};
