import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Navigate } from "react-router-dom";

export default function Unauthorized() {
    const { role, profile } = useAuth();

    if (profile?.status === "active" && role === "admin") {
        return <Navigate to="/dashboard" replace />;
    }


    return (
        <div className="min-h-screen bg-[#F8F5F0] dark:bg-slate-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full        d-2xl shadow-md p-8 text-center">
                <h1 className="text-3xl font-bold text-[#3E2F26] dark:text-slate-100">
                Access Restricted
                </h1>

                <p className="text-gray-600 dark:text-slate-300 mt-3">
                {profile?.status === "pending"
                    ? "Your account is still pending approval."
                    : `Your current role (${role || "none"}) click the button below to proceed.`}
                </p>

                <Link
                to="/dashboard"
                className="inline-block mt-6 bg-[#556B2F] hover:bg-[#445523] text-white px-5 py-3 rounded-xl font-semibold transition"
                >
                Back to Dashboard
                </Link>
            </div>
        </div>
  );
}