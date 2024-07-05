import Hero from "@/ui/hero";
import Navbar from "@/ui/navbar";
import Highlights from "@/ui/highlights";
import Model from "@/ui/model";
import PruebaGLB from "@/ui/pruebaGLB";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <div style={{ height: "100vh" }}>
        <PruebaGLB />
      </div>
    </main>
  );
}
