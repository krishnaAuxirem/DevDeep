import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, BookOpen, Shield, BarChart3, AlertTriangle, CheckCircle2,
  Search, Trash2, Flag, TrendingUp, Activity, Clock, Eye,
  UserCheck, ChevronRight, Bell, Settings, Lock, Plus, Edit3,
  X, ExternalLink, IndianRupee, RefreshCw, FileText, Check,
  AlertCircle, Building2, UserX, ShieldCheck, Sparkles, Filter,
  Star
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import LiveActivityStream from "@/components/features/LiveActivityStream";
import { useAuth, getDashboardPath } from "@/lib/auth";
import { ROLE_LABELS, UserRole } from "@/types/auth";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Suspended" | "Pending";
  joined: string;
  score: number;
}

interface MentorVerification {
  id: string;
  name: string;
  specialties: string;
  experience: string;
  company: string;
  linkedin: string;
  github: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface CompanyVerification {
  id: string;
  companyName: string;
  industry: string;
  cinOrGstin: string;
  domain: string;
  rolesCount: number;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface ContentCourse {
  id: string;
  title: string;
  author: string;
  track: string;
  submitted: string;
  status: "Pending Review" | "Approved" | "Needs Changes";
  featured: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  content: string;
}

const INITIAL_ADMIN_USERS: AdminUser[] = [
  { id: "u1", name: "Alex Volkov", email: "alex@example.com", role: "professional", status: "Active", joined: "Jan 12, 2026", score: 96 },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com", role: "mentor", status: "Active", joined: "Dec 05, 2025", score: 94 },
  { id: "u3", name: "Ryo Tanaka", email: "ryo@example.com", role: "student", status: "Active", joined: "Feb 01, 2026", score: 82 },
  { id: "u4", name: "Sarah Kim", email: "sarah@example.com", role: "beginner", status: "Active", joined: "Feb 14, 2026", score: 65 },
  { id: "u5", name: "Marco Silva", email: "marco@example.com", role: "instructor", status: "Active", joined: "Jan 28, 2026", score: 91 },
  { id: "u6", name: "Razorpay Tech Hiring", email: "recruiting@razorpay.com", role: "employer", status: "Active", joined: "Nov 20, 2025", score: 99 },
  { id: "u7", name: "Devansh Roy", email: "devansh@example.com", role: "professional", status: "Suspended", joined: "Jan 03, 2026", score: 45 },
];

const INITIAL_MENTOR_VERIFICATIONS: MentorVerification[] = [
  {
    id: "mv1",
    name: "Dr. Ananya Iyer",
    specialties: "Distributed Systems & Raft Consensus in Go",
    experience: "12 years (Ex-Google, Staff Systems)",
    company: "Uber Core Platform",
    linkedin: "https://linkedin.com/in/ananya-iyer",
    github: "https://github.com/ananya-distrib",
    submitted: "2 hours ago",
    status: "Pending",
  },
  {
    id: "mv2",
    name: "Gaurav Sen",
    specialties: "High-Throughput Microservices & Caching",
    experience: "9 years",
    company: "Swiggy Core",
    linkedin: "https://linkedin.com/in/gaurav-sen",
    github: "https://github.com/gaurav-core",
    submitted: "5 hours ago",
    status: "Pending",
  },
];

const INITIAL_COMPANY_VERIFICATIONS: CompanyVerification[] = [
  {
    id: "cv1",
    companyName: "PhonePe Private Limited",
    industry: "UPI & Digital Payments Core",
    cinOrGstin: "29AAAAA0000A1Z5 / U72900KA2012PTC066762",
    domain: "phonepe.com",
    rolesCount: 4,
    submitted: "3 hours ago",
    status: "Pending",
  },
  {
    id: "cv2",
    companyName: "Sarvam AI Labs",
    industry: "Sovereign Generative AI & Inference Systems",
    cinOrGstin: "29BBBBB1111B2Z8 / U72200KA2023PTC176543",
    domain: "sarvam.ai",
    rolesCount: 2,
    submitted: "1 day ago",
    status: "Pending",
  },
];

const INITIAL_COURSES: ContentCourse[] = [
  { id: "cc1", title: "Database Internals: LSM Trees, WAL & B-Trees", author: "Marco Silva", track: "Storage Engines", submitted: "1 day ago", status: "Pending Review", featured: false },
  { id: "cc2", title: "High-Performance Zero-Knowledge Circuits in Rust", author: "Elena Rostova", track: "Cryptography", submitted: "3 hours ago", status: "Pending Review", featured: false },
  { id: "cc3", title: "eBPF Tracing & Observability in Linux 6.8", author: "Priya Sharma", track: "Systems & Linux", submitted: "2 days ago", status: "Approved", featured: true },
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Understanding Raft State Machine Safety & Log Invariants",
    slug: "understanding-raft-state-machine-safety",
    category: "Distributed Systems",
    author: "DevDeep Research Team",
    readTime: "8 min read",
    published: true,
    content: "When building distributed consensus systems, the fundamental safety invariant requires that if a leader has applied an entry at a given index, no other server will ever apply a different log entry for that index...",
  },
  {
    id: "b2",
    title: "Lock-Free Atomics: Demystifying Acquire-Release Memory Ordering",
    slug: "demystifying-acquire-release-memory-ordering",
    category: "Concurrency",
    author: "Alex Volkov",
    readTime: "12 min read",
    published: true,
    content: "Modern multi-core CPU architectures (such as ARM64 and x86-64) enforce differing degrees of hardware memory model ordering. In this article, we dissect memory fences and atomic pointer exchanges...",
  },
  {
    id: "b3",
    title: "Inside LSM Trees: Why RocksDB Writes Beat B-Trees by 10x",
    slug: "inside-lsm-trees-rocksdb-write-amplification",
    category: "Databases",
    author: "Elena Rostova",
    readTime: "10 min read",
    published: false,
    content: "Log-Structured Merge-trees convert random disk writes into sequential disk appends through MemTable memory buffers and append-only Write-Ahead Logs (WAL)...",
  },
];

const PLATFORM_GROWTH_DATA = [
  { month: "Sep 2025", users: 18400, active: 12200 },
  { month: "Oct 2025", users: 22800, active: 15400 },
  { month: "Nov 2025", users: 27100, active: 18900 },
  { month: "Dec 2025", users: 31500, active: 22400 },
  { month: "Jan 2026", users: 35200, active: 25800 },
  { month: "Feb 2026", users: 38421, active: 28900 },
];

const REVENUE_BREAKDOWN_DATA = [
  { month: "Sep 2025", subscriptions: 1800000, marketplace: 1200000, hiringFees: 1500000 },
  { month: "Oct 2025", subscriptions: 2200000, marketplace: 1600000, hiringFees: 2000000 },
  { month: "Nov 2025", subscriptions: 2600000, marketplace: 1900000, hiringFees: 2400000 },
  { month: "Dec 2025", subscriptions: 3100000, marketplace: 2200000, hiringFees: 3000000 },
  { month: "Jan 2026", subscriptions: 3800000, marketplace: 2700000, hiringFees: 3600000 },
  { month: "Feb 2026", subscriptions: 4500000, marketplace: 3200000, hiringFees: 4200000 },
];

export default function AdminDashboard() {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"overview" | "users" | "verifications" | "content" | "moderation" | "analytics">("overview");

  // User Management State
  const [usersList, setUsersList] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userStatusFilter, setUserStatusFilter] = useState<string>("all");

  // User Modals State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [currentUserForEdit, setCurrentUserForEdit] = useState<AdminUser | null>(null);

  // New user form state
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>("professional");
  const [newUserPassword, setNewUserPassword] = useState("demo123");

  // Verification Queues State
  const [mentorVerifications, setMentorVerifications] = useState<MentorVerification[]>(INITIAL_MENTOR_VERIFICATIONS);
  const [companyVerifications, setCompanyVerifications] = useState<CompanyVerification[]>(INITIAL_COMPANY_VERIFICATIONS);
  const [verificationSubTab, setVerificationSubTab] = useState<"mentors" | "companies">("mentors");

  // Reason Modal State
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reasonTarget, setReasonTarget] = useState<{ id: string; name: string; type: "mentor" | "company" } | null>(null);
  const [declineReason, setDeclineReason] = useState("");

  // Content Management State
  const [coursesList, setCoursesList] = useState<ContentCourse[]>(INITIAL_COURSES);
  const [blogsList, setBlogsList] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [contentSubTab, setContentSubTab] = useState<"courses" | "blogs">("courses");

  // Blog CRUD Modals
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isBlogReaderOpen, setIsBlogReaderOpen] = useState(false);
  const [activeBlogItem, setActiveBlogItem] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Distributed Systems");
  const [blogContent, setBlogContent] = useState("");
  const [blogReadTime, setBlogReadTime] = useState("6 min read");
  const [blogPublished, setBlogPublished] = useState(true);

  // Community Moderation State
  const [moderationItems, setModerationItems] = useState([
    { id: "mod1", type: "Comment", content: "Spam link detected in discussion #42: 'Free crypto tokens for solving Raft challenge'", user: "crypto_bot_99", severity: "High", time: "1h ago" },
    { id: "mod2", type: "Profile", content: "Suspicious employer profile attempting bulk unsolicited DM reachouts", user: "Unverified Inc", severity: "High", time: "3h ago" },
    { id: "mod3", type: "Discussion", content: "Potential code plagiarism in submitted solution for S3 Object Storage Lab", user: "learner_02", severity: "Medium", time: "5h ago" },
  ]);

  // Handle "Preview User Dashboard"
  const handlePreviewUserDashboard = (targetUser: AdminUser) => {
    const previewData = {
      userName: targetUser.name,
      role: targetUser.role,
      targetPath: getDashboardPath(targetUser.role),
    };
    sessionStorage.setItem("devdeep_admin_preview", JSON.stringify(previewData));
    switchRole(targetUser.role);
    toast.success(`Entering read-only preview as ${targetUser.name} (${ROLE_LABELS[targetUser.role]}).`);
    navigate(previewData.targetPath);
  };

  // Add User
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error("Please fill in name and email.");
      return;
    }
    const createdUser: AdminUser = {
      id: `u-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: "Active",
      joined: "Today",
      score: 75,
    };
    setUsersList(prev => [createdUser, ...prev]);
    setIsAddUserModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    toast.success(`User ${createdUser.name} created successfully!`);
  };

  // Edit User
  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserForEdit) return;
    setUsersList(prev =>
      prev.map(u => (u.id === currentUserForEdit.id ? currentUserForEdit : u))
    );
    setIsEditUserModalOpen(false);
    toast.success(`User ${currentUserForEdit.name} updated.`);
  };

  // Suspend / Reactivate User
  const handleToggleSuspendUser = (id: string, name: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setUsersList(prev =>
      prev.map(u => (u.id === id ? { ...u, status: newStatus as any } : u))
    );
    toast.info(`User ${name} marked as ${newStatus}.`);
  };

  // Delete User
  const handleDeleteUser = (id: string, name: string) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
    toast.error(`User ${name} deleted from platform.`);
  };

  // Reset Password
  const handleResetPassword = (name: string, email: string) => {
    toast.success(`Password reset token generated and sent to ${email} (Temp pass: Reset@2026)`);
  };

  // Mentor Verification Approve
  const handleApproveMentor = (id: string, name: string) => {
    setMentorVerifications(prev =>
      prev.map(m => (m.id === id ? { ...m, status: "Approved" } : m))
    );
    toast.success(`Mentor credentials approved for ${name}! Verification badge activated.`);
  };

  // Company Verification Approve
  const handleApproveCompany = (id: string, name: string) => {
    setCompanyVerifications(prev =>
      prev.map(c => (c.id === id ? { ...c, status: "Approved" } : c))
    );
    toast.success(`Company verification approved for ${name}! Hiring portal unblocked.`);
  };

  // Open Decline Reason Modal
  const handleOpenDeclineModal = (id: string, name: string, type: "mentor" | "company") => {
    setReasonTarget({ id, name, type });
    setDeclineReason("");
    setIsReasonModalOpen(true);
  };

  // Submit Decline Reason
  const handleSubmitDeclineReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonTarget) return;

    if (reasonTarget.type === "mentor") {
      setMentorVerifications(prev =>
        prev.map(m => (m.id === reasonTarget.id ? { ...m, status: "Rejected" } : m))
      );
    } else {
      setCompanyVerifications(prev =>
        prev.map(c => (c.id === reasonTarget.id ? { ...c, status: "Rejected" } : c))
      );
    }

    setIsReasonModalOpen(false);
    toast.error(
      `${reasonTarget.name} declined with reason: "${declineReason || "Verification criteria unmet."}"`
    );
  };

  // Course Publish / Feature
  const handleToggleFeatureCourse = (id: string, title: string) => {
    setCoursesList(prev =>
      prev.map(c => (c.id === id ? { ...c, featured: !c.featured } : c))
    );
    toast.success(`Updated homepage spotlight for "${title}".`);
  };

  // Save / Update Blog Post
  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      toast.error("Please enter a blog title.");
      return;
    }

    if (activeBlogItem) {
      // Edit existing
      setBlogsList(prev =>
        prev.map(b =>
          b.id === activeBlogItem.id
            ? {
                ...b,
                title: blogTitle,
                category: blogCategory,
                content: blogContent,
                readTime: blogReadTime,
                published: blogPublished,
              }
            : b
        )
      );
      toast.success(`Article "${blogTitle}" updated.`);
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `b-${Date.now()}`,
        title: blogTitle,
        slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: blogCategory,
        author: user?.name || "Platform Editorial",
        readTime: blogReadTime,
        published: blogPublished,
        content: blogContent,
      };
      setBlogsList(prev => [newPost, ...prev]);
      toast.success(`New article "${blogTitle}" published!`);
    }

    setIsBlogModalOpen(false);
    setActiveBlogItem(null);
  };

  // Delete Blog Post
  const handleDeleteBlog = (id: string, title: string) => {
    setBlogsList(prev => prev.filter(b => b.id !== id));
    toast.error(`Article "${title}" deleted.`);
  };

  // Filtered users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      !userSearchQuery ||
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === "all" || u.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-[1350px] mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-md border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-md bg-rose-500/10 border border-rose-200 flex items-center justify-center text-rose-700 font-bold shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                    <h1 className="text-slate-900 text-2xl font-bold tracking-tight">
                      Admin Control Engine
                    </h1>
                    <span className="dd-chip bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono inline-flex items-center gap-1">
                      <ShieldCheck size={11} /> SUPERADMIN
                    </span>
                    <span className="dd-chip-completed text-[10px]">
                      Full Governance & Telemetry
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Platform moderation, full CRUD user management, verification pipelines, content publishing, and live analytics.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => toast.info("No security alerts. Distributed cluster running in zero-trust mode.")}
                  className="btn-ghost text-xs relative"
                >
                  <Bell size={13} />
                  Alerts
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </button>
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="btn-primary text-xs shadow-sm"
                >
                  <Plus size={13} /> Add User
                </button>
              </div>
            </div>

            {/* Real-Time Live Activity Stream */}
            <LiveActivityStream />

            {/* Platform Overview Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Total Platform Users</p>
                  <Users size={14} className="text-indigo-900" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">38,421</p>
                <p className="text-success text-xs font-semibold mt-0.5">+842 this week</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Active Courses</p>
                  <BookOpen size={14} className="text-eblue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 font-mono">214</p>
                <p className="text-slate-400 text-xs">{coursesList.filter(c => c.status === "Pending Review").length} pending review</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Verifications Queue</p>
                  <UserCheck size={14} className="text-warning" />
                </div>
                <p className="text-2xl font-bold text-amber-600 font-mono">
                  {mentorVerifications.filter(m => m.status === "Pending").length + companyVerifications.filter(c => c.status === "Pending").length}
                </p>
                <p className="text-slate-400 text-xs">Mentors & Companies</p>
              </div>

              <div className="stat-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Monthly Revenue (INR)</p>
                  <IndianRupee size={14} className="text-success" />
                </div>
                <p className="text-2xl font-bold text-success font-mono">₹1,19,00,000</p>
                <p className="text-slate-400 text-xs">+18.5% YoY growth</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="dd-card overflow-hidden bg-white">
              <div className="flex border-b border-slate-100 px-4 bg-slate-50/50 overflow-x-auto">
                {[
                  { id: "overview", label: "Platform Health & Status" },
                  { id: "users", label: `User Management (${usersList.length})` },
                  { id: "verifications", label: `Verification Queues (${mentorVerifications.filter(m => m.status === "Pending").length + companyVerifications.filter(c => c.status === "Pending").length})` },
                  { id: "content", label: "Content & Blog CMS" },
                  { id: "moderation", label: `Moderation Queue (${moderationItems.length})` },
                  { id: "analytics", label: "Platform Analytics" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                      activeTab === tab.id
                        ? "text-indigo-900 border-indigo-900 bg-white"
                        : "text-slate-500 border-transparent hover:text-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* TAB 1: OVERVIEW & PLATFORM HEALTH */}
                {activeTab === "overview" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="dd-surface p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity size={16} className="text-success" />
                        <h3 className="font-bold text-slate-900 text-sm">Cluster & Infrastructure Telemetry</h3>
                        <span className="dd-chip-completed text-[10px] ml-auto">All Nodes Nominal</span>
                      </div>
                      <div className="divide-y divide-slate-100 text-xs">
                        {[
                          { label: "Core API Response P99 Latency", value: "42ms avg", ok: true },
                          { label: "Database Transactions & WAL", value: "0 errors / 24h", ok: true },
                          { label: "Concurrent User Sessions", value: "4,821 active", ok: true },
                          { label: "Failed Login Attempts (Brute Force Guard)", value: "12 blocked", ok: true },
                          { label: "Compiler Sandboxes (Firecracker MicroVMs)", value: "128 warm / ready", ok: true },
                        ].map(item => (
                          <div key={item.label} className="flex items-center justify-between py-2.5">
                            <span className="text-slate-600">{item.label}</span>
                            <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                              <span className={`w-2 h-2 rounded-full ${item.ok ? "bg-emerald-500" : "bg-rose-500"}`} />
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dd-surface p-4 rounded-md">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp size={16} className="text-eblue-600" />
                        <h3 className="font-bold text-slate-900 text-sm">Daily User Registrations (Past 7 Days)</h3>
                      </div>
                      <div className="flex items-end gap-2 h-32 pt-4">
                        {[45, 62, 58, 75, 68, 88, 96].map((pct, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <div
                              className="w-full bg-indigo-900 hover:bg-indigo-700 rounded-sm transition-all"
                              style={{ height: `${pct}%` }}
                            />
                            <span className="text-[10px] text-slate-400 font-mono">
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-3">
                        Weekly Total: <strong className="text-indigo-950 font-mono">842 new verified developers</strong>
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: USER MANAGEMENT (FULL CRUD + PREVIEW MODE) */}
                {activeTab === "users" && (
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search users by name or email..."
                          value={userSearchQuery}
                          onChange={e => setUserSearchQuery(e.target.value)}
                          className="dd-input pl-9 text-xs w-full"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <select
                          value={userRoleFilter}
                          onChange={e => setUserRoleFilter(e.target.value)}
                          className="dd-input text-xs py-1.5"
                        >
                          <option value="all">All Roles</option>
                          <option value="beginner">Beginner</option>
                          <option value="professional">Professional</option>
                          <option value="student">Student</option>
                          <option value="mentor">Mentor</option>
                          <option value="instructor">Instructor</option>
                          <option value="employer">Employer</option>
                          <option value="admin">Admin</option>
                        </select>
                        <select
                          value={userStatusFilter}
                          onChange={e => setUserStatusFilter(e.target.value)}
                          className="dd-input text-xs py-1.5"
                        >
                          <option value="all">All Statuses</option>
                          <option value="Active">Active</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                        <button
                          onClick={() => setIsAddUserModalOpen(true)}
                          className="btn-primary text-xs py-1.5"
                        >
                          <Plus size={12} /> Add User
                        </button>
                      </div>
                    </div>

                    {/* Users Table */}
                    <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="p-3 font-semibold">User</th>
                            <th className="p-3 font-semibold">Role</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold">Joined</th>
                            <th className="p-3 font-semibold">Attestation</th>
                            <th className="p-3 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredUsers.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    {u.name.split(" ").map(w => w[0]).join("")}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900">{u.name}</p>
                                    <p className="text-slate-400 text-[11px] font-mono">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="dd-chip-indigo text-[10px]">
                                  {ROLE_LABELS[u.role] || u.role}
                                </span>
                              </td>
                              <td className="p-3">
                                <span
                                  className={`dd-chip text-[10px] ${
                                    u.status === "Active" ? "dd-chip-completed" : "dd-chip-error"
                                  }`}
                                >
                                  {u.status}
                                </span>
                              </td>
                              <td className="p-3 text-slate-500">{u.joined}</td>
                              <td className="p-3 font-mono font-semibold text-slate-700">{u.score}/100</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* PREVIEW USER DASHBOARD DRILL-IN */}
                                  <button
                                    onClick={() => handlePreviewUserDashboard(u)}
                                    className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                                    title="Preview user role dashboard with banner"
                                  >
                                    <Eye size={11} /> Preview
                                  </button>

                                  <button
                                    onClick={() => {
                                      setCurrentUserForEdit(u);
                                      setIsEditUserModalOpen(true);
                                    }}
                                    className="btn-ghost text-xs py-1 px-2 text-slate-600"
                                    title="Edit User Details"
                                  >
                                    <Edit3 size={11} />
                                  </button>

                                  <button
                                    onClick={() => handleToggleSuspendUser(u.id, u.name, u.status)}
                                    className={`text-xs py-1 px-2 rounded font-semibold border transition-colors ${
                                      u.status === "Active"
                                        ? "text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100"
                                        : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                                    }`}
                                  >
                                    {u.status === "Active" ? "Suspend" : "Reactivate"}
                                  </button>

                                  <button
                                    onClick={() => handleResetPassword(u.name, u.email)}
                                    className="btn-ghost text-xs py-1 px-1.5 text-slate-400 hover:text-slate-700"
                                    title="Reset Password"
                                  >
                                    <Lock size={11} />
                                  </button>

                                  <button
                                    onClick={() => handleDeleteUser(u.id, u.name)}
                                    className="text-slate-400 hover:text-rose-600 p-1"
                                    title="Delete User"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: VERIFICATION QUEUES */}
                {activeTab === "verifications" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <button
                        onClick={() => setVerificationSubTab("mentors")}
                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                          verificationSubTab === "mentors"
                            ? "bg-indigo-900 text-white"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Mentor Verifications ({mentorVerifications.length})
                      </button>
                      <button
                        onClick={() => setVerificationSubTab("companies")}
                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                          verificationSubTab === "companies"
                            ? "bg-indigo-900 text-white"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Company Verifications ({companyVerifications.length})
                      </button>
                    </div>

                    {/* MENTOR QUEUE */}
                    {verificationSubTab === "mentors" && (
                      <div className="space-y-3">
                        {mentorVerifications.map(m => (
                          <div
                            key={m.id}
                            className="p-4 border border-slate-200 rounded-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                                <span
                                  className={`dd-chip text-[10px] ${
                                    m.status === "Approved"
                                      ? "dd-chip-completed"
                                      : m.status === "Rejected"
                                      ? "dd-chip-error"
                                      : "dd-chip-pending"
                                  }`}
                                >
                                  {m.status}
                                </span>
                                <span className="dd-chip-slate text-[10px]">{m.company}</span>
                              </div>
                              <p className="text-slate-600 text-xs font-medium">{m.specialties}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                                <span>Experience: {m.experience}</span>
                                <span>·</span>
                                <span>Submitted {m.submitted}</span>
                                <a
                                  href={m.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-indigo-600 hover:underline flex items-center gap-0.5"
                                >
                                  LinkedIn <ExternalLink size={10} />
                                </a>
                                <a
                                  href={m.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-indigo-600 hover:underline flex items-center gap-0.5"
                                >
                                  GitHub <ExternalLink size={10} />
                                </a>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              {m.status === "Pending" ? (
                                <>
                                  <button
                                    onClick={() => handleOpenDeclineModal(m.id, m.name, "mentor")}
                                    className="btn-ghost text-xs py-1.5 text-rose-600 border-rose-200 hover:bg-rose-50"
                                  >
                                    Decline with Reason
                                  </button>
                                  <button
                                    onClick={() => handleApproveMentor(m.id, m.name)}
                                    className="btn-primary text-xs py-1.5 bg-emerald-700 hover:bg-emerald-800"
                                  >
                                    <CheckCircle2 size={12} /> Approve Mentor
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500 font-medium">Processed</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* COMPANY QUEUE */}
                    {verificationSubTab === "companies" && (
                      <div className="space-y-3">
                        {companyVerifications.map(c => (
                          <div
                            key={c.id}
                            className="p-4 border border-slate-200 rounded-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="font-bold text-slate-900 text-sm">{c.companyName}</h4>
                                <span
                                  className={`dd-chip text-[10px] ${
                                    c.status === "Approved"
                                      ? "dd-chip-completed"
                                      : c.status === "Rejected"
                                      ? "dd-chip-error"
                                      : "dd-chip-pending"
                                  }`}
                                >
                                  {c.status}
                                </span>
                                <span className="dd-chip-indigo text-[10px]">{c.industry}</span>
                              </div>
                              <p className="text-slate-600 text-xs font-mono">
                                CIN / GSTIN: {c.cinOrGstin}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                                <span>Domain: {c.domain}</span>
                                <span>·</span>
                                <span>{c.rolesCount} initial job postings</span>
                                <span>·</span>
                                <span>Submitted {c.submitted}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              {c.status === "Pending" ? (
                                <>
                                  <button
                                    onClick={() => handleOpenDeclineModal(c.id, c.companyName, "company")}
                                    className="btn-ghost text-xs py-1.5 text-rose-600 border-rose-200 hover:bg-rose-50"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => handleApproveCompany(c.id, c.companyName)}
                                    className="btn-primary text-xs py-1.5 bg-emerald-700 hover:bg-emerald-800"
                                  >
                                    <CheckCircle2 size={12} /> Approve Company
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-slate-500 font-medium">Processed</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: CONTENT & BLOG CMS */}
                {activeTab === "content" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setContentSubTab("courses")}
                          className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                            contentSubTab === "courses"
                              ? "bg-indigo-900 text-white"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Course Submissions ({coursesList.length})
                        </button>
                        <button
                          onClick={() => setContentSubTab("blogs")}
                          className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${
                            contentSubTab === "blogs"
                              ? "bg-indigo-900 text-white"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Blog & Editorial ({blogsList.length})
                        </button>
                      </div>

                      {contentSubTab === "blogs" && (
                        <button
                          onClick={() => {
                            setActiveBlogItem(null);
                            setBlogTitle("");
                            setBlogCategory("Distributed Systems");
                            setBlogContent("");
                            setBlogReadTime("8 min read");
                            setBlogPublished(true);
                            setIsBlogModalOpen(true);
                          }}
                          className="btn-primary text-xs"
                        >
                          <Plus size={12} /> Create Article
                        </button>
                      )}
                    </div>

                    {/* COURSES REVIEW */}
                    {contentSubTab === "courses" && (
                      <div className="space-y-3">
                        {coursesList.map(c => (
                          <div
                            key={c.id}
                            className="p-4 border border-slate-200 rounded-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                                <span
                                  className={`dd-chip text-[10px] ${
                                    c.status === "Approved" ? "dd-chip-completed" : "dd-chip-pending"
                                  }`}
                                >
                                  {c.status}
                                </span>
                                {c.featured && (
                                  <span className="dd-chip-ai text-[10px] inline-flex items-center gap-1">
                                    <Star size={10} className="fill-current" /> Featured on Home
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-xs">
                                By {c.author} · Track: {c.track} · Submitted {c.submitted}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              <button
                                onClick={() => handleToggleFeatureCourse(c.id, c.title)}
                                className={`text-xs py-1.5 px-3 rounded font-semibold border transition-colors ${
                                  c.featured
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {c.featured ? (
                                  <span className="inline-flex items-center gap-1">
                                    <Star size={11} className="fill-current" /> Featured
                                  </span>
                                ) : (
                                  "Feature on Home"
                                )}
                              </button>
                              {c.status !== "Approved" && (
                                <button
                                  onClick={() => {
                                    setCoursesList(prev =>
                                      prev.map(item => (item.id === c.id ? { ...item, status: "Approved" } : item))
                                    );
                                    toast.success(`Course "${c.title}" approved and published to catalog!`);
                                  }}
                                  className="btn-primary text-xs py-1.5 bg-emerald-700 hover:bg-emerald-800"
                                >
                                  Publish Course
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* BLOG & EDITORIAL CMS */}
                    {contentSubTab === "blogs" && (
                      <div className="space-y-3">
                        {blogsList.map(b => (
                          <div
                            key={b.id}
                            className="p-4 border border-slate-200 rounded-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h4 className="font-bold text-slate-900 text-sm truncate">{b.title}</h4>
                                <span
                                  className={`dd-chip text-[10px] ${
                                    b.published ? "dd-chip-completed" : "dd-chip-slate"
                                  }`}
                                >
                                  {b.published ? "Published" : "Draft"}
                                </span>
                                <span className="dd-chip-slate text-[10px]">{b.category}</span>
                              </div>
                              <p className="text-slate-500 text-xs">
                                By {b.author} · {b.readTime} · Slug: <code className="font-mono text-[11px]">/{b.slug}</code>
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                              <button
                                onClick={() => {
                                  setActiveBlogItem(b);
                                  setIsBlogReaderOpen(true);
                                }}
                                className="btn-ghost text-xs py-1.5"
                              >
                                <Eye size={12} /> Read
                              </button>
                              <button
                                onClick={() => {
                                  setActiveBlogItem(b);
                                  setBlogTitle(b.title);
                                  setBlogCategory(b.category);
                                  setBlogContent(b.content);
                                  setBlogReadTime(b.readTime);
                                  setBlogPublished(b.published);
                                  setIsBlogModalOpen(true);
                                }}
                                className="btn-ghost text-xs py-1.5 text-indigo-700"
                              >
                                <Edit3 size={12} /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBlog(b.id, b.title)}
                                className="text-slate-400 hover:text-rose-600 p-1.5"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 5: COMMUNITY MODERATION */}
                {activeTab === "moderation" && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500">
                      Automated heuristics and user-reported flags across discussions, code submissions, and accounts.
                    </p>
                    <div className="space-y-3">
                      {moderationItems.map(item => (
                        <div
                          key={item.id}
                          className="p-4 border border-slate-200 rounded-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span
                                className={`dd-chip text-[10px] ${
                                  item.severity === "High" ? "dd-chip-error" : "dd-chip-pending"
                                }`}
                              >
                                {item.severity} Severity
                              </span>
                              <span className="dd-chip-slate text-[10px]">{item.type}</span>
                              <span className="text-xs font-mono font-semibold text-slate-700">
                                Target: @{item.user}
                              </span>
                            </div>
                            <p className="text-slate-800 text-xs mt-1">{item.content}</p>
                            <span className="text-[11px] text-slate-400">{item.time}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                            <button
                              onClick={() => {
                                setModerationItems(prev => prev.filter(m => m.id !== item.id));
                                toast.info("Flag dismissed. Content marked safe.");
                              }}
                              className="btn-ghost text-xs py-1.5"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => {
                                toast.warning(`Formal warning dispatched to @${item.user}`);
                              }}
                              className="btn-ghost text-xs py-1.5 text-amber-700 border-amber-200 hover:bg-amber-50"
                            >
                              Warn User
                            </button>
                            <button
                              onClick={() => {
                                setModerationItems(prev => prev.filter(m => m.id !== item.id));
                                toast.error(`Flagged content removed and @${item.user} suspended.`);
                              }}
                              className="btn-primary text-xs py-1.5 bg-rose-600 hover:bg-rose-700"
                            >
                              Remove & Ban
                            </button>
                          </div>
                        </div>
                      ))}

                      {moderationItems.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-xs">
                          Moderation queue is empty. Platform content is clean.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 6: PLATFORM ANALYTICS */}
                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    {/* User Growth Chart */}
                    <div className="dd-card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Platform Registered vs Active Users</h4>
                          <p className="text-xs text-slate-500">6-month expansion across verified developers & organizations</p>
                        </div>
                        <span className="dd-chip-ai text-[10px]">DYNAMIC RECHARTS</span>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={PLATFORM_GROWTH_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1e1b4b" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#1e1b4b" stopOpacity={0.0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                            <Tooltip
                              formatter={(value: any, name: any) => [
                                Number(value).toLocaleString("en-IN"),
                                name === "users" ? "Total Users" : "Active Learners",
                              ]}
                              labelStyle={{ fontWeight: "bold" }}
                            />
                            <Area type="monotone" dataKey="users" stroke="#1e1b4b" strokeWidth={2} fill="url(#userGrowth)" />
                            <Area type="monotone" dataKey="active" stroke="#0284c7" strokeWidth={2} fillOpacity={0} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Revenue Breakdown Chart */}
                    <div className="dd-card p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">Revenue Inflows Breakdown (₹ INR)</h4>
                          <p className="text-xs text-slate-500">Subscriptions vs Marketplace Course Sales vs Enterprise Sourcing</p>
                        </div>
                        <span className="dd-chip-ai text-[10px]">RECHARTS ENGINE</span>
                      </div>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={REVENUE_BREAKDOWN_DATA} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                            <Tooltip
                              formatter={(value: any, name: any) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                name === "subscriptions" ? "SaaS Subscriptions" : name === "marketplace" ? "Course Marketplace" : "Enterprise Hiring Fees",
                              ]}
                              labelStyle={{ fontWeight: "bold" }}
                            />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar dataKey="subscriptions" fill="#1e1b4b" name="Sub" />
                            <Bar dataKey="marketplace" fill="#0284c7" name="Marketplace" />
                            <Bar dataKey="hiringFees" fill="#059669" name="Hiring Fees" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Add New Platform User</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sumanth Narang"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="dd-input text-xs w-full"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. sumanth@example.com"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="dd-input text-xs w-full font-mono"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Platform Role *</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as UserRole)}
                  className="dd-input text-xs w-full"
                >
                  <option value="beginner">Beginner Developer</option>
                  <option value="professional">Professional Developer</option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="instructor">Instructor</option>
                  <option value="employer">Employer / Company</option>
                  <option value="admin">Superadmin</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Default Password</label>
                <input
                  type="text"
                  value={newUserPassword}
                  onChange={e => setNewUserPassword(e.target.value)}
                  className="dd-input text-xs w-full font-mono"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {isEditUserModalOpen && currentUserForEdit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Edit User — {currentUserForEdit.name}</h3>
              <button onClick={() => setIsEditUserModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={currentUserForEdit.name}
                  onChange={e => setCurrentUserForEdit({ ...currentUserForEdit, name: e.target.value })}
                  className="dd-input text-xs w-full"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={currentUserForEdit.email}
                  onChange={e => setCurrentUserForEdit({ ...currentUserForEdit, email: e.target.value })}
                  className="dd-input text-xs w-full font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={currentUserForEdit.role}
                  onChange={e => setCurrentUserForEdit({ ...currentUserForEdit, role: e.target.value as UserRole })}
                  className="dd-input text-xs w-full"
                >
                  <option value="beginner">Beginner</option>
                  <option value="professional">Professional</option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="instructor">Instructor</option>
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                <select
                  value={currentUserForEdit.status}
                  onChange={e => setCurrentUserForEdit({ ...currentUserForEdit, status: e.target.value as any })}
                  className="dd-input text-xs w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DECLINE WITH REASON MODAL */}
      {isReasonModalOpen && reasonTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Decline Verification — {reasonTarget.name}</h3>
              <button onClick={() => setIsReasonModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitDeclineReason} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Decline / Action Required *</label>
                <textarea
                  value={declineReason}
                  onChange={e => setDeclineReason(e.target.value)}
                  placeholder="e.g. Official domain registration check failed or insufficient public distributed systems GitHub repositories."
                  className="dd-input text-xs w-full h-24 p-2.5"
                  required
                />
              </div>
              <p className="text-slate-500">
                An automated email will be transmitted to the applicant with your exact guidance.
              </p>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReasonModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs bg-rose-600 hover:bg-rose-700">
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG CREATE / EDIT MODAL */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-xl w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                {activeBlogItem ? "Edit Editorial Article" : "Create Editorial Article"}
              </h3>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveBlogPost} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={e => setBlogTitle(e.target.value)}
                  placeholder="e.g. Profiling Memory Allocations in Go 1.23"
                  className="dd-input text-xs w-full"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={blogCategory}
                    onChange={e => setBlogCategory(e.target.value)}
                    className="dd-input text-xs w-full"
                  >
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Concurrency">Concurrency</option>
                    <option value="Databases">Databases & Storage</option>
                    <option value="AI Systems">AI Systems</option>
                    <option value="Career & Staff">Career & Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogReadTime}
                    onChange={e => setBlogReadTime(e.target.value)}
                    className="dd-input text-xs w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Markdown Article Content *</label>
                <textarea
                  value={blogContent}
                  onChange={e => setBlogContent(e.target.value)}
                  placeholder="Write the deep-dive technical guide..."
                  className="dd-input text-xs w-full h-36 p-2.5 font-mono"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={blogPublished}
                  onChange={e => setBlogPublished(e.target.checked)}
                  className="rounded text-indigo-900"
                />
                <label htmlFor="publishedCheck" className="text-slate-700 font-semibold cursor-pointer">
                  Publish to Platform Blog Immediately
                </label>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG PREVIEW READER MODAL */}
      {isBlogReaderOpen && activeBlogItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="dd-chip-indigo text-[10px]">{activeBlogItem.category}</span>
              <button onClick={() => setIsBlogReaderOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                {activeBlogItem.title}
              </h2>
              <p className="text-xs text-slate-400">
                By {activeBlogItem.author} · {activeBlogItem.readTime}
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs leading-relaxed space-y-2">
              <p>{activeBlogItem.content}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsBlogReaderOpen(false)} className="btn-ghost text-xs">
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
