"use client";
import { hightlightsSlides } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function VideoCarouselV2() {
  const espacioBolRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cargadorBolRef = useRef<(HTMLSpanElement | null)[]>([]);

  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement>(null); //contenedor mayor
  const blockItemRef = useRef<HTMLDivElement[]>([]); //contenedor de cada itemBlock
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [initVideo, setInitVideo] = useState<boolean>(false);

  console.log(initVideo);
  useEffect(() => {
    const container = containerRef.current;
    const items = blockItemRef.current;
    if (!container) return;

    const item = items[0];
    const containerWidth = container.clientWidth;
    const itemWidth = item.clientWidth;
    const itemOffset = item.offsetLeft;
    const centerPosition = itemOffset - containerWidth / 2 + itemWidth / 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "bottom 90%",
        end: "top 50%",
        markers: true,
        onEnter: () => {
          setInitVideo(true);
        },
        once: true,
      },
    });
    tl.to(blockItemRef, {
      onStart: () => {
        gsap.to(container, {
          x: -centerPosition,
          ease: "power1",
        });
      },
    });
    // enfocar el primer item:
    // if (initVideo) return;
    // const centerItem = () => {
    //   gsap.to(container, {
    //     x: -centerPosition,
    //     ease: "power1",
    //   });
    // };
    // centerItem();
    // const handleResize = () => {
    //   centerItem();
    // };
    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  //   iniciar los videos
  useEffect(() => {
    if (!initVideo) return;
    console.log("activo secuencia de videos");
    const currentVideo = videoRef.current[currentVideoIndex];
    const reproduccionVideo = () => {
      console.log("reproducioendo", currentVideoIndex);
      if (currentVideo) {
        currentVideo.play();
      }
      currentVideo?.addEventListener("ended", handleIndexVideo);
    };
    const handleIndexVideo = () => {
      if (currentVideoIndex < hightlightsSlides.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    };
    reproduccionVideo();
    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("ended", handleIndexVideo);
      }
    };
  }, [initVideo, currentVideoIndex]);

  //   posicionamiento de los items
  useEffect(() => {
    if (!(currentVideoIndex > 0)) return;
    console.log("hola video", currentVideoIndex);
    const container = containerRef.current;
    const items = blockItemRef.current;
    if (!container) return;

    const item = items[currentVideoIndex];
    const containerWidth = container.clientWidth;
    const itemWidth = item.clientWidth;
    const itemOffset = item.offsetLeft;
    const centerPosition = itemOffset - containerWidth / 2 + itemWidth / 2 + 30;
    gsap.to(container, {
      x: -centerPosition,
      ease: "power1",
    });
  }, [currentVideoIndex]);

  //   linea de tiempo
  useEffect(() => {
    const espacioBol = espacioBolRef;
    const cargadorBol = cargadorBolRef;
    const duracionVideo = [4, 5, 2, 3.63];

    if (!initVideo) return;
    const tl = gsap.timeline();
    hightlightsSlides.forEach((item, index) => {
      const videoDuration = item.videoDuration;
      tl.to(espacioBol.current[index], {
        duration: videoDuration,
        onStart: () => {
          gsap.to(espacioBol.current[index], {
            width: "70px",
            duration: 0.2,
          });
          gsap.to(cargadorBol.current[index], {
            width: "70px",
            duration: videoDuration,
          });
        },
        onComplete: () => {
          gsap.to(espacioBol.current[index], {
            width: "10px",
            duration: 0.1,
          });
          gsap.to(cargadorBol.current[index], {
            width: "10px",
            duration: 0.1,
          });
        },
      });
    });
  }, [initVideo]);

  const handleVideoStatus = () => {
    // arreglar el reset
    // setCurrentVideoIndex(0);
    // setInitVideo(false);
    console.log("button");
  };

  return (
    <>
      {/* ocupara el 100vw */}
      <div
        style={{
          display: "flex",
          // overflow: "auto"
        }}
        ref={containerRef}
      >
        {/* sera el slider que contentra los items hiidden */}
        <div
          //   ref={containerRef}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {hightlightsSlides.map((list, index) => (
            <div
              style={{
                margin: "0 60px 0 0",
                // backgroundColor: "yellow",
              }}
              key={list.id}
              className="video-carousel_container"
              ref={(el) => {
                blockItemRef.current[index] = el!;
              }}
            >
              <div
                // className="sm:pr-20 pr-10"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                }}
              >
                <video
                  id="video"
                  //   autoPlay
                  playsInline={true}
                  muted
                  preload="auto"
                  key={list.video}
                  ref={(el) => {
                    videoRef.current[index] = el;
                  }}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/* texto */}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="cajaContent"
        className="w-max m-auto relative flex-center my-6 py-4 px-7 bg-gray-300 backdrop-blur rounded-full"
      >
        {hightlightsSlides.map((_, index) => (
          <span
            className="maxContent mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            style={{ width: "10px", height: "10px" }}
            key={index}
            ref={(el) => {
              espacioBolRef.current[index] = el;
            }}
          >
            <span
              className="absolute h-full rounded-full"
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
              }}
              ref={(el) => {
                cargadorBolRef.current[index] = el;
              }}
            />
          </span>
        ))}
        <div style={{ padding: "1rem" }}>
          <button onClick={handleVideoStatus}>hola</button>
        </div>
      </div>
    </>
  );
}
