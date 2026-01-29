import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRole: string;
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // 1. Local storage se string uthao
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  // 2. Agar user ya token nahi hai, toh seedha Sign-In
  if (!userString || !token) {
    return (
      <Navigate 
        to="/sign-in?message=Login first to proceed" 
        state={{ from: location }} 
        replace 
      />
    );
  }
  const user: User = JSON.parse(userString);

  if (user.role !== allowedRole) {
    // Agar student admin dashboard kholne ki koshish kare
    return <Navigate to="/sign-in?message=Login as a student to proceed" replace state={{ from: location }}/>;
  }

  // Sab theek hai toh page dikhao
  return children;
};