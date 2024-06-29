import { heroImg } from "@/lib";
import Hero from "@/ui/hero";
import Highlights from "@/ui/highlights";

import Navbar from "@/ui/navbar";
import NextScroll from "@/ui/nextScroll";
import PruebaScroll from "@/ui/pruebaScroll";
import VideoCarouselV2 from "@/ui/videoCarouselV2";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <Highlights /> */}
      {/* <PruebaScroll /> */}
      {/* <NextScroll /> */}
      <VideoCarouselV2 />
    </main>
  );
}
