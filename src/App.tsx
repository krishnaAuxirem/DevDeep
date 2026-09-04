import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth, getDashboardPath } from "@/lib/auth";
import ProtectedRoute from "@/components/features/ProtectedRoute";

// Public pages
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

// Auth pages
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";

// App pages (protected)
import Dashboard from "@/pages/Dashboard";
import CodingChallenge from "@/pages/CodingChallenge";
import CodeReview from "@/pages/CodeReview";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

// Role-specific dashboards
import MentorDashboard from "@/pages/MentorDashboard";
import InstructorDashboard from "@/pages/InstructorDashboard";
import EmployerDashboard from "@/pages/EmployerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Guard: redirect logged-in users away from auth pages
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Auth (redirect away if already logged in) */}
      <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
      <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />

      {/* Protected: Developer dashboards (Beginner / Professional / Student) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/challenge/:id" element={<ProtectedRoute><CodingChallenge /></ProtectedRoute>} />
      <Route path="/challenges" element={<ProtectedRoute><CodingChallenge /></ProtectedRoute>} />
      <Route path="/code-review" element={<ProtectedRoute><CodeReview /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Protected: role-specific dashboards */}
      <Route path="/mentor-dashboard" element={<ProtectedRoute><MentorDashboard /></ProtectedRoute>} />
      <Route path="/instructor-dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/employer-dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      {/* Sidebar route aliases → protected */}
      <Route path="/mentor" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/assessments" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
