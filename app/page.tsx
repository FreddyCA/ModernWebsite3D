import Hero from "@/ui/hero";
import Navbar from "@/ui/navbar";
import Highlights from "@/ui/highlights";
import ModelInteractive from "@/ui/modelInteractive";
import Features from "@/ui/features";
import HowItWorks from "@/ui/howItWorks";
import Footer from "@/ui/footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <ModelInteractive />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
