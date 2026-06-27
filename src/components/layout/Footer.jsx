// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-sync-line bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg text-sync-ink">
            <span className="w-8 h-8 rounded-xl bg-sync-gradient flex items-center justify-center">
              <RefreshCw size={16} className="text-white" />
            </span>
            CareerSync AI
          </Link>
          <p className="mt-4 text-sm text-sync-ink/60 max-w-xs">
            Built for students and freshers syncing every part of their first career search — one resume, one application, one interview at a time.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-cursor="link"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-sync-ink/60 hover:text-sync-indigo transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Product" items={["Resume Builder", "Cover Letters", "Job Tracker", "Interview Prep"]} />
        <FooterCol title="Company" items={["About", "Careers", "Blog", "Contact"]} />
        <FooterCol title="Resources" items={["Help Center", "Privacy Policy", "Terms of Service", "Community"]} />
      </div>
      <div className="border-t border-sync-line py-6 text-center text-xs text-sync-ink/50">
        © {new Date().getFullYear()} CareerSync AI. Built with care for the next generation of professionals.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-sync-ink mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-sync-ink/60">
        {items.map((item) => (
          <li key={item}>
            <a href="#" data-cursor="link" className="hover:text-sync-indigo transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
