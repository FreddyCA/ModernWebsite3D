"use client";
import { rightImg, watchImg } from "@/lib";
import gsap from "gsap";
import Image from "next/image";
import VideoCarousel from "./videoCarousel";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "bottom 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to("#title", {
      opacity: 1,
      y: 0,
    }).to(".link", {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.25,
    });
    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding-highligths bg-zinc"
    >
      <div className="screen-max-width">
        <div
          ref={containerRef}
          className="mb-12 w-full md:flex items-end justify-between px-5 sm:px-10"
        >
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <Image src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <Image src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
}
