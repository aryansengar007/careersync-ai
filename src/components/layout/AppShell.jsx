// src/components/layout/AppShell.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  Briefcase,
  Target,
  Menu,
  X,
  LogOut,
  RefreshCw,
  Search,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FloatingBlobs from "../ui/FloatingBlobs";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume-builder", label: "Resume Builder", icon: FileText },
  { to: "/cover-letter", label: "Cover Letters", icon: MessageSquareText },
  { to: "/job-tracker", label: "Job Tracker", icon: Briefcase },
  { to: "/interview-prep", label: "Interview Prep", icon: Target },
];

export default function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-sync-paper relative">
      <FloatingBlobs variant="compact" />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-64 glass-panel border-r border-white/60 z-30 px-5 py-7">
        <SidebarContent onNavigate={() => {}} onSignOut={handleSignOut} user={user} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-sync-ink/30 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 glass-panel z-50 px-5 py-7 lg:hidden"
            >
              <SidebarContent
                onNavigate={() => setMobileOpen(false)}
                onSignOut={handleSignOut}
                user={user}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 glass-soft border-b border-white/50">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg text-sync-ink"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-sync-line flex-1 max-w-sm text-sync-ink/50">
            <Search size={16} />
            <span className="text-sm">Quick search…</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-sync-ink leading-tight">{user?.name || "Member"}</p>
              <p className="text-xs text-sync-ink/50 leading-tight">{user?.isGuest ? "Guest session" : "Pro Member"}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-sync-gradient flex items-center justify-center text-white font-semibold">
              {(user?.name || "G")[0].toUpperCase()}
            </div>
          </div>
        </header>

        <main className="px-5 sm:px-8 py-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate, onSignOut, user }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 font-display font-semibold text-sync-ink">
          <span className="w-8 h-8 rounded-xl bg-sync-gradient flex items-center justify-center">
            <RefreshCw size={16} className="text-white" />
          </span>
          CareerSync
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sync-gradient text-white shadow-glow-indigo"
                  : "text-sync-ink/65 hover:bg-white/70 hover:text-sync-indigo"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-5 border-t border-sync-line/70 mt-4">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-sync-gradient flex items-center justify-center text-white text-sm font-semibold">
            {(user?.name || "G")[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-sync-ink truncate">{user?.name || "Guest"}</p>
            <p className="text-xs text-sync-ink/50 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-sync-ink/60 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  );
}
