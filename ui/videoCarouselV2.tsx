"use client";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/lib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function VideoCarouselV2() {
  const espacioBolRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cargadorBolRef = useRef<(HTMLSpanElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement>(null); //contenedor mayor
  const blockItemRef = useRef<HTMLDivElement[]>([]); //contenedor de cada itemBlock
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]); //videos
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [initVideo, setInitVideo] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLastVideo, setIsLastVideo] = useState(false);

  console.log(initVideo);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const item = blockItemRef.current[0];
    if (!item) return;

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
    tl.to(container, {
      x: -centerPosition,
      ease: "power1",
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
      console.log("reproduciendo", currentVideoIndex);
      if (currentVideo) {
        currentVideo.play();
      }
      currentVideo?.addEventListener("ended", handleIndexVideo);
    };

    const handleIndexVideo = () => {
      if (currentVideoIndex < hightlightsSlides.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else {
        setIsLastVideo(true);
      }
    };

    if (!isPaused) {
      reproduccionVideo();
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("ended", handleIndexVideo);
      }
    };
  }, [initVideo, currentVideoIndex, isPaused]);

  // manejo de pausa del video
  const handlePauseResume = () => {
    setIsPaused((prevState) => {
      const newIsPaused = !prevState;
      const currentVideo = videoRef.current[currentVideoIndex];
      if (currentVideo) {
        if (newIsPaused) {
          currentVideo.pause();
        } else {
          currentVideo.play();
        }
      }
      return newIsPaused;
    });
  };

  // restableciendo los videos
  const handleRestart = () => {
    setCurrentVideoIndex(0);
    setIsPaused(false);
    setIsLastVideo(false);
    setInitVideo(true);

    const container = containerRef.current;
    const firstItem = blockItemRef.current[0];
    if (container && firstItem) {
      const containerWidth = container.clientWidth;
      const itemWidth = firstItem.clientWidth;
      const itemOffset = firstItem.offsetLeft;
      const centerPosition = itemOffset - containerWidth / 2 + itemWidth / 2;
      gsap.to(container, {
        x: -centerPosition,
        ease: "power1",
      });
    }

    // restableciendo la linea de tiempo del timeline
    if (tlEspacioRef.current && tlCargadorRef.current) {
      tlEspacioRef.current.restart(true);
      tlCargadorRef.current.restart(true);
    }
  };

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
  const tlEspacioRef = useRef<gsap.core.Timeline | null>(null);
  const tlCargadorRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!initVideo) return;

    const espacioBol = espacioBolRef.current;
    const cargadorBol = cargadorBolRef.current;

    // Crear timelines separados
    const tlEspacio = gsap.timeline({ paused: true });
    const tlCargador = gsap.timeline({ paused: true });

    hightlightsSlides.forEach((item, index) => {
      const durationVideo = item.videoDuration;

      // Animación para espacioBol
      tlEspacio.to(espacioBol[index], {
        width: "70px",
        duration: 0.2,
      });
      tlEspacio.to(espacioBol[index], {
        width: "10px",
        delay: durationVideo - 0.2,
        duration: 0.1,
      });

      // Animación para cargadorBol
      tlCargador.to(cargadorBol[index], {
        width: "70px",
        duration: durationVideo,
      });
      tlCargador.to(cargadorBol[index], {
        width: "10px",
        duration: 0.1,
      });

      // Añadir separación entre animaciones para sincronización
      tlEspacio.addLabel(`espacio-${index}`, `+=${durationVideo}`);
      tlCargador.addLabel(`cargador-${index}`, `+=${durationVideo}`);
    });

    tlEspacioRef.current = tlEspacio;
    tlCargadorRef.current = tlCargador;
    tlEspacio.play();
    tlCargador.play();
    return () => {
      tlEspacio.kill();
      tlCargador.kill();
    };
  }, [initVideo]);

  useEffect(() => {
    // manejo de pausas de las lineas de tiempo
    if (tlEspacioRef.current && tlCargadorRef.current) {
      if (isPaused) {
        tlEspacioRef.current.pause();
        tlCargadorRef.current.pause();
      } else {
        tlEspacioRef.current.resume();
        tlCargadorRef.current.resume();
      }
    }
  }, [isPaused]);

  return (
    <>
      {/* ocupara el 100vw */}
      <div
        style={{
          display: "flex",
        }}
        ref={containerRef}
      >
        {/* sera el slider que contentra los items hiidden */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {hightlightsSlides.map((list, index) => (
            <div
              style={{
                margin: "0 60px 0 0",
              }}
              key={list.id}
              className="video-carousel_container"
              ref={(el) => {
                blockItemRef.current[index] = el!;
              }}
            >
              <div
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
                backgroundColor: "rgba(30, 255, 0, 0.822)",
              }}
              ref={(el) => {
                cargadorBolRef.current[index] = el;
              }}
            />
          </span>
        ))}
        <div className="control-btn">
          {!isLastVideo ? (
            <button onClick={handlePauseResume}>
              {isPaused ? (
                <Image src={playImg} alt="Reanudar" />
              ) : (
                <Image src={pauseImg} alt="Pausar" />
              )}{" "}
            </button>
          ) : (
            <button onClick={handleRestart}>
              <Image src={replayImg} alt="" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
