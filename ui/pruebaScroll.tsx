"use client";
import { hightlightsSlides } from "@/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// completado los puntos con sus tiempos, ahora implementar los videos

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

  const videoBolContentRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const videoBolRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const cajaContent = document.querySelector("#cajaContent");
    const duracionVideo = [4, 5, 2, 3.63];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cajaContent,
        start: "20px 80%",
        end: "top 50%",
        markers: true,
      },
    });

    duracionVideo.forEach((video, index) => {
      tl.to(videoBolContentRefs.current[index], {
        duration: video,
        onStart: () => {
          gsap.to(videoBolContentRefs.current[index], {
            width: "70px",
            duration: 0.2,
          });
          gsap.to(videoBolRefs.current[index], {
            width: "70px",
            duration: video,
          });
        },
        onComplete: () => {
          gsap.to(videoBolContentRefs.current[index], {
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

  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const sliderContentRef = useRef<HTMLDivElement>(null);

  // para el posicionamiento inicial
  useEffect(() => {
    const cajaContent = document.querySelector("#cajaContent");
    const sliderContainer = sliderContentRef.current;
    const itemSlider = document.querySelector("#slider");

    let widthCenter = 0;
    if (sliderContainer && itemSlider) {
      widthCenter =
        (sliderContainer.clientWidth - itemSlider.clientWidth) / 2 + 80;
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cajaContent,
        start: "20px 80%",
        end: "top 50%",
        markers: true,
        once: true,
      },
    });

    tl.to(sliderContainer, {
      onStart: () => {
        gsap.to(sliderContainer, {
          x: widthCenter,
        });
      },
    });

  }, []);

  // para el posicionamiento de cada item
  useEffect(() => {
    const cajaContent = document.querySelector("#cajaContent");
    const sliderContainer = sliderContentRef.current;
    const itemSlider = document.querySelector("#slider");

    if (currentVideoIndex < hightlightsSlides.length - 1) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cajaContent,
          start: "20px 80%",
          end: "top 50%",
          once: true,
        },
      });

      const duracionVideo = [4, 5, 2, 3.63];
      if (!itemSlider) return
      tl.to(sliderContainer, {
        x: -itemSlider.clientWidth * (currentVideoIndex + 1),
        duration: 1, // Duración de la animación de desplazamiento
        delay: duracionVideo[currentVideoIndex], // Retraso según la duración del video
      });
    }
  }, [currentVideoIndex]);

  // Secuencia de videos
  useEffect(() => {
    const cajaContent = document.querySelector("#cajaContent");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cajaContent,
        start: "20px 80%",
        end: "top 50%",
        markers: true,
        onEnter: () => {
          reproduccionVideo();
        },
        once: true,
      },
    });
    const currentVideo = videoRef.current[currentVideoIndex];
    const reproduccionVideo = () => {
      if (currentVideo) {
        currentVideo.play();
      }
      currentVideo?.addEventListener("ended", handleIndexVideo);
    };
    const handleIndexVideo = () => {
      console.log("fin");
      if (currentVideoIndex < hightlightsSlides.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    };

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("ended", handleIndexVideo);
      }
    };
  }, [currentVideoIndex]);

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
        className="flex items-center"
        // id="sliderContent"
        ref={sliderContentRef}
        // style={{ translate: 250 }}
      >
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div
                className="w-full h-full flex-center
              rounded-3xl overflow-hidden bg-black"
              >
                <video
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  key={list.video}
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        id="cajaContent"
        className="w-max m-auto relative flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <span
            className="maxContent mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            style={{ width: "10px", height: "10px" }}
            key={index}
            ref={(el) => {
              videoBolContentRefs.current[index] = el;
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
