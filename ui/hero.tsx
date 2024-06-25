"use client";
import { Suspense, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type VideoSource = string;
const heroVideo = "/assets/videos/hero.mp4";
const smallHeroVideo = "/assets/videos/smallHero.mp4";

export default function Hero() {
  const [statusResize, setStatusResize] = useState<boolean | null>(null);
  useEffect(() => {
    const handleVideoSrcSet = () => {
      if (typeof window !== undefined) {
        if (window.innerWidth < 760) {
          setStatusResize(true);
        } else {
          setStatusResize(false);
        }
      }
    };
    handleVideoSrcSet();
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window?.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div
          className="md:w-10/12 w-9/12"
          style={{ opacity: statusResize !== null ? 1 : 0 }}
        >
          <video
            className="pointer-events-none"
            style={{ display: statusResize ? "block" : "none" }}
            autoPlay
            muted
            playsInline={true}
            key={smallHeroVideo}
          >
            <source src={smallHeroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            className="pointer-events-none"
            style={{ display: !statusResize ? "block" : "none" }}
            autoPlay
            muted
            playsInline={true}
            key={heroVideo}
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
}
