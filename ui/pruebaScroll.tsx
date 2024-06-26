"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function PruebaScroll() {
//   useEffect(() => {
//     const textWrappers = document.querySelectorAll("#title");
//     gsap.to(textWrappers, {
//       x: 250,
//       fontSize: "2rem",
//       scrollTrigger: {
//         trigger: textWrappers,
//         start: "bottom bottom",
//         end: "top 25%",
//         scrub: true,
//       },
//     });
//   }, []);
  useGSAP(() => {

    const textWrappers = document.querySelectorAll("#title");
    gsap.to(textWrappers, {
      x: 250,
      fontSize: "2rem",
      scrollTrigger: {
        trigger: textWrappers,
        start: "bottom bottom",
        end: "top 25%",
        scrub: true,
      },
    });

  }, [])

  return (
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
  );
}
