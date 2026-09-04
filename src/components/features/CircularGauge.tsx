interface CircularGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  valueColor?: string;
}

export default function CircularGauge({
  value,
  max = 100,
  size = 100,
  strokeWidth = 8,
  color = "#312E81",
  trackColor = "#E2E8F0",
  label,
  sublabel,
  valueColor = "#0F172A",
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const offset = circumference - progress;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontSize: size * 0.2, fontWeight: 700, color: valueColor, fontFamily: "Inter, sans-serif" }}>{value}</span>
        </div>
      </div>
      {label && <p className="text-slate-900 text-sm font-semibold">{label}</p>}
      {sublabel && <p className="text-slate-500 text-xs">{sublabel}</p>}
    </div>
  );
}
