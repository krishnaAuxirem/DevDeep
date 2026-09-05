import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, LayoutDashboard, UserCheck } from "lucide-react";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { UserRole, ROLE_LABELS } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check role authorization if specified
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const userRoleLabel = ROLE_LABELS[user.role] || user.role;
    const requiredRolesList = allowedRoles.map(r => ROLE_LABELS[r] || r).join(", ");

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
            <ShieldAlert size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Role Authorization Restricted
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Denied</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              You are currently authenticated as <strong className="text-slate-800 font-semibold">{userRoleLabel}</strong>. This secure area requires authorization for <span className="font-semibold text-slate-700">{requiredRolesList}</span>.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Current Session:</span>
              <span className="font-semibold text-slate-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Assigned Role:</span>
              <span className="font-mono text-indigo-700 font-semibold">{user.role}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => navigate(getDashboardPath(user.role))}
              className="w-full py-2.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <LayoutDashboard size={15} />
              <span>Go to Your {userRoleLabel} Dashboard</span>
            </button>

            <button
              onClick={() => navigate("/select-role")}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <UserCheck size={15} />
              <span>Switch or Update Role</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Public Homepage</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
