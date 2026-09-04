import { useNavigate } from "react-router-dom";
import { Search, Bell, Flame, Zap, SlidersHorizontal } from "lucide-react";
import { CURRENT_USER } from "@/constants/data";

interface TopNavProps {
  showSearch?: boolean;
  showTelemetry?: boolean;
}

export default function TopNav({ showSearch = true, showTelemetry = false }: TopNavProps) {
  const navigate = useNavigate();

  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center px-5 gap-3 shrink-0">
      {/* Search */}
      {showSearch && (
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources, code, problems..."
              className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-10 h-8 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 focus:border-indigo-900/40 transition-colors"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 border border-slate-200 rounded px-1 py-0.5 font-mono bg-white">⌘K</kbd>
          </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Streak pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 border border-orange-200 rounded-full">
          <Flame size={12} className="text-orange-500" />
          <span className="text-xs font-semibold text-orange-700">{CURRENT_USER.streak}d</span>
        </div>

        {showTelemetry && (
          <button className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors">
            <SlidersHorizontal size={11} />
            <span>Telemetry Filters</span>
          </button>
        )}

        {/* AI Mentor button */}
        <button
          onClick={() => navigate("/mentor")}
          className="btn-ai text-xs py-1.5 px-3"
        >
          <Zap size={12} className="text-ai" />
          <span>AI Mentor</span>
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-sm hover:bg-slate-50 hover:border-slate-300 transition-colors">
          <Bell size={14} className="text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-eblue-600 rounded-full"></span>
        </button>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-white hover:bg-indigo-950 transition-colors border-2 border-transparent hover:border-indigo-300">
          {CURRENT_USER.avatar}
        </button>
      </div>
    </header>
  );
}
