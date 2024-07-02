import Hero from "@/ui/hero";
import Navbar from "@/ui/navbar";
import Highlights from "@/ui/highlights";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        a
      </div>
    </main>
  );
}
