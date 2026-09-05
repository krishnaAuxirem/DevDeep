import { Link } from "react-router-dom";
import {
  Compass, ArrowRight, BookOpen, Users, Briefcase,
  Layers, ShieldCheck, Terminal, Award
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function SitemapPage() {
  const sections = [
    {
      title: "Product & Engineering",
      icon: <Terminal size={18} className="text-indigo-600" />,
      links: [
        { label: "Home Page", path: "/" },
        { label: "Learning Paths", path: "/learning-paths" },
        { label: "Courses Catalog", path: "/courses" },
        { label: "Interactive Coding Academy", path: "/coding-academy" },
        { label: "Coding Challenges", path: "/challenges" },
        { label: "Production Projects", path: "/projects" },
        { label: "AI Mentor Engine", path: "/ai-mentor" },
        { label: "Verifiable Portfolios", path: "/portfolio" },
        { label: "Pricing Plans", path: "/pricing" },
      ],
    },
    {
      title: "Community Hub",
      icon: <Users size={18} className="text-cyan-600" />,
      links: [
        { label: "Community Overview", path: "/community" },
        { label: "Discussions & RFCs", path: "/community/discussions" },
        { label: "Engineering Study Groups", path: "/community/groups" },
        { label: "Developer Project Showcase", path: "/community/showcase" },
        { label: "Global Hackathons", path: "/community/hackathons" },
        { label: "Live Events & AMAs", path: "/community/events" },
      ],
    },
    {
      title: "Career & Opportunities",
      icon: <Briefcase size={18} className="text-emerald-600" />,
      links: [
        { label: "Jobs Marketplace", path: "/jobs" },
        { label: "Engineering Internships", path: "/internships" },
        { label: "Developer Freelance Contracts", path: "/freelance" },
        { label: "Mentorship Directory", path: "/mentors" },
        { label: "Partner Company Directory", path: "/companies" },
      ],
    },
    {
      title: "Technical Resources",
      icon: <Layers size={18} className="text-amber-600" />,
      links: [
        { label: "Platform Documentation", path: "/documentation" },
        { label: "System Architecture Guides", path: "/resources/system-architecture" },
        { label: "Engineering Blog", path: "/blog" },
        { label: "Open Source Projects", path: "/open-source" },
        { label: "REST API Reference", path: "/api-reference" },
      ],
    },
    {
      title: "Company & Legal",
      icon: <ShieldCheck size={18} className="text-purple-600" />,
      links: [
        { label: "About DevDeep", path: "/about" },
        { label: "Careers at DevDeep", path: "/careers" },
        { label: "Security & Trust", path: "/security" },
        { label: "Contact Us", path: "/contact" },
        { label: "Frequently Asked Questions", path: "/faq" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
      ],
    },
    {
      title: "Platform Authentication & Dashboards",
      icon: <Award size={18} className="text-rose-600" />,
      links: [
        { label: "Account Login", path: "/login" },
        { label: "Account Registration", path: "/register" },
        { label: "Select Role", path: "/select-role" },
        { label: "Onboarding Setup", path: "/onboarding" },
        { label: "Developer Dashboard", path: "/dashboard/developer" },
        { label: "Mentor Dashboard", path: "/dashboard/mentor" },
        { label: "Instructor Dashboard", path: "/dashboard/instructor" },
        { label: "Employer Dashboard", path: "/dashboard/employer" },
        { label: "Admin Console", path: "/dashboard/admin" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Compass size={13} className="text-indigo-600" />
            <span>PLATFORM NAVIGATION DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            DevDeep Sitemap
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Direct navigation links to every public, community, resource, and authenticated route on the platform.
          </p>
        </div>

        {/* Sitemap Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  {sec.icon}
                </div>
                <h2 className="font-bold text-base text-slate-900">{sec.title}</h2>
              </div>

              <ul className="space-y-2 text-xs">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-slate-600 hover:text-indigo-900 hover:underline flex items-center justify-between py-1 transition-colors"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-[10px] text-slate-400">{link.path}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
