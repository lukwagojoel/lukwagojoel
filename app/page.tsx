import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-carbon pb-24">
      <ScrollProgress />
      <Hero />
      {/* <IdentityBar /> */}
      <Bio />
      <Projects />
      <Footer />
    </main>
  );
}
