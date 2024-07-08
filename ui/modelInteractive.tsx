"use client";
import { models, sizes } from "@/constants";
import { yellowImg } from "@/lib";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import InteractiveIphone from "./interactiveIphone";

export default function ModelInteractive() {
  // animacion #heading title
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to("#heading", {
      opacity: 1,
      y: 0,
    });
    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const [size, setSize] = useState<string>("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const containerIphoneRef = useRef<HTMLDivElement>(null);

  const [initSettings, setInitSettings] = useState(false);

  useEffect(() => {
    if (!initSettings) return;

    if (!containerIphoneRef.current) return;
    const containerIphones = containerIphoneRef.current;
    const widthFirstChild = containerIphones?.children[0].clientWidth * -1;

    if (size === "large") {
      gsap.to(containerIphones.children, {
        x: widthFirstChild,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(containerIphones.children[0], {
        duration: 1,
        opacity: 0,
        ease: "power1.in",
      });
      gsap.to(containerIphones.children[1], {
        duration: 1,
        opacity: 1,
        ease: "power1.inOut",
      });
    }
    if (size === "small") {
      gsap.to(containerIphones.children, {
        x: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(containerIphones.children[0], {
        duration: 1,
        opacity: 1,
        ease: "power1.inOut",
      });
      gsap.to(containerIphones.children[1], {
        duration: 1,
        opacity: 0,
        ease: "power1.in",
      });
    }
  }, [size, initSettings]);

  return (
    <section
      className="common-padding"
      style={{
        height: "100%",
        border: "5px solid blue",
        margin: "0 auto",
      }}
    >
      <div ref={containerRef} className="screen-max-width">
        <h1 id="heading" className="section-heading mb-4">
          Take a closer look.s
        </h1>

        <div
          style={{
            overflow: "hidden",
            position: "relative",
            display: "flex",
          }}
          className="h-[75vh] md:h-[80vh] md:w-full w-[80%] mx-auto "
          ref={containerIphoneRef}
        >
          <InteractiveIphone
            model={model}
            scaleIphone={[30, 30, 30]}
            index={1}
            size={size}
          />
          <InteractiveIphone
            model={model}
            scaleIphone={[35, 35, 35]}
            index={2}
            size={size}
          />
        </div>

        {/* buttons interactive */}
        <div className="mx-auto w-full">
          <p className="text-sm font-light text-center mb-5">{model.title}</p>
          <div className="flex-center">
            <ul className="color-container">
              {models.map((item, i) => (
                <li
                  key={i}
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setModel(item)}
                />
              ))}
            </ul>

            <button className="size-btn-container">
              {sizes.map(({ label, value }) => (
                <span
                  key={label}
                  className="size-btn"
                  style={{
                    backgroundColor: size === value ? "white" : "transparent",
                    color: size === value ? "black" : "white",
                  }}
                  onClick={() => {
                    setSize(value);
                    if (!initSettings) {
                      setInitSettings(true);
                    }
                  }}
                >
                  {label}
                </span>
              ))}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
