import { useState } from "react";
import {
  Target, CheckSquare, FileText, CalendarDays, Plus,
  CheckCircle2, Clock, Trash2, Edit3, Save
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import { toast } from "sonner";

interface ProductivityViewProps {
  initialTab?: "goals" | "tasks" | "notes" | "calendar";
}

interface TaskItem {
  id: string;
  title: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  due: string;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "t1", title: "Complete Raft Leader Election heartbeat loop in Go", done: true, priority: "high", due: "Today" },
  { id: "t2", title: "Profile lock contention with pprof trace", done: false, priority: "high", due: "Tomorrow" },
  { id: "t3", title: "Review AST patch for redis_store.go channel send", done: false, priority: "medium", due: "Thu" },
  { id: "t4", title: "Schedule 1:1 screen preparation with Anand Raghavan", done: false, priority: "low", due: "Friday" },
];

export default function ProductivityView({ initialTab }: ProductivityViewProps) {
  const [activeTab, setActiveTab] = useState<"goals" | "tasks" | "notes" | "calendar">(initialTab ?? "goals");
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [noteContent, setNoteContent] = useState(
    `# Raft Consensus Notes & Invariants\n\n- State Transitions:\n  - Follower -> Candidate upon election timeout (150ms-300ms randomized)\n  - Candidate -> Leader upon receiving votes from majority of cluster\n- Invariant: A leader never overwrites or truncates its log entries; it only appends.\n\n# Benchmarks\n- P99 append latency under 5 nodes: 3.4ms\n- Clock drift threshold: monotonic clock delta < 50ms`
  );

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = () => {
    if (!newTaskInput.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskInput,
      done: false,
      priority: "medium",
      due: "This week",
    };
    setTasks([newTask, ...tasks]);
    setNewTaskInput("");
    toast.success("New task added to sprint!");
  };

  const saveNotes = () => {
    toast.success("Architecture notes saved successfully!");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Productivity & Sprint Hub</h1>
                <span className="dd-chip-indigo text-[10px]">SPRINT CYCLE 4</span>
              </div>
              <p className="text-slate-500 text-sm">
                Organize learning milestones, track tasks, write architecture RFC notes, and monitor calendar deadlines.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("goals")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "goals" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Target size={13} />
                <span>Goals & Planner</span>
              </button>
              <button
                onClick={() => setActiveTab("tasks")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "tasks" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CheckSquare size={13} />
                <span>Tasks ({tasks.filter((t) => !t.done).length})</span>
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "notes" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText size={13} />
                <span>Architecture Notes</span>
              </button>
              <button
                onClick={() => setActiveTab("calendar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === "calendar" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CalendarDays size={13} />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Goals */}
          {activeTab === "goals" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="dd-card p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono">SPRINT TARGET 1</span>
                  <h3 className="text-base font-bold text-slate-900">Finish Distributed Systems Module 8</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span className="font-mono font-bold text-indigo-900">80%</span>
                    </div>
                    <div className="progress-track h-2">
                      <div className="progress-fill" style={{ width: "80%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">2 lessons remaining before milestone exam.</p>
                </div>

                <div className="dd-card p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono">SPRINT TARGET 2</span>
                  <h3 className="text-base font-bold text-slate-900">Publish S3 Object Storage Lab</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span className="font-mono font-bold text-indigo-900">60%</span>
                    </div>
                    <div className="progress-track h-2">
                      <div className="progress-fill" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">Milestone 3 active: Write-Ahead Logging chunker.</p>
                </div>

                <div className="dd-card p-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase font-mono">SPRINT TARGET 3</span>
                  <h3 className="text-base font-bold text-slate-900">Maintain 84-Day Streak</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Target: 100 days</span>
                      <span className="font-mono font-bold text-orange-600">84%</span>
                    </div>
                    <div className="progress-track h-2">
                      <div className="progress-fill bg-orange-500" style={{ width: "84%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">16 days until Centurion Streak Badge.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Tasks Checklist */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              {/* Task Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a new engineering task or study objective..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="dd-input text-sm flex-1"
                />
                <button onClick={addTask} className="btn-primary text-xs py-2">
                  <Plus size={14} /> Add Task
                </button>
              </div>

              {/* Tasks List */}
              <div className="dd-card divide-y divide-slate-100 overflow-hidden">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="h-4 w-4 rounded accent-indigo-900 cursor-pointer"
                      />
                      <span className={`text-sm ${task.done ? "line-through text-slate-400" : "text-slate-800 font-medium"}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-slate-400">{task.due}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          task.priority === "high"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Notes Scratchpad */}
          {activeTab === "notes" && (
            <div className="dd-card p-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="font-mono text-xs text-slate-400">ENGINEERING SCRATCHPAD (MARKDOWN)</span>
                <button onClick={saveNotes} className="btn-primary text-xs py-1.5 flex items-center gap-1.5">
                  <Save size={13} /> Save Notes
                </button>
              </div>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={12}
                className="w-full font-mono text-xs leading-relaxed p-4 bg-slate-900 text-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* TAB 4: Calendar Deadlines */}
          {activeTab === "calendar" && (
            <div className="dd-card p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900">Upcoming Architectural Deadlines & Sessions</h3>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">1:1 Review Call with Alexei Volkov</span>
                    <span className="text-slate-500">Topic: Raft Consensus Formal Verification</span>
                  </div>
                  <span className="font-mono font-bold text-indigo-700">Thursday · 6:30 PM IST</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Distributed Systems Hackathon 2026 Submission</span>
                    <span className="text-slate-500">Deploy Raft KV Store to benchmark harness</span>
                  </div>
                  <span className="font-mono font-bold text-rose-600">In 4 Days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
