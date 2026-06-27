// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import FloatingBlobs from "../components/ui/FloatingBlobs";
import MagneticButton from "../components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-sync-paper px-6">
      <FloatingBlobs />
      <div className="text-center relative z-10">
        <span className="inline-flex w-16 h-16 rounded-2xl bg-sync-gradient items-center justify-center shadow-glow-indigo mb-6">
          <RefreshCw className="text-white" size={28} />
        </span>
        <h1 className="font-display text-6xl font-semibold text-sync-ink mb-3">404</h1>
        <p className="text-sync-ink/60 mb-8 max-w-sm mx-auto">
          This page hasn't synced yet. Let's get you back to something useful.
        </p>
        <MagneticButton
          as={Link}
          to="/"
          data-cursor="link"
          className="px-6 py-3 rounded-full bg-sync-ink text-white text-sm font-medium"
        >
          Back to home
        </MagneticButton>
      </div>
    </div>
  );
}
