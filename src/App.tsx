import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import CodingChallenge from "@/pages/CodingChallenge";
import CodeReview from "@/pages/CodeReview";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenge/:id" element={<CodingChallenge />} />
        <Route path="/challenges" element={<CodingChallenge />} />
        <Route path="/code-review" element={<CodeReview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentor" element={<Dashboard />} />
        <Route path="/learning" element={<Dashboard />} />
        <Route path="/courses" element={<Dashboard />} />
        <Route path="/progress" element={<Dashboard />} />
        <Route path="/projects" element={<Profile />} />
        <Route path="/assessments" element={<Dashboard />} />
        <Route path="/jobs" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
