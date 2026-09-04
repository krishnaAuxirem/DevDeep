import { cn } from "@/lib/utils";

interface SkeletonPanelProps {
  className?: string;
  lines?: number;
  type?: "card" | "chart" | "code" | "stats" | "table";
}

export default function SkeletonPanel({
  className,
  lines = 3,
  type = "card",
}: SkeletonPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-xs",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-200/40 before:to-transparent",
        className
      )}
    >
      {type === "stats" && (
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-7 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-2.5 w-36 bg-slate-100 rounded animate-pulse" />
        </div>
      )}

      {type === "chart" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-36 w-full bg-slate-100 rounded-lg animate-pulse flex items-end gap-2 p-3">
            {[40, 65, 30, 85, 55, 90, 70, 45, 80, 60, 95, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-slate-200 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {type === "code" && (
        <div className="space-y-3 bg-slate-900 -m-5 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="h-3 w-24 bg-slate-800 rounded ml-2" />
          </div>
          <div className="h-3 w-3/4 bg-slate-800 rounded" />
          <div className="h-3 w-1/2 bg-slate-800 rounded" />
          <div className="h-3 w-5/6 bg-slate-800 rounded" />
          <div className="h-3 w-2/3 bg-slate-800 rounded" />
        </div>
      )}

      {type === "table" && (
        <div className="space-y-3">
          <div className="h-4 w-40 bg-slate-200 rounded animate-pulse mb-3" />
          {[...Array(lines)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-1/5 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {type === "card" && (
        <div className="space-y-3">
          <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
          {[...Array(lines)].map((_, i) => (
            <div
              key={i}
              className="h-3 bg-slate-100 rounded animate-pulse"
              style={{ width: `${Math.max(40, 100 - i * 18)}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
