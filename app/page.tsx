import { heroImg } from "@/lib";
import Hero from "@/ui/hero";
import Highlights from "@/ui/highlights";

import Navbar from "@/ui/navbar";
import PruebaScroll from "@/ui/pruebaScroll";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <Highlights /> */}
      <PruebaScroll />
    </main>
  );
}
