
import { ScrollExperience } from "@/components/kprstyle/Effects/scrollExp";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-fuchsia-400 selection:text-black">
      <ScrollExperience />
    </main>
  );
}