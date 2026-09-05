import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2, Search, MapPin, Users, ArrowRight, ShieldCheck,
  CheckCircle2, Briefcase, ExternalLink, Sparkles
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

interface CompanyData {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  openRoles: number;
  techStack: string[];
  description: string;
  verifiedPartner: boolean;
}

const COMPANIES_DIRECTORY: CompanyData[] = [
  {
    id: "comp-razorpay",
    name: "Razorpay",
    logo: "RZ",
    industry: "Fintech & Payments Infrastructure",
    location: "Bengaluru, India",
    size: "2,500+ employees",
    openRoles: 18,
    techStack: ["Go", "Kafka", "PostgreSQL", "Kubernetes", "AWS"],
    description: "Building the financial operating system for modern business across India and Southeast Asia.",
    verifiedPartner: true,
  },
  {
    id: "comp-swiggy",
    name: "Swiggy",
    logo: "SW",
    industry: "Consumer Tech & Quick Commerce",
    location: "Bengaluru, India",
    size: "5,000+ employees",
    openRoles: 24,
    techStack: ["Java", "Go", "Redis", "Kafka", "Flink"],
    description: "Powering real-time routing, distributed spatial matching, and automated logistics across 500+ cities.",
    verifiedPartner: true,
  },
  {
    id: "comp-zerodha",
    name: "Zerodha",
    logo: "ZD",
    industry: "Capital Markets & Stockbroking",
    location: "Bengaluru, India",
    size: "1,200+ employees",
    openRoles: 8,
    techStack: ["Go", "Python", "PostgreSQL", "C++", "Vue"],
    description: "India's largest retail stockbroker running on lean, highly optimized in-house engineering architectures.",
    verifiedPartner: true,
  },
  {
    id: "comp-stripe",
    name: "Stripe",
    logo: "ST",
    industry: "Global Financial Infrastructure",
    location: "Bengaluru / Global Remote",
    size: "7,000+ employees",
    openRoles: 32,
    techStack: ["Ruby", "Go", "Java", "Sorbet", "MongoDB"],
    description: "Financial infrastructure for the internet. Billions of dollars processed annually with 99.999% uptime.",
    verifiedPartner: true,
  },
  {
    id: "comp-postman",
    name: "Postman",
    logo: "PM",
    industry: "Developer Tools & API Infrastructure",
    location: "Hyderabad / Remote",
    size: "1,000+ employees",
    openRoles: 14,
    techStack: ["Node.js", "TypeScript", "React", "Docker", "AWS"],
    description: "Leading API development platform used by over 30 million developers worldwide.",
    verifiedPartner: true,
  },
  {
    id: "comp-atlassian",
    name: "Atlassian",
    logo: "AT",
    industry: "Enterprise Collaboration & DevOps",
    location: "Bengaluru, India",
    size: "10,000+ employees",
    openRoles: 19,
    techStack: ["Java", "Kotlin", "React", "Kafka", "AWS"],
    description: "Software that empowers team collaboration across Jira, Confluence, and Bitbucket globally.",
    verifiedPartner: true,
  },
];

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = COMPANIES_DIRECTORY.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 animate-fade-in">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Building2 size={13} className="text-indigo-600" />
            <span>VERIFIED HIRING PARTNERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Company Directory
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover verified companies actively scouting DevDeep developers. Explore engineering culture, tech stacks, and open roles.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-xl mx-auto w-full">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search companies by name, industry, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-900 text-white font-bold text-base flex items-center justify-center shrink-0">
                      {company.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900 transition-colors">
                          {company.name}
                        </h3>
                        {company.verifiedPartner && (
                          <ShieldCheck size={14} className="text-indigo-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{company.industry}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {company.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {company.size}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {company.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-indigo-700">
                  {company.openRoles} Open Engineering Roles
                </span>
                <button
                  onClick={() => navigate(`/jobs?company=${encodeURIComponent(company.name)}`)}
                  className="px-4 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>Explore Roles</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Employer Onboarding Callout */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl text-center md:text-left">
            <h2 className="text-xl font-bold">Hiring for your engineering team?</h2>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Post verified roles, scout pre-screened developers by p99 latency benchmarks, and eliminate resume spam with cryptographic dossiers.
            </p>
          </div>
          <button
            onClick={() => navigate("/select-role?role=employer")}
            className="px-6 py-2.5 rounded-lg bg-white text-indigo-950 hover:bg-slate-100 font-bold text-xs shadow-md transition-all shrink-0"
          >
            Create Employer Profile →
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
