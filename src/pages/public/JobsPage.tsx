import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  Search, MapPin, Briefcase, IndianRupee, Clock, Building2,
  Bookmark, ArrowRight, Filter, X, SlidersHorizontal, ChevronRight,
  TrendingUp, Sparkles, CheckCircle2, ShieldCheck, Laptop, Compass,
  Layers, Code2, Users, LayoutGrid, List, Check, ArrowUpRight,
  Terminal, Award, BookOpen, Send
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import {
  JOBS_DATA,
  QUICK_CATEGORIES,
  SKILLS_IN_DEMAND,
  FEATURED_OPPORTUNITIES,
  REMOTE_OPPORTUNITIES,
  INTERNSHIP_OPPORTUNITIES,
  JobListing
} from "@/data/jobsData";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

interface JobsPageProps {
  initialFilter?: {
    jobType?: string;
    workMode?: string;
  };
}

export default function JobsPage({ initialFilter }: JobsPageProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const marketplaceRef = useRef<HTMLDivElement>(null);

  // Search fields
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Roles");

  // Filters
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(
    initialFilter?.jobType ? [initialFilter.jobType] : []
  );
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>(
    initialFilter?.workMode ? [initialFilter.workMode] : []
  );
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [maxSalaryFilter, setMaxSalaryFilter] = useState<number>(35); // ₹3 - ₹35+ LPA
  const [sortBy, setSortBy] = useState<"recommended" | "recent" | "salary-desc" | "salary-asc">("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Bookmarked IDs
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Sync category if query param exists
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && QUICK_CATEGORIES.includes(cat as any)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle bookmark toggle (Requires Login)
  const toggleSaveJob = (e: React.MouseEvent, jobId: string, jobTitle: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Login required to save jobs", {
        description: "Please sign in with your DevDeep account to save opportunities to your profile.",
      });
      navigate("/login", { state: { from: "/jobs" } });
      return;
    }
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        toast.info(`Removed "${jobTitle}" from bookmarks`);
      } else {
        next.add(jobId);
        toast.success(`Saved "${jobTitle}"`, {
          description: "Access your saved jobs anytime in your career workspace.",
        });
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSearchLocation("");
    setSelectedCategory("All Roles");
    setSelectedJobTypes([]);
    setSelectedWorkModes([]);
    setSelectedExperience([]);
    setSelectedSkills([]);
    setSelectedLocations([]);
    setMaxSalaryFilter(35);
    setCurrentPage(1);
    toast.info("All filters cleared.");
  };

  const scrollToMarketplace = () => {
    marketplaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered & Sorted jobs calculation
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkill = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = job.aboutRole.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkill && !matchesDesc) {
          return false;
        }
      }

      // Location search
      if (searchLocation.trim()) {
        const lq = searchLocation.toLowerCase();
        const matchesLoc = job.location.toLowerCase().includes(lq) || job.city.toLowerCase().includes(lq);
        const matchesRemote = lq.includes("remote") && (job.workMode === "Remote" || job.isRemote);
        if (!matchesLoc && !matchesRemote) return false;
      }

      // Quick Category
      if (selectedCategory !== "All Roles") {
        if (!job.category.toLowerCase().includes(selectedCategory.toLowerCase()) &&
            !job.title.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Job Type
      if (selectedJobTypes.length > 0) {
        if (!selectedJobTypes.includes(job.jobType)) return false;
      }

      // Work Mode
      if (selectedWorkModes.length > 0) {
        if (!selectedWorkModes.includes(job.workMode)) return false;
      }

      // Experience
      if (selectedExperience.length > 0) {
        if (!selectedExperience.includes(job.experience)) return false;
      }

      // Salary filter
      if (job.minSalaryLpa > maxSalaryFilter) return false;

      // Skills
      if (selectedSkills.length > 0) {
        const hasSkill = selectedSkills.some((s) => job.skills.includes(s));
        if (!hasSkill) return false;
      }

      // Location checkboxes
      if (selectedLocations.length > 0) {
        const hasLocation = selectedLocations.some((loc) =>
          loc === "Remote" ? job.workMode === "Remote" : job.city === loc
        );
        if (!hasLocation) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "salary-desc") return b.maxSalaryLpa - a.maxSalaryLpa;
      if (sortBy === "salary-asc") return a.minSalaryLpa - b.minSalaryLpa;
      if (sortBy === "recent") return a.id.localeCompare(b.id);
      // recommended
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    searchQuery, searchLocation, selectedCategory,
    selectedJobTypes, selectedWorkModes, selectedExperience,
    selectedSkills, selectedLocations, maxSalaryFilter, sortBy
  ]);

  // Paginated items
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(start, start + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (searchLocation ? 1 : 0) +
    (selectedCategory !== "All Roles" ? 1 : 0) +
    selectedJobTypes.length +
    selectedWorkModes.length +
    selectedExperience.length +
    selectedSkills.length +
    selectedLocations.length +
    (maxSalaryFilter < 35 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-900 selection:text-white">
      <PublicNavbar />

      {/* =========================================================================
          1. PAGE HERO (With integrated search & subtle developer backdrop)
         ========================================================================= */}
      <section className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white pt-16 pb-20 px-4 sm:px-6 overflow-hidden border-b border-indigo-900/50">
        {/* Subtle grid background mesh */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px), radial-gradient(#06b6d4 1px, transparent 1px)`,
            backgroundSize: `32px 32px`,
            backgroundPosition: `0 0, 16px 16px`
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/80 border border-indigo-700/60 text-cyan-300 text-xs font-semibold backdrop-blur-xs animate-fade-in">
            <Sparkles size={13} className="text-cyan-400" />
            <span className="tracking-wide">DEVDEEP CAREER ECOSYSTEM</span>
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="text-indigo-200 font-mono text-[11px]">1,240+ Verified Positions</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Find your next opportunity
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed font-normal">
            Discover jobs, internships and freelance opportunities matched to your developer skills and career goals.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToMarketplace}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2"
            >
              Explore Jobs <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all backdrop-blur-xs flex items-center gap-2"
            >
              <Code2 size={16} className="text-cyan-300" /> Build Your Developer Profile
            </button>
          </div>

          {/* Compact Search Interface */}
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col sm:flex-row items-stretch gap-2 text-slate-800">
              {/* Search jobs input */}
              <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 bg-slate-50/80 rounded-xl border border-slate-200/80 focus-within:border-indigo-600 focus-within:bg-white transition-colors">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by role, skill or keyword"
                  className="w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none font-medium text-slate-900"
                />
              </div>

              {/* Location input */}
              <div className="sm:w-60 flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 bg-slate-50/80 rounded-xl border border-slate-200/80 focus-within:border-indigo-600 focus-within:bg-white transition-colors">
                <MapPin size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Location or Remote"
                  className="w-full bg-transparent text-sm placeholder:text-slate-400 focus:outline-none font-medium text-slate-900"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={scrollToMarketplace}
                className="px-6 py-3 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                <Search size={15} /> Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. QUICK CATEGORY FILTERS (Horizontal chips)
         ========================================================================= */}
      <section className="bg-white border-b border-slate-200 py-4 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {QUICK_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    active
                      ? "bg-indigo-900 text-white shadow-xs"
                      : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div ref={marketplaceRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full space-y-16">
        {/* =========================================================================
            3. FEATURED OPPORTUNITIES (3–4 large cards)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Featured opportunities
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              High-growth teams hiring directly via DevDeep
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_OPPORTUNITIES.slice(0, 3).map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-xl pointer-events-none -mr-6 -mt-6" />

                <div className="space-y-3 relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${job.companyColor}`}>
                        {job.companyInitials}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500">{job.company}</p>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                          {job.title}
                        </h3>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold font-mono shrink-0">
                      FEATURED
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.aboutRole}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between relative">
                  <div>
                    <span className="text-xs font-bold text-indigo-900 font-mono">{job.salary}</span>
                    <p className="text-[11px] text-slate-400">{job.location}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs/${job.id}`);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-900 text-indigo-900 group-hover:text-white text-xs font-bold transition-all inline-flex items-center gap-1"
                  >
                    View Job <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. TWO-COLUMN DISCOVERY LAYOUT (Filter Sidebar + Listings)
           ========================================================================= */}
        <section className="space-y-6">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Developer Jobs
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold font-mono">
                  {filteredJobs.length} opportunities
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Showing roles matching verified engineering standards and INR salary bands
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <SlidersHorizontal size={14} />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              {/* Sorting dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600 cursor-pointer shadow-xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary-desc">Salary: High to Low</option>
                  <option value="salary-asc">Salary: Low to High</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-slate-200/80 p-0.5 rounded-xl">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}
                  title="List view"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}
                  title="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* ── LEFT COLUMN: Filter Sidebar (Desktop) ── */}
            <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-36">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Filter size={15} className="text-indigo-900" />
                  Filter Jobs
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* 1. Job Type */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Job Type
                </label>
                {["Full-time", "Part-time", "Internship", "Freelance", "Contract"].map((type) => (
                  <label key={type} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedJobTypes.includes(type)}
                      onChange={(e) => {
                        setSelectedJobTypes((prev) =>
                          e.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
                        );
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 rounded text-indigo-900 border-slate-300 focus:ring-indigo-600 cursor-pointer"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              {/* 2. Work Mode */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Work Mode
                </label>
                {["Remote", "Hybrid", "On-site"].map((mode) => (
                  <label key={mode} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedWorkModes.includes(mode)}
                      onChange={(e) => {
                        setSelectedWorkModes((prev) =>
                          e.target.checked ? [...prev, mode] : prev.filter((m) => m !== mode)
                        );
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 rounded text-indigo-900 border-slate-300 focus:ring-indigo-600 cursor-pointer"
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>

              {/* 3. Experience */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Experience
                </label>
                {["Fresher", "0–2 Years", "2–5 Years", "5+ Years"].map((exp) => (
                  <label key={exp} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedExperience.includes(exp)}
                      onChange={(e) => {
                        setSelectedExperience((prev) =>
                          e.target.checked ? [...prev, exp] : prev.filter((x) => x !== exp)
                        );
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 rounded text-indigo-900 border-slate-300 focus:ring-indigo-600 cursor-pointer"
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>

              {/* 4. Salary Range Slider */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                    Min Base Salary
                  </label>
                  <span className="text-xs font-bold text-indigo-900 font-mono">
                    ₹{maxSalaryFilter} LPA
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="35"
                  step="1"
                  value={maxSalaryFilter}
                  onChange={(e) => {
                    setMaxSalaryFilter(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-indigo-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹3 LPA</span>
                  <span>₹15 LPA</span>
                  <span>₹35+ LPA</span>
                </div>
              </div>

              {/* 5. Skills */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Skills
                </label>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {["React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "SQL", "AWS", "Docker", "Machine Learning"].map((skill) => (
                    <label key={skill} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={(e) => {
                          setSelectedSkills((prev) =>
                            e.target.checked ? [...prev, skill] : prev.filter((s) => s !== skill)
                          );
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded text-indigo-900 border-slate-300 focus:ring-indigo-600 cursor-pointer"
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 6. Location */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                  Location
                </label>
                <div className="space-y-2">
                  {["Mumbai", "Pune", "Bengaluru", "Hyderabad", "Delhi NCR", "Chennai", "Remote"].map((loc) => (
                    <label key={loc} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={(e) => {
                          setSelectedLocations((prev) =>
                            e.target.checked ? [...prev, loc] : prev.filter((l) => l !== loc)
                          );
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4 rounded text-indigo-900 border-slate-300 focus:ring-indigo-600 cursor-pointer"
                      />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear All CTA button */}
              <button
                onClick={handleClearFilters}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Clear All Filters
              </button>
            </aside>

            {/* ── RIGHT COLUMN: Job Listings + Pagination ── */}
            <div className="lg:col-span-3 space-y-4">
              {/* Empty State */}
              {filteredJobs.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center mx-auto">
                    <Briefcase size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    We couldn't find any opportunities matching your current filters. Try relaxing your location, skill, or salary requirements.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* Job Cards */}
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-3.5"}>
                {paginatedJobs.map((job) => {
                  const isSaved = savedJobs.has(job.id);
                  return (
                    <div
                      key={job.id}
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Top info */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ${job.companyColor}`}>
                              {job.companyInitials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                                  {job.title}
                                </h3>
                                {job.featured && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold font-mono">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">
                                {job.company} • <span className="text-slate-600">{job.location}</span>
                              </p>
                            </div>
                          </div>

                          {/* Bookmark Button */}
                          <button
                            onClick={(e) => toggleSaveJob(e, job.id, job.title)}
                            className={`p-2 rounded-xl border transition-all ${
                              isSaved
                                ? "bg-indigo-50 border-indigo-300 text-indigo-600 shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            }`}
                            title={isSaved ? "Saved" : "Save Job"}
                            aria-label="Save Job"
                          >
                            <Bookmark size={16} className={isSaved ? "fill-current text-indigo-600" : ""} />
                          </button>
                        </div>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-900 font-bold font-mono">
                            {job.salary}
                          </span>
                          <span className={`px-2.5 py-1 rounded-md font-semibold text-[11px] ${
                            job.workMode === "Remote"
                              ? "bg-cyan-50 text-cyan-800 border border-cyan-200"
                              : job.workMode === "Hybrid"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : "bg-slate-100 text-slate-800"
                          }`}>
                            {job.workMode}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {job.experienceText}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {job.jobType}
                          </span>
                        </div>

                        {/* Skills Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {job.posted}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/jobs/${job.id}`);
                            }}
                            className="px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1"
                          >
                            View Job <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Pagination (1 2 3 4 5 ... Next) ── */}
              {totalPages > 1 && (
                <div className="pt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      scrollToMarketplace();
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        scrollToMarketplace();
                      }}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? "bg-indigo-900 text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      scrollToMarketplace();
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. REMOTE JOBS SECTION (With Electric Blue / Cyan accents)
           ========================================================================= */}
        <section className="bg-gradient-to-br from-cyan-950/20 via-indigo-950/10 to-transparent p-6 sm:p-8 rounded-3xl border border-cyan-800/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold font-mono mb-2">
                <Laptop size={13} className="text-cyan-600" />
                <span>WORK FROM ANYWHERE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Remote opportunities
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Engineering roles offering 100% location flexibility across India & international teams.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedWorkModes(["Remote"]);
                scrollToMarketplace();
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-colors shadow-xs self-start sm:self-center shrink-0"
            >
              View All Remote Jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REMOTE_OPPORTUNITIES.slice(0, 3).map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white rounded-2xl border border-cyan-100 p-5 shadow-sm hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-bold font-mono">
                    REMOTE
                  </span>
                  <span className="text-xs font-bold text-indigo-900 font-mono">{job.salary}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-900 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500">{job.company} • {job.experienceText}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. INTERNSHIP SECTION ("Start your career with an internship")
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono mb-2">
                <Compass size={13} className="text-emerald-600" />
                <span>EARLY CAREER & STUDENT PATHWAYS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Start your career with an internship
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Gain hands-on engineering experience with high stipends and direct Pre-Placement Offer (PPO) opportunities.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedJobTypes(["Internship"]);
                scrollToMarketplace();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs transition-colors shadow-xs self-start sm:self-center shrink-0"
            >
              Explore Internships →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INTERNSHIP_OPPORTUNITIES.map((intern) => (
              <div
                key={intern.id}
                onClick={() => navigate(`/jobs/${intern.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${intern.companyColor}`}>
                      {intern.companyInitials}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {intern.title}
                      </h3>
                      <p className="text-xs text-slate-500">{intern.company} • {intern.location}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono shrink-0">
                    {intern.stipend || intern.salary}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">DURATION</span>
                    <span className="font-semibold text-slate-700">{intern.duration || "6 Months"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">WORK MODE</span>
                    <span className="font-semibold text-slate-700">{intern.workMode}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {intern.skills.map((s) => (
                    <span key={s} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. SKILLS IN DEMAND (Analytics-Style Section)
           ========================================================================= */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
              INDUSTRY TELEMETRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Skills companies are hiring for
            </h2>
            <p className="text-slate-500 text-sm">
              Real-time hiring index based on active hiring manager requirements across DevDeep hiring partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SKILLS_IN_DEMAND.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  setSelectedSkills([item.name]);
                  scrollToMarketplace();
                }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {item.name}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {item.demandLevel}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{item.growth}</span>
                  <span className="font-semibold text-slate-700 font-mono">{item.jobsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. CAREER READINESS FLOW ("Not job-ready yet? DevDeep can help.")
           ========================================================================= */}
        <section className="bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 relative overflow-hidden">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              END-TO-END PREPARATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Not job-ready yet? DevDeep can help.
            </h2>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Our verified progression matrix takes you from baseline code logic to production systems, code reviews, and guaranteed interviews.
            </p>
          </div>

          {/* 5 Progression Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Learn", desc: "Follow a personalized learning path with deep systems theory.", icon: <BookOpen size={18} /> },
              { step: "02", title: "Practice", desc: "Solve real-world coding challenges in sandboxed kernels.", icon: <Terminal size={18} /> },
              { step: "03", title: "Build", desc: "Create production-ready projects with verifiable Git commits.", icon: <Layers size={18} /> },
              { step: "04", title: "Certify", desc: "Validate skills with cryptographic benchmark seals.", icon: <Award size={18} /> },
              { step: "05", title: "Get Hired", desc: "Apply directly with verified telemetry and recruiter introductions.", icon: <Send size={18} /> },
            ].map((card, i) => (
              <div key={card.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3 relative group hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between text-cyan-400">
                  <span className="font-mono text-xs font-bold">{card.step}</span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    {card.icon}
                  </div>
                </div>
                <h3 className="font-bold text-base text-white">{card.title}</h3>
                <p className="text-xs text-indigo-200 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center sm:text-left">
            <button
              onClick={() => navigate("/learning")}
              className="px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 transition-colors shadow-md inline-flex items-center gap-2"
            >
              Start Your Developer Journey <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* =========================================================================
            9. DEVELOPER PROFILE CTA & COMPANY SECTION
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Developer Profile CTA */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center">
                <Users size={22} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Let companies discover your skills
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Build your DevDeep developer profile with skills, projects, certifications, coding statistics and achievements. Top engineering recruiters search our verified talent database daily.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold transition-all shadow-xs"
              >
                Build Your Profile
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Explore Portfolio
              </button>
            </div>
          </div>

          {/* Card 2: Company Section (Are you hiring developers?) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-900 flex items-center justify-center">
                <Building2 size={22} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                Are you hiring developers?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Find skilled developers based on verified skills, projects, assessments and career readiness. Eliminate resume screening friction with deterministic coding telemetry.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                Hire Developers
              </button>
              <button
                onClick={() => navigate("/employer-dashboard")}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Explore Talent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 shadow-2xl animate-fade-in flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Filter size={16} /> Filter Jobs
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile filter controls */}
              <div className="space-y-3">
                <label className="block text-xs font-bold font-mono text-slate-400">JOB TYPE</label>
                {["Full-time", "Part-time", "Internship", "Freelance", "Contract"].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedJobTypes.includes(t)}
                      onChange={(e) => {
                        setSelectedJobTypes((prev) =>
                          e.target.checked ? [...prev, t] : prev.filter((item) => item !== t)
                        );
                      }}
                      className="rounded text-indigo-900"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold font-mono text-slate-400">WORK MODE</label>
                {["Remote", "Hybrid", "On-site"].map((m) => (
                  <label key={m} className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedWorkModes.includes(m)}
                      onChange={(e) => {
                        setSelectedWorkModes((prev) =>
                          e.target.checked ? [...prev, m] : prev.filter((item) => item !== m)
                        );
                      }}
                      className="rounded text-indigo-900"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileFilterOpen(false);
                  scrollToMarketplace();
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-900 text-white font-bold text-xs shadow-xs"
              >
                Apply Filters ({filteredJobs.length} results)
              </button>
              <button
                onClick={() => {
                  handleClearFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
