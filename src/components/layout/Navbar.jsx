// src/components/layout/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, RefreshCw } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/#features", label: "Features" },
  { to: "/#stats", label: "Why CareerSync" },
  { to: "/#testimonials", label: "Stories" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? "glass shadow-glass py-2.5 px-5" : ""
        }`}
      >
        <Link to="/" data-cursor="link" className="flex items-center gap-2 font-display font-semibold text-lg text-sync-ink">
          <span className="w-8 h-8 rounded-xl bg-sync-gradient flex items-center justify-center shadow-glow-indigo">
            <RefreshCw size={16} className="text-white" />
          </span>
          CareerSync<span className="text-sync-indigo">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sync-ink/70">
          {links.map((l) => (
            <a key={l.label} href={l.to} data-cursor="link" className="hover:text-sync-indigo transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <MagneticButton
              as={Link}
              to="/dashboard"
              data-cursor="link"
              className="px-5 py-2.5 rounded-full bg-sync-ink text-white text-sm font-medium shadow-soft hover:shadow-glass-lg transition-shadow"
            >
              Go to Dashboard
            </MagneticButton>
          ) : (
            <>
              <Link to="/login" data-cursor="link" className="text-sm font-medium text-sync-ink/80 hover:text-sync-indigo transition-colors">
                Log in
              </Link>
              <MagneticButton
                as={Link}
                to="/signup"
                data-cursor="link"
                className="px-5 py-2.5 rounded-full bg-sync-gradient text-white text-sm font-medium shadow-glow-indigo"
              >
                Get Started Free
              </MagneticButton>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-sync-ink"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-3 rounded-2xl glass shadow-glass-lg p-5 md:hidden"
          >
            <nav className="flex flex-col gap-4 text-sync-ink/80 font-medium">
              {links.map((l) => (
                <a key={l.label} href={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <hr className="border-sync-line" />
              {user ? (
                <Link to="/dashboard" onClick={() => setOpen(false)} className="font-semibold text-sync-indigo">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="text-center px-5 py-2.5 rounded-full bg-sync-gradient text-white font-medium"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
