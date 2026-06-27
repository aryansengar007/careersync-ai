// src/pages/JobTracker/JobTracker.jsx
import React, { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useData } from "../../context/DataContext";
import ApplicationCard from "../../components/jobtracker/ApplicationCard";
import ApplicationModal from "../../components/jobtracker/ApplicationModal";
import StatusDonut from "../../components/jobtracker/StatusDonut";

const STATUSES = ["Applied", "Interviewing", "Offer", "Rejected"];
const COLUMN_TINT = {
  Applied: "bg-sync-blue/5",
  Interviewing: "bg-sync-amber/5",
  Offer: "bg-emerald-500/5",
  Rejected: "bg-slate-400/5",
};

export default function JobTracker() {
  const { applications, addApplication, updateApplication, deleteApplication } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [dragOverStatus, setDragOverStatus] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return applications;
    const q = query.toLowerCase();
    return applications.filter(
      (a) => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    );
  }, [applications, query]);

  const counts = useMemo(() => {
    const c = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
    applications.forEach((a) => {
      if (c[a.status] !== undefined) c[a.status] += 1;
    });
    return c;
  }, [applications]);

  const handleSubmit = (form) => {
    if (editing) {
      updateApplication(editing.id, form);
    } else {
      addApplication(form);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData("text/plain");
    updateApplication(id, { status });
    setDragOverStatus(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-sync-ink">Job Tracker</h1>
          <p className="text-sync-ink/55 text-sm mt-1">Drag cards across columns as your applications move forward.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sync-gradient text-white text-sm font-medium shadow-glow-indigo"
        >
          <Plus size={16} /> Add Application
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 mb-8">
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-panel shadow-glass max-w-md">
          <Search size={16} className="text-sync-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company or role…"
            className="flex-1 bg-transparent outline-none text-sm text-sync-ink placeholder:text-sync-ink/35"
          />
        </div>
        <div className="rounded-2xl glass-panel shadow-glass px-5 py-4">
          <StatusDonut counts={counts} total={applications.length} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATUSES.map((status) => {
          const items = filtered.filter((a) => a.status === status);
          return (
            <div
              key={status}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverStatus(status);
              }}
              onDragLeave={() => setDragOverStatus(null)}
              onDrop={(e) => handleDrop(e, status)}
              className={`rounded-3xl p-4 min-h-[420px] transition-colors ${COLUMN_TINT[status]} ${
                dragOverStatus === status ? "ring-2 ring-sync-indigo/40" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-semibold text-sync-ink">{status}</h3>
                <span className="text-xs font-medium text-sync-ink/40 bg-white/70 px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <div className="space-y-3">
                {items.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    app={app}
                    onDragStart={handleDragStart}
                    onEdit={(a) => {
                      setEditing(a);
                      setModalOpen(true);
                    }}
                    onDelete={deleteApplication}
                  />
                ))}
                {items.length === 0 && (
                  <p className="text-xs text-sync-ink/30 text-center py-8">Drop applications here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ApplicationModal
        open={modalOpen}
        initial={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
