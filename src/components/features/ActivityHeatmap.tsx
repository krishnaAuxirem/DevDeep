import { useMemo } from "react";
import { generateHeatmap } from "@/constants/data";

const LEVEL_CLASSES = [
  "bg-slate-200",
  "bg-emerald-200",
  "bg-emerald-400",
  "bg-emerald-600",
  "bg-emerald-800",
];

interface ActivityHeatmapProps {
  compact?: boolean;
}

export default function ActivityHeatmap({ compact = false }: ActivityHeatmapProps) {
  const days = useMemo(() => generateHeatmap(), []);

  const weeks: typeof days[] = [];
  let week: typeof days = [];
  const firstDay = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDay; i++) week.push({ date: "", count: 0, level: 0 });
  for (const day of days) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) weeks.push(week);

  const totalContributions = days.reduce((s, d) => s + d.count, 0);
  const currentStreak = (() => {
    let streak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) streak++; else break;
    }
    return streak;
  })();
  const longestStreak = (() => {
    let max = 0, cur = 0;
    for (const d of days) {
      if (d.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0;
    }
    return max;
  })();

  if (compact) {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-px min-w-max">
          {weeks.slice(-26).map((w, wi) => (
            <div key={wi} className="flex flex-col gap-px">
              {w.map((d, di) => (
                <div
                  key={di}
                  title={d.date ? `${d.date}: ${d.count} activities` : ""}
                  className={`heatmap-cell ${d.date ? LEVEL_CLASSES[d.level] : "bg-transparent"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-6 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-slate-900 font-bold text-xl tracking-tight">{totalContributions.toLocaleString()}</span>
          <span className="text-slate-500 text-xs">Total Submissions</span>
        </div>
        <span className="text-slate-200">·</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-900 font-bold text-xl tracking-tight">{currentStreak} Days</span>
          <span className="text-slate-500 text-xs">Current Streak</span>
        </div>
        <span className="text-slate-200">·</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-900 font-bold text-xl tracking-tight">{longestStreak} Days</span>
          <span className="text-slate-500 text-xs">Longest</span>
        </div>
      </div>

      <div className="flex gap-1.5">
        <div className="flex flex-col gap-px mr-1 text-[9px] text-slate-400 font-mono justify-around" style={{ height: 68 }}>
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-px min-w-max">
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-px">
                {w.map((d, di) => (
                  <div
                    key={di}
                    title={d.date ? `${d.date}: ${d.count} activities` : ""}
                    className={`heatmap-cell transition-opacity hover:opacity-70 ${d.date ? LEVEL_CLASSES[d.level] : "bg-transparent"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[10px] text-slate-400">Less</span>
        {LEVEL_CLASSES.map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c} border border-slate-200`} />
        ))}
        <span className="text-[10px] text-slate-400">More</span>
      </div>
    </div>
  );
}
