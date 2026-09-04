import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ArrowRight, Zap, Sparkles } from "lucide-react";
import CommandSearch from "./CommandSearch";

export default function PublicNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = location.pathname.toLowerCase();

  const NAV_ITEMS = [
    { label: "Learning", path: "/learning", matchPrefix: ["/learning", "/courses"] },
    { label: "Practice", path: "/challenges", matchPrefix: ["/challenges", "/challenge", "/practice"] },
    { label: "Projects", path: "/projects", matchPrefix: ["/projects", "/project"] },
    {
      label: "AI Mentor",
      path: "/mentor",
      matchPrefix: ["/mentor", "/code-review", "/ai-mentor"],
      chip: "v3.8",
      isAI: true,
    },
    { label: "Mentors", path: "/mentors", matchPrefix: ["/mentors", "/mentor-dashboard"] },
    { label: "Community", path: "/community", matchPrefix: ["/community", "/discussions", "/study-groups"] },
    { label: "Career", path: "/jobs", matchPrefix: ["/jobs", "/career", "/careers"] },
    { label: "Pricing", path: "/pricing", matchPrefix: ["/pricing"] },
  ];

  const isActive = (matchPrefix: string[]) => {
    return matchPrefix.some((prefix) => pathname.startsWith(prefix));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Logo + Version Chip */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1XQfxUn56ONqpIjvIQrr1hWXoabnxBi-eW8T1lhgF-Th5Qbl5yxD5GIwvXSv_9PKHGIJmIC4CG7OZqGxCCMaq95UcOJZ8rrBEcGQkhrdUDaXIBHvTGOLlR6uORTQyJQ47iifBSq25W7Gt0paxl4NsukFUVHmewsCN187ywLUmuNDlLLs_iiv_K3Le7z5bXDIzoUrzbDaCEvkKwnE3uDFkCz2PrLDg7Lc87Loc6_V31kP1AU13wlv48fTA"
                alt="DevDeep Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback to geometric icon if remote CDN is slow
                  (e.currentTarget as HTMLElement).style.display = "none";
                  const fallback = document.getElementById("brand-icon-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div id="brand-icon-fallback" className="hidden w-8 h-8 rounded-lg bg-indigo-900 items-center justify-center text-white">
                <Zap size={16} className="text-cyan-400" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">DevDeep</span>
                <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  v2.4
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.matchPrefix);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-md text-sm transition-all duration-150 flex items-center gap-1.5 ${
                      active
                        ? "bg-slate-100 font-bold text-indigo-950 underline decoration-indigo-600 underline-offset-4 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.chip && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-semibold border border-cyan-200">
                        {item.chip}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* ⌘K Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 text-xs transition-colors"
              title="Search (⌘K)"
            >
              <Search size={14} className="text-slate-400" />
              <span className="hidden md:inline text-slate-500">Search...</span>
              <kbd className="font-mono text-[10px] bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Log In */}
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Log In
            </Link>

            {/* Start Learning Free (Primary CTA) */}
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-indigo-900 text-white hover:bg-indigo-950 text-sm font-semibold shadow-xs hover:shadow-sm transition-all active:scale-[0.99]"
            >
              <span>Start Learning Free</span>
              <ArrowRight size={14} className="hidden sm:inline" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            {/* Mobile Search */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-sm"
            >
              <span className="flex items-center gap-2">
                <Search size={15} /> Search resources, code, problems...
              </span>
              <kbd className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>

            {/* Mobile Nav Links */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.matchPrefix);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-indigo-50 font-bold text-indigo-950 border border-indigo-200"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.chip && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-semibold">
                        {item.chip}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Log In to Existing Account
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-900 hover:bg-indigo-950 rounded-lg shadow-sm transition-colors"
              >
                Start Learning Free →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
