
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { DEMO_PROJECTS } from "@/data/projects";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-fuchsia-400 selection:text-black">
      <Hero/>

    </main>
  );
}