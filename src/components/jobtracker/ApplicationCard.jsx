// src/components/jobtracker/ApplicationCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, Pencil, Trash2 } from "lucide-react";

export default function ApplicationCard({ app, onEdit, onDelete, onDragStart }) {
  return (
    <motion.div
      layout
      draggable
      onDragStart={(e) => onDragStart(e, app.id)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-white border border-sync-line p-4 cursor-grab active:cursor-grabbing shadow-soft hover:shadow-glass transition-shadow group"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className="font-semibold text-sm text-sync-ink leading-snug">{app.role}</h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(app)} className="text-sync-ink/40 hover:text-sync-indigo">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(app.id)} className="text-sync-ink/40 hover:text-red-500">
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <p className="text-xs font-medium text-sync-indigo mb-2.5">{app.company}</p>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-sync-ink/45">
        {app.location && (
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {app.location}
          </span>
        )}
        {app.appliedDate && (
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {new Date(app.appliedDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
          </span>
        )}
        {app.link && (
          <a href={app.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sync-indigo">
            <ExternalLink size={11} /> Link
          </a>
        )}
      </div>
      {app.notes && <p className="text-[11px] text-sync-ink/50 mt-2.5 line-clamp-2">{app.notes}</p>}
    </motion.div>
  );
}
