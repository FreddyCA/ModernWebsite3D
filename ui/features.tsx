"use client";
import { explore1Img, explore2Img } from "@/lib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const exploreVideo = "/assets/videos/explore.mp4";
  // ANIMACION VIDEO
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!videoRef.current) return;
    const videoItem = videoRef.current;
    ScrollTrigger.refresh();
    const animation = gsap.to(videoItem, {
      scrollTrigger: {
        trigger: videoItem,
        toggleActions: "play pause reverse restart",
        start: "top 85%",
        onEnter: () => {
          videoItem.play();
        },
      },
      opacity: 1,
      duration: 1,
    });

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, []);

  //  ANIMACION TEXTO
  const textFeaturesRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const tlTexts = textFeaturesRef.current.map((textRef) => {
      if (textRef) {
        const tlT = gsap.timeline({
          scrollTrigger: {
            trigger: textRef,
          },
        });
        tlT.to(textRef, {
          y: 0,
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        });
        return tlT;
      }
    });
    return () => {
      tlTexts.forEach((tlT) => tlT?.scrollTrigger?.kill());
    };
  }, []);

  //   ANIMACION TITLE
  const titleFeatureRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = titleFeatureRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to("#titleFeatures", {
      opacity: 1,
      y: 0,
    });
    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  //   ANIMACION IMAGENES
  const imageRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const timelines = imageRefs.current.map((imageRef) => {
      if (imageRef) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageRef,
            start: "top 85%",
            end: "bottom 50%",
            toggleActions: "restart reverse restart reverse",
            scrub: 5.5,
          },
        });
        tl.to(imageRef, {
          scale: 1,
          opacity: 1,
          ease: "power1",
        });
        return tl;
      }
    });

    return () => {
      timelines.forEach((tl) => tl?.scrollTrigger?.kill());
    };
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div ref={titleFeatureRef} className="mb-12 w-full">
          <h2 id="titleFeatures" className="section-heading">
            Explore the full story.
          </h2>
        </div>

        <div className="flex flex-col justify-center items-start overflow-hidden">
          <div className="mt-32 mb-24 pl-24 w-full">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <div
                    ref={(el) => {
                      imageRefs.current[0] = el!;
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      scale: 1.5,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  >
                    <Image
                      src={explore1Img}
                      alt="titanium"
                      className="feature-video g_grow"
                    />
                  </div>
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <div
                    ref={(el) => {
                      imageRefs.current[1] = el!;
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      scale: 1.5,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  >
                    <Image
                      src={explore2Img}
                      alt="titanium 2"
                      className="feature-video g_grow"
                    />
                  </div>
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p
                    className="feature-text g_text"
                    ref={(el) => {
                      textFeaturesRef.current[0] = el!;
                    }}
                  >
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p
                    className="feature-text g_text"
                    ref={(el) => {
                      textFeaturesRef.current[1] = el!;
                    }}
                  >
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    Your all notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
