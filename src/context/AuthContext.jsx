// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isFirebaseConfigured, auth } from "../firebase/config";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as fbSignOut,
} from "firebase/auth";

const AuthContext = createContext(null);

const DEMO_USER_KEY = "cs_demo_user";
const DEMO_USERS_KEY = "cs_demo_users";

function readDemoUsers() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_USERS_KEY)) || {};
  } catch {
    return {};
  }
}

function writeDemoUsers(users) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Restore session on load (demo mode) or subscribe to Firebase auth state.
  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsub = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split("@")[0] || "Member",
            email: fbUser.email,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsub();
    } else {
      const stored = localStorage.getItem(DEMO_USER_KEY);
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    }
  }, []);

  const signUp = async (name, email, password) => {
    setAuthError("");
    if (isFirebaseConfigured) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        setUser({ uid: cred.user.uid, name, email });
        return true;
      } catch (err) {
        setAuthError(err.message);
        return false;
      }
    } else {
      const users = readDemoUsers();
      if (users[email]) {
        setAuthError("An account with this email already exists.");
        return false;
      }
      users[email] = { name, email, password };
      writeDemoUsers(users);
      const newUser = { uid: email, name, email };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
  };

  const signIn = async (email, password) => {
    setAuthError("");
    if (isFirebaseConfigured) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          uid: cred.user.uid,
          name: cred.user.displayName || email.split("@")[0],
          email,
        });
        return true;
      } catch (err) {
        setAuthError(err.message);
        return false;
      }
    } else {
      const users = readDemoUsers();
      const record = users[email];
      if (!record || record.password !== password) {
        setAuthError("Incorrect email or password.");
        return false;
      }
      const loggedInUser = { uid: email, name: record.name, email };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    }
  };

  const continueAsGuest = () => {
    const guest = { uid: "guest", name: "Guest", email: "guest@careersync.ai", isGuest: true };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(guest));
    setUser(guest);
  };

  const signOut = async () => {
    if (isFirebaseConfigured) {
      await fbSignOut(auth);
    }
    localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      isDemoMode: !isFirebaseConfigured,
      signUp,
      signIn,
      signOut,
      continueAsGuest,
    }),
    [user, loading, authError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
