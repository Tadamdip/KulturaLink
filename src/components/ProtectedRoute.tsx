import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { UserRole } from "../types/UserRole";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { currentUser, loading, profile, can } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0] dark:bg-slate-900 text-[#3E2F26] dark:text-slate-100">
        Checking access...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (profile?.status !== "active") {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!can(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;