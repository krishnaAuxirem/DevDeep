import { useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, Code2 } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-xl bg-indigo-900 flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-white" />
        </div>
        <h1 className="text-7xl font-bold text-slate-900 tracking-tighter mb-2">404</h1>
        <p className="text-slate-500 text-lg mb-2">Page not found</p>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">The route you're looking for doesn't exist or has been moved. Head back to the dashboard.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(-1)} className="btn-ghost">
            <ArrowLeft size={14} /> Go back
          </button>
          <button onClick={() => navigate("/dashboard")} className="btn-primary">
            <Code2 size={14} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
