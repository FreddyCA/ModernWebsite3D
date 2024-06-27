"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function PruebaScroll() {
  //   useGSAP(() => {
  //     const textWrappers = document.querySelectorAll("#title");
  //     gsap.to(textWrappers, {
  //       backgroundColor: "blue",
  //       fontSize: "2rem",
  //       scrollTrigger: {
  //         trigger: textWrappers,
  //         start: "top bottom",
  //         end: "top 25%",
  //         scrub: true,
  //       },
  //     });
  //   }, []);

  const videoContentRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const videoBolRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const cajaContent = document.querySelector("#cajaContent");
    const duracionVideo = [4, 2, 3, 5, 6];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cajaContent,
        start: "20px 80%",
        end: "top 50%",
        markers: true,
      },
    });

    duracionVideo.forEach((video, index) => {
      tl.to(videoContentRefs.current[index], {
        duration: video,
        onStart: () => {
          gsap.to(videoContentRefs.current[index], {
            width: "70px",
            duration: 0.2,
          });
          gsap.to(videoBolRefs.current[index], {
            width: "70px",
            duration: video,
          });
        },
        onComplete: () => {
          gsap.to(videoContentRefs.current[index], {
            width: "10px",
            duration: 0.1,
          });
          gsap.to(videoBolRefs.current[index], {
            width: "10px",
            duration: 0.1,
          });
        },
      });
    });
  }, []);
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center h-screen">
          <h1
            id="title"
            className="font-bold text-white whitespace-normal text-nowrap "
          >
            A new way of designing, discovering and sharing
          </h1>
        </div>
      </div>

      <div
        id="cajaContent"
        className="w-max m-auto relative flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            className="maxContent mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            style={{ width: "10px", height: "10px" }}
            key={index}
            ref={(el) => {
              videoContentRefs.current[index] = el;
            }}
          >
            <span
              className="bolitaItem absolute h-full rounded-full"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
              }}
              ref={(el) => {
                videoBolRefs.current[index] = el;
              }}
            />
          </span>
        ))}
      </div>
      <div className="h-lvh"></div>
    </>
  );
}
