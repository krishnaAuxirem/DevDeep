import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth, getDashboardPath } from "@/lib/auth";
import ProtectedRoute from "@/components/features/ProtectedRoute";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

// Public pages
import Landing from "@/pages/Landing";
import LearningPathsPage from "@/pages/public/LearningPathsPage";
import CoursesPage from "@/pages/public/CoursesPage";
import CourseDetailsPage from "@/pages/public/CourseDetailsPage";
import CodingAcademyPage from "@/pages/public/CodingAcademyPage";
import ChallengesPage from "@/pages/public/ChallengesPage";
import ProjectsPage from "@/pages/public/ProjectsPage";
import ProjectDetailsPage from "@/pages/public/ProjectDetailsPage";
import AIMentorPage from "@/pages/public/AIMentorPage";
import MentorsPage from "@/pages/public/MentorsPage";
import MentorDetailsPage from "@/pages/public/MentorDetailsPage";
import PricingPage from "@/pages/public/PricingPage";
import PortfolioPage from "@/pages/public/PortfolioPage";
import JobsPage from "@/pages/public/JobsPage";
import JobDetailsPage from "@/pages/public/JobDetailsPage";
import InternshipsPage from "@/pages/public/InternshipsPage";
import FreelancePage from "@/pages/public/FreelancePage";
import CompaniesPage from "@/pages/public/CompaniesPage";
import CommunityPage from "@/pages/public/CommunityPage";
import CommunityDiscussionsPage from "@/pages/public/CommunityDiscussionsPage";
import CommunityGroupsPage from "@/pages/public/CommunityGroupsPage";
import CommunityShowcasePage from "@/pages/public/CommunityShowcasePage";
import CommunityHackathonsPage from "@/pages/public/CommunityHackathonsPage";
import CommunityEventsPage from "@/pages/public/CommunityEventsPage";
import DocumentationPage from "@/pages/public/DocumentationPage";
import SystemArchitecturePage from "@/pages/public/SystemArchitecturePage";
import BlogPage from "@/pages/public/BlogPage";
import BlogPostPage from "@/pages/public/BlogPostPage";
import OpenSourcePage from "@/pages/public/OpenSourcePage";
import ApiReferencePage from "@/pages/public/ApiReferencePage";
import AboutPage from "@/pages/public/AboutPage";
import CareersPage from "@/pages/public/CareersPage";
import SecurityPage from "@/pages/public/SecurityPage";
import ContactPage from "@/pages/public/ContactPage";
import FaqPage from "@/pages/public/FaqPage";
import TermsPage from "@/pages/public/TermsPage";
import PrivacyPage from "@/pages/public/PrivacyPage";
import SitemapPage from "@/pages/public/SitemapPage";
import NotFound from "@/pages/NotFound";

// Auth pages
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import SelectRole from "@/pages/auth/SelectRole";
import Onboarding from "@/pages/auth/Onboarding";

// Role-specific dashboards
import Dashboard from "@/pages/Dashboard";
import MentorDashboard from "@/pages/MentorDashboard";
import InstructorDashboard from "@/pages/InstructorDashboard";
import EmployerDashboard from "@/pages/EmployerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Developer dedicated feature views
import CodingChallenge from "@/pages/CodingChallenge";
import CodeReview from "@/pages/CodeReview";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import LearningView from "@/pages/developer/LearningView";
import PracticeView from "@/pages/developer/PracticeView";
import BuildView from "@/pages/developer/BuildView";
import AssessmentsView from "@/pages/developer/AssessmentsView";
import CareerView from "@/pages/developer/CareerView";
import ProductivityView from "@/pages/developer/ProductivityView";
import AnalyticsView from "@/pages/developer/AnalyticsView";
import CommunityView from "@/pages/developer/CommunityView";

// Guard: redirect logged-in users away from auth pages
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }
  return <>{children}</>;
}

// Smart dashboard redirect: takes logged in user to their role-specific dashboard
function DashboardRedirect() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getDashboardPath(user.role)} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* ── 1. PUBLIC PAGES ─────────────────────────────────────── */}
      <Route path="/" element={<Landing />} />

      {/* Learning & Practice Exploration */}
      <Route path="/learning-paths" element={<LearningPathsPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/coding-academy" element={<CodingAcademyPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      <Route path="/ai-mentor" element={<AIMentorPage />} />
      <Route path="/mentors" element={<MentorsPage />} />
      <Route path="/mentors/:id" element={<MentorDetailsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />

      {/* Career Public Pages */}
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/internships" element={<InternshipsPage />} />
      <Route path="/freelance" element={<FreelancePage />} />
      <Route path="/companies" element={<CompaniesPage />} />

      {/* Community Public Hub & Pages */}
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/discussions" element={<CommunityDiscussionsPage />} />
      <Route path="/community/groups" element={<CommunityGroupsPage />} />
      <Route path="/community/showcase" element={<CommunityShowcasePage />} />
      <Route path="/community/hackathons" element={<CommunityHackathonsPage />} />
      <Route path="/community/events" element={<CommunityEventsPage />} />

      {/* Resources & Technical Documentation */}
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/resources/system-architecture" element={<SystemArchitecturePage />} />
      <Route path="/system-architecture" element={<Navigate to="/resources/system-architecture" replace />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/open-source" element={<OpenSourcePage />} />
      <Route path="/api-reference" element={<ApiReferencePage />} />
      <Route path="/api" element={<Navigate to="/api-reference" replace />} />

      {/* Company & Legal */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/sitemap" element={<SitemapPage />} />

      {/* ── 2. AUTHENTICATION FLOW ──────────────────────────────── */}
      <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
      <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/select-role" element={<ProtectedRoute><SelectRole /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

      {/* ── 3. ROLE-SPECIFIC DASHBOARD ROUTING ───────────────────── */}
      {/* Root /dashboard redirects to the authenticated role's specific dashboard */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Developer Dashboard (shared by beginner, student, professional) */}
      <Route
        path="/dashboard/developer"
        element={
          <ProtectedRoute allowedRoles={["beginner", "student", "professional"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Mentor Dashboard */}
      <Route
        path="/dashboard/mentor"
        element={
          <ProtectedRoute allowedRoles={["mentor"]}>
            <MentorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Instructor Dashboard */}
      <Route
        path="/dashboard/instructor"
        element={
          <ProtectedRoute allowedRoles={["instructor"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employer Dashboard */}
      <Route
        path="/dashboard/employer"
        element={
          <ProtectedRoute allowedRoles={["employer"]}>
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ── 4. LEGACY DASHBOARD REDIRECTS ───────────────────────── */}
      <Route path="/mentor-dashboard" element={<Navigate to="/dashboard/mentor" replace />} />
      <Route path="/instructor-dashboard" element={<Navigate to="/dashboard/instructor" replace />} />
      <Route path="/employer-dashboard" element={<Navigate to="/dashboard/employer" replace />} />
      <Route path="/admin-dashboard" element={<Navigate to="/dashboard/admin" replace />} />

      {/* ── 5. PROTECTED DEVELOPER FEATURE SUB-ROUTES ───────────── */}
      <Route path="/challenge/:id" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CodingChallenge /></ProtectedRoute>} />
      <Route path="/debugging-lab" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><PracticeView initialTab="lab" /></ProtectedRoute>} />
      <Route path="/code-review" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CodeReview /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><Profile /></ProtectedRoute>} />
      <Route path="/public-profile" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><LearningView initialTab="paths" /></ProtectedRoute>} />
      <Route path="/my-courses" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><LearningView initialTab="courses" /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><LearningView initialTab="progress" /></ProtectedRoute>} />
      <Route path="/my-projects" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><BuildView initialTab="projects" /></ProtectedRoute>} />
      <Route path="/project-workspace" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><BuildView initialTab="workspace" /></ProtectedRoute>} />
      <Route path="/mentor" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><Dashboard /></ProtectedRoute>} />
      <Route path="/assessments" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><AssessmentsView initialTab="tests" /></ProtectedRoute>} />
      <Route path="/certificates" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><AssessmentsView initialTab="certificates" /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><ProductivityView initialTab="goals" /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><ProductivityView initialTab="tasks" /></ProtectedRoute>} />
      <Route path="/notes" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><ProductivityView initialTab="notes" /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><ProductivityView initialTab="calendar" /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><AnalyticsView /></ProtectedRoute>} />
      <Route path="/study-groups" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CommunityView initialTab="groups" /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CommunityView initialTab="events" /></ProtectedRoute>} />
      <Route path="/following" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CommunityView initialTab="following" /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute allowedRoles={["beginner", "student", "professional"]}><CareerView initialTab="applications" /></ProtectedRoute>} />

      {/* ── 6. CATCH-ALL (404) ──────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <ScrollToTopButton />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
