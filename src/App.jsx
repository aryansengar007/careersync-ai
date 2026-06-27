// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import CustomCursor from "./components/ui/CustomCursor";
import PageTransition from "./components/ui/PageTransition";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AppShell from "./components/layout/AppShell";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder";
import CoverLetterGenerator from "./pages/CoverLetter/CoverLetterGenerator";
import JobTracker from "./pages/JobTracker/JobTracker";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import NotFound from "./pages/NotFound";

function withShell(page) {
  return (
    <ProtectedRoute>
      <AppShell>{page}</AppShell>
    </ProtectedRoute>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="cursor-enabled">
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

          <Route path="/dashboard" element={<PageTransition>{withShell(<Dashboard />)}</PageTransition>} />
          <Route path="/resume-builder" element={<PageTransition>{withShell(<ResumeBuilder />)}</PageTransition>} />
          <Route path="/cover-letter" element={<PageTransition>{withShell(<CoverLetterGenerator />)}</PageTransition>} />
          <Route path="/job-tracker" element={<PageTransition>{withShell(<JobTracker />)}</PageTransition>} />
          <Route path="/interview-prep" element={<PageTransition>{withShell(<InterviewPrep />)}</PageTransition>} />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
