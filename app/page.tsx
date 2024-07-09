import Hero from "@/ui/hero";
import Navbar from "@/ui/navbar";
import Highlights from "@/ui/highlights";
import ModelInteractive from "@/ui/modelInteractive";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <ModelInteractive />
    </main>
  );
}
