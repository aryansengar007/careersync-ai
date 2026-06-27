// src/context/DataContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

const emptyState = {
  resumes: [],
  coverLetters: [],
  applications: [],
};

function storageKey(uid) {
  return `cs_data_${uid || "anon"}`;
}

function loadState(uid) {
  try {
    const raw = localStorage.getItem(storageKey(uid));
    return raw ? { ...emptyState, ...JSON.parse(raw) } : emptyState;
  } catch {
    return emptyState;
  }
}

export function DataProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid;
  const [state, setState] = useState(emptyState);

  // Load this user's data whenever they change.
  useEffect(() => {
    setState(loadState(uid));
  }, [uid]);

  // Persist on every change.
  useEffect(() => {
    if (!uid) return;
    localStorage.setItem(storageKey(uid), JSON.stringify(state));
  }, [state, uid]);

  const uid4 = () => Math.random().toString(36).slice(2, 10);

  // ---------- Resumes ----------
  const saveResume = (resume) => {
    setState((prev) => {
      const exists = prev.resumes.some((r) => r.id === resume.id);
      const resumes = exists
        ? prev.resumes.map((r) => (r.id === resume.id ? { ...resume, updatedAt: Date.now() } : r))
        : [...prev.resumes, { ...resume, id: resume.id || uid4(), updatedAt: Date.now() }];
      return { ...prev, resumes };
    });
  };

  const deleteResume = (id) => {
    setState((prev) => ({ ...prev, resumes: prev.resumes.filter((r) => r.id !== id) }));
  };

  // ---------- Cover Letters ----------
  const saveCoverLetter = (letter) => {
    setState((prev) => ({
      ...prev,
      coverLetters: [{ ...letter, id: uid4(), createdAt: Date.now() }, ...prev.coverLetters],
    }));
  };

  const deleteCoverLetter = (id) => {
    setState((prev) => ({ ...prev, coverLetters: prev.coverLetters.filter((c) => c.id !== id) }));
  };

  // ---------- Applications ----------
  const addApplication = (app) => {
    setState((prev) => ({
      ...prev,
      applications: [
        { ...app, id: uid4(), createdAt: Date.now() },
        ...prev.applications,
      ],
    }));
  };

  const updateApplication = (id, patch) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  };

  const deleteApplication = (id) => {
    setState((prev) => ({ ...prev, applications: prev.applications.filter((a) => a.id !== id) }));
  };

  const value = useMemo(
    () => ({
      ...state,
      saveResume,
      deleteResume,
      saveCoverLetter,
      deleteCoverLetter,
      addApplication,
      updateApplication,
      deleteApplication,
    }),
    [state]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
