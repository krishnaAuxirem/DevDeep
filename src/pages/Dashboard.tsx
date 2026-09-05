import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play, Code2, ChevronRight, Filter, Plus, CheckSquare, Square,
  Brain, Calendar, Target, Zap, Clock, AlertTriangle,
  Activity, Trophy, GitCommit, BarChart3, ArrowUpRight, Sparkles,
  Flame, TrendingUp, Rocket, CheckCircle2, Timer
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import ActivityHeatmap from "@/components/features/ActivityHeatmap";
import CircularGauge from "@/components/features/CircularGauge";
import LiveActivityStream from "@/components/features/LiveActivityStream";
import { CURRENT_USER, GOALS, ACTIVITY_FEED, SKILL_MATRIX, MENTORS } from "@/constants/data";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(GOALS);

  const toggleGoal = (id: string) => {
    setGoals(g => g.map(goal => goal.id === id ? { ...goal, done: !goal.done } : goal));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav showTelemetry />
        <div className="flex-1 overflow-y-auto">
          <div className="flex min-h-full">
            {/* Main Content */}
            <div className="flex-1 min-w-0 p-6 space-y-5">
              {/* Greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5 mb-0.5">
                    Good morning, {CURRENT_USER.name.split(" ")[0]}
                    <span className="dd-chip text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">#SYS_ONLINE</span>
                  </h1>
                  <p className="text-slate-500 text-sm">
                    You're in the <span className="text-indigo-900 font-semibold">top 4%</span> of active developers this week. Keep the momentum going.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost text-xs"><Filter size={13} /> Telemetry Filters</button>
                  <button onClick={() => navigate("/challenge/c1")} className="btn-primary text-sm">
                    <Plus size={14} /> New Session
                  </button>
                </div>
              </div>

              {/* Stat Strip */}
              <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
                {[
                  { label: "Current Streak", value: `${CURRENT_USER.streak}d`, sub: "312 commits/tests", valueColor: "text-orange-600", icon: <Flame size={13} className="text-orange-400" /> },
                  { label: "Skill Index", value: `${CURRENT_USER.xp}`, sub: `Lv.${CURRENT_USER.level} ${CURRENT_USER.levelLabel} · +14 pts`, valueColor: "text-indigo-900", icon: <TrendingUp size={13} className="text-indigo-400" /> },
                  { label: "Active Time", value: "38.4h", sub: "This calendar month", valueColor: "text-eblue-600", icon: <Timer size={13} className="text-blue-400" /> },
                  { label: "Paths Mastered", value: "12", sub: "2 currently enrolled", valueColor: "text-success", icon: <CheckCircle2 size={13} className="text-emerald-400" /> },
                  { label: "Prod Deploys", value: `${CURRENT_USER.productionDeploys}`, sub: "Zero downtime runs", valueColor: "text-indigo-700", icon: <Rocket size={13} className="text-indigo-400" /> },
                  { label: "Market Ready", value: `${CURRENT_USER.marketReadiness}%`, sub: "Fast-Track Eligible", valueColor: "text-ai-dark", icon: <Zap size={13} className="text-ai" /> },
                ].map(stat => (
                  <div key={stat.label} className="stat-card">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">{stat.label}</p>
                      {stat.icon}
                    </div>
                    <p className={`text-2xl font-bold tracking-tight ${stat.valueColor}`}>{stat.value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Active Curriculum */}
              <div className="dd-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ai animate-pulse" />
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Active Curriculum</span>
                    <span className="text-slate-400 text-xs">· Module 8 of 12</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Clock size={12} />
                    <span>42 min left in module</span>
                  </div>
                </div>
                <h2 className="text-slate-900 text-xl font-bold tracking-tight mb-1">Distributed Systems & High-Performance Go</h2>
                <p className="text-slate-500 text-sm mb-3">
                  Checkpoint: <span className="text-ai-dark font-medium">Raft Consensus Protocol & Leader Election</span> — Implementing state transitions, term increments, and split-vote backoff.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-slate-500 text-xs">Path completion</span>
                  <div className="flex-1 progress-track h-2">
                    <div className="progress-fill" style={{ width: "68%" }} />
                  </div>
                  <span className="text-slate-900 text-xs font-bold">68%</span>
                </div>

                {/* Code Block */}
                <div className="ide-shell text-xs leading-6 overflow-x-auto mb-4 p-4" style={{ maxHeight: 190 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-slate-500 text-[10px] font-mono">consensus_raft.go</span>
                    <span className="text-slate-600 text-[10px] font-mono">Go 1.22</span>
                  </div>
                  <div className="space-y-px font-mono">
                    <p><span className="syn-keyword">func</span> <span className="syn-func">(rf *Raft)</span> <span className="syn-func">startElection</span>() {'{'}</p>
                    <p>  rf.mu.<span className="syn-func">Lock</span>()</p>
                    <p>  <span className="syn-keyword">defer</span> rf.mu.<span className="syn-func">Unlock</span>()</p>
                    <p>  rf.currentTerm++</p>
                    <p>  rf.state = <span className="syn-type">StateCandidate</span></p>
                    <p>  rf.votedFor = rf.me</p>
                    <p>  rf.<span className="syn-func">resetElectionTimer</span>()</p>
                    <p className="syn-comment">  {"// Broadcast RequestVoteArgs to all cluster peers asynchronously"}</p>
                    <p>  <span className="syn-keyword">for</span> peer := <span className="syn-keyword">range</span> rf.peers {'{'}</p>
                    <p>    <span className="syn-keyword">if</span> peer != rf.me {'{'}</p>
                    <p>      <span className="syn-keyword">go</span> rf.<span className="syn-func">sendRequestVote</span>(peer, &<span className="syn-type">RequestVoteArgs</span>{'{'}Term: rf.currentTerm{'}'})</p>
                    <p>    {'}'}</p>
                    <p>  {'}'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => navigate("/challenge/c1")} className="btn-primary">
                    <Play size={13} /> Resume Sandbox
                  </button>
                  <button onClick={() => navigate("/challenge/c1")} className="btn-ghost">
                    <Code2 size={13} /> Open Editor
                  </button>
                  <div className="ml-auto flex items-center gap-2 text-xs text-slate-400">
                    <span>Also on route:</span>
                    <span className="text-ai-dark font-mono text-xs">Full-Stack TypeScript</span>
                    <span className="text-slate-700 font-bold">45%</span>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div className="dd-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-indigo-900" />
                    <h3 className="text-slate-900 font-bold">Today's Goals & Sprint Targets</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock size={12} className="text-warning" />
                    <span className="text-warning font-semibold">14h 22m remaining</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mb-4">Daily checkpoints update automatically from git commits and test executions.</p>
                <div className="space-y-2.5">
                  {goals.map(goal => (
                    <div key={goal.id} className={`flex items-start gap-3 p-3 rounded-md border transition-all ${goal.done ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                      <button onClick={() => toggleGoal(goal.id)} className="mt-0.5 shrink-0">
                        {goal.done
                          ? <CheckSquare size={16} className="text-success" />
                          : <Square size={16} className="text-slate-300" />
                        }
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${goal.done ? "line-through text-slate-400" : "text-slate-900"}`}>{goal.title}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{goal.detail}</p>
                      </div>
                      <span className={`dd-chip text-[10px] shrink-0 ${goal.color === "emerald" ? "dd-chip-completed" : goal.color === "amber" ? "dd-chip-pending" : "dd-chip-indigo"}`}>
                        {goal.xp}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Daily challenge CTA */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                    <Trophy size={15} className="text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 text-sm font-semibold">Ready for today's challenge?</p>
                    <p className="text-slate-500 text-xs">Earn the 'Concurrency Architect' badge by passing before midnight</p>
                  </div>
                  <button onClick={() => navigate("/challenge/c1")} className="btn-primary text-xs shrink-0 whitespace-nowrap">
                    Solve Daily <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Activity Heatmap */}
              <div className="dd-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-eblue-600" />
                    <h3 className="text-slate-900 font-bold">Activity & Commit Heatmap</h3>
                    <span className="dd-chip-blue text-[10px]">12 WEEKS</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {["All Practice", "Code Commits", "AI Reviews"].map(f => (
                      <button key={f} className="hover:text-slate-700 transition-colors">{f}</button>
                    ))}
                  </div>
                </div>
                <ActivityHeatmap />
              </div>

              {/* Live Activity Telemetry Stream */}
              <LiveActivityStream maxItems={3} />

              {/* Diagnostic Feed */}
              <div className="dd-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-ai" />
                    <h3 className="text-slate-900 font-bold">Diagnostic & Activity Stream</h3>
                  </div>
                  <button onClick={() => navigate("/analytics")} className="text-eblue-600 text-xs hover:text-eblue-700 transition-colors">
                    Full Execution Log →
                  </button>
                </div>
                <div className="space-y-0 divide-y divide-slate-100">
                  {ACTIVITY_FEED.map(item => (
                    <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${item.color === "emerald" ? "bg-emerald-50 border border-emerald-200" : item.color === "cyan" ? "bg-cyan-50 border border-cyan-200" : "bg-indigo-50 border border-indigo-200"}`}>
                        {item.type === "challenge" && <Trophy size={14} className={item.color === "emerald" ? "text-success" : "text-ai"} />}
                        {item.type === "review" && <GitCommit size={14} className="text-ai" />}
                        {item.type === "milestone" && <Zap size={14} className="text-indigo-700" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-slate-900 text-sm font-semibold">{item.title}</p>
                          <span className="text-slate-400 text-xs shrink-0 font-mono">{item.time}</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.detail}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.tags.map(t => (
                            <span key={t} className={`dd-chip text-[10px] ${item.color === "emerald" ? "dd-chip-completed" : item.color === "cyan" ? "dd-chip-ai" : "dd-chip-indigo"}`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Rail */}
            <div className="w-72 shrink-0 p-4 space-y-4 overflow-y-auto border-l border-slate-200 bg-white">
              {/* Career Readiness */}
              <div className="dd-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-900 font-bold text-sm">Career Readiness</h3>
                  <span className="dd-chip-indigo text-[10px] font-mono">STAFF READY</span>
                </div>
                <div className="flex justify-center mb-3">
                  <CircularGauge value={CURRENT_USER.marketReadiness} size={96} color="#312E81" trackColor="#E0E7FF" />
                </div>
                <div className="text-center mb-4">
                  <p className="text-slate-900 font-bold text-xl">{CURRENT_USER.marketReadiness}%</p>
                  <p className="text-slate-500 text-xs">Market Index Match</p>
                  <p className="text-slate-600 text-xs mt-1">Exceeds criteria for Staff & Principal benchmarks.</p>
                </div>
                {SKILL_MATRIX.map(s => (
                  <div key={s.label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-600 text-xs">{s.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-semibold ${s.value >= 90 ? "text-ai-dark" : s.value >= 80 ? "text-eblue-600" : "text-warning"}`}>{s.value}%</span>
                        <span className={`dd-chip text-[9px] py-0 h-[16px] ${
                          s.value >= 94 ? "dd-chip-ai" : s.value >= 90 ? "dd-chip-blue" : "dd-chip-pending"
                        }`}>{s.badge}</span>
                      </div>
                    </div>
                    <div className="progress-track">
                      <div className={`${s.value >= 94 ? "progress-fill-cyan" : "progress-fill"}`} style={{ width: `${s.value}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2.5 bg-cyan-50 border border-cyan-200 rounded-md text-xs text-slate-600">
                  <span className="text-ai-dark font-semibold">Partner Radar Active</span><br />
                  3 companies scouted your profile this week (Stripe, Datadog, Razorpay).
                </div>
                <button onClick={() => navigate("/profile")} className="btn-primary w-full justify-center mt-3 text-xs">
                  View Verified Scorecard <ArrowUpRight size={12} />
                </button>
              </div>

              {/* AI Mentor Widget */}
              <div className="dd-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Brain size={14} className="text-ai" />
                    <h3 className="text-slate-900 font-bold text-sm">AI Developer Mentor</h3>
                  </div>
                  <span className="dd-chip-ai text-[9px]">v3.8</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle size={12} className="text-warning" />
                    <span className="text-amber-800 text-xs font-semibold">Bottleneck Detected</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">Repeated deadlock patterns in your Go mutex lock hierarchy during the Raft vote loop. Generated a targeted 10-minute micro-lab on <span className="text-ai-dark font-medium">sync.RWMutex vs Channel Fan-Out</span>.</p>
                </div>
                <button
                  onClick={() => {
                    toast.success("Launching 10-minute Micro-Lab: sync.RWMutex vs Channel Fan-Out.");
                    navigate("/challenge/c1");
                  }}
                  className="btn-ai w-full justify-center text-xs"
                >
                  <Sparkles size={13} /> Start Micro-Lab (10 min)
                </button>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-500 text-xs font-semibold">Recommended Next</span>
                    <span className="text-slate-400 text-[10px]">Gap Driven</span>
                  </div>
                  {[
                    { type: "MICRO-COURSE", title: "eBPF Performance Tracing in Linux", tags: "Staff Level · 2.5 Hours" },
                    { type: "PROJECT", title: "Edge AI Inference Gateway with SSE", tags: "Cloud & Concurrency · 4 Modules" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      onClick={() => navigate("/learning")}
                      className="mb-2 p-2.5 bg-slate-50 rounded-md border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-bold text-ai-dark uppercase tracking-wider">{item.type}</span>
                      </div>
                      <p className="text-slate-900 text-xs font-semibold">{item.title}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{item.tags}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Session */}
              <div className="dd-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-eblue-600" />
                    <h3 className="text-slate-900 font-bold text-sm">1:1 Mentor Session</h3>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>
                {MENTORS.filter(m => m.available && m.nextSession).slice(0, 1).map(m => (
                  <div key={m.id}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {m.avatar}
                      </div>
                      <div>
                        <p className="text-slate-900 text-sm font-bold">{m.name}</p>
                        <p className="text-slate-500 text-xs">{m.title} @ {m.company}</p>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar size={11} className="text-slate-400" />
                        <span className="text-slate-700 text-xs">{m.nextSession}</span>
                      </div>
                      <p className="text-slate-400 text-[10px]">Agenda: Raft consensus formal verification & distributed transactional commit benchmarks.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toast.success("Added mentor session to calendar.")}
                        className="btn-ghost flex-1 text-xs justify-center"
                      >
                        Add Calendar
                      </button>
                      <button
                        onClick={() => {
                          toast.success("Opening preparation questions & architectural agenda...");
                          navigate("/mentors");
                        }}
                        className="btn-primary flex-1 text-xs justify-center"
                      >
                        Prep Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
