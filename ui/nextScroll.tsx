"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const NextScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;
    const duracionVideo = [4, 5, 2, 3.63];

    if (container && items.length > 0) {
      const centerItem = (index: number) => {
        const item = items[index];
        const containerWidth = container.clientWidth;
        const itemWidth = item.clientWidth;
        const itemOffset = item.offsetLeft;
        // console.log("item offste", itemOffset);

        const centerPosition = itemOffset - containerWidth / 2 + itemWidth / 2;

        gsap.to(container, {
          scrollLeft: centerPosition,
          duration: 0.5,
          ease: "power2.inOut",
        });
      };

      // Center the current item on mount and on resize
      centerItem(currentIndex);

      const handleResize = () => {
        centerItem(currentIndex);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [currentIndex]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          position: "relative",
        }}
      >
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el!;
            }}
            style={{
              display: "inline-block",
              width: "200px",
              margin: "0 10px",
              backgroundColor: "lightblue",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setCurrentIndex(index)}
          >
            Item {index + 1}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setCurrentIndex((prev) => (prev + 1) % 10)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NextScroll;
