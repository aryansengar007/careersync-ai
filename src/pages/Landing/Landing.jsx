// src/pages/Landing/Landing.jsx
import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "./Hero";
import Features from "./Features";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

export default function Landing() {
  return (
    <div className="bg-sync-paper min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
