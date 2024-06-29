"use client";
import { hightlightsSlides } from "@/constants";
import { useRef } from "react";

export default function VideoCarouselV2() {
  const espacioBolRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cargadorBolRef = useRef<(HTMLSpanElement | null)[]>([]);

  const sliderContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ocupara el 100vw */}
      <div style={{ display: "flex" }}>
        {/* sera el slider que contentra los items hiidden */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {hightlightsSlides.map((list, index) => (
            <div key={list.id} className="video-carousel_container">
              <div
                className="sm:pr-20 pr-10"
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
                  autoPlay
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
        className="w-max m-auto relative flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full"
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
              className="bolitaItem absolute h-full rounded-full"
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
      </div>
    </>
  );
}
