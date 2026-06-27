// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RefreshCw, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import FloatingBlobs from "../../components/ui/FloatingBlobs";
import MagneticButton from "../../components/ui/MagneticButton";
import SyncOrb from "../../components/ui/SyncOrb";

export default function Login() {
  const { signIn, continueAsGuest, authError, isDemoMode } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await signIn(form.email, form.password);
    setSubmitting(false);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-sync-paper">
      {/* Branding panel */}
      <div className="hidden lg:flex relative flex-col items-center justify-center p-12 overflow-hidden">
        <FloatingBlobs />
        <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 font-display font-semibold text-sync-ink z-10">
          <span className="w-8 h-8 rounded-xl bg-sync-gradient flex items-center justify-center">
            <RefreshCw size={16} className="text-white" />
          </span>
          CareerSync AI
        </Link>
        <SyncOrb />
        <p className="relative z-10 mt-10 max-w-sm text-center text-sync-ink/60">
          "I had three recruiter replies by Wednesday." — Ananya, placed at a product startup
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-semibold text-sync-ink mb-10">
            <span className="w-8 h-8 rounded-xl bg-sync-gradient flex items-center justify-center">
              <RefreshCw size={16} className="text-white" />
            </span>
            CareerSync AI
          </Link>

          <h1 className="font-display text-3xl font-semibold text-sync-ink">Welcome back</h1>
          <p className="text-sync-ink/55 mt-2 mb-8 text-sm">
            Log in to pick up exactly where you left off.
          </p>

          {isDemoMode && (
            <div className="mb-6 text-xs px-4 py-3 rounded-xl bg-sync-amber/10 text-sync-ink/70 border border-sync-amber/20">
              Running in demo mode — accounts are stored locally in this browser. Connect Firebase
              (see <code>.env.example</code>) to enable real authentication.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              icon={Mail}
              type="email"
              placeholder="you@email.com"
              label="Email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              required
            />
            <Field
              icon={Lock}
              type="password"
              placeholder="••••••••"
              label="Password"
              value={form.password}
              onChange={(v) => setForm((f) => ({ ...f, password: v }))}
              required
            />

            {authError && <p className="text-sm text-red-500">{authError}</p>}

            <MagneticButton
              as="button"
              type="submit"
              disabled={submitting}
              data-cursor="sync"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-sync-gradient text-white font-medium shadow-glow-indigo disabled:opacity-70"
            >
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <>Log in <ArrowRight size={16} /></>}
            </MagneticButton>
          </form>

          <button
            onClick={() => {
              continueAsGuest();
              navigate("/dashboard");
            }}
            className="w-full mt-3 py-3.5 rounded-full border border-sync-line text-sync-ink/70 text-sm font-medium hover:bg-white/60 transition-colors"
          >
            Continue as Guest
          </button>

          <p className="text-center text-sm text-sync-ink/55 mt-8">
            New to CareerSync?{" "}
            <Link to="/signup" className="text-sync-indigo font-medium">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-sync-ink/60 mb-1.5 block">{label}</span>
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/70 border border-sync-line focus-within:border-sync-indigo transition-colors">
        <Icon size={16} className="text-sync-ink/40" />
        <input
          {...props}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-sync-ink placeholder:text-sync-ink/35"
        />
      </div>
    </label>
  );
}
