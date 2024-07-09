"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IphoneModel } from "./iphoneModel";
import { Suspense, useEffect } from "react";
import Lights from "./lights";
import { StaticImageData } from "next/image";
import Loader from "./loader";
type ModelState = {
  title: string;
  color: string[];
  img: StaticImageData;
};

type InteractiveIphoneProps = {
  scaleIphone?: [number, number, number];
  size: string;
  index: number;
  model: ModelState;
};
export default function InteractiveIphone({
  scaleIphone,
  model,
  size,
  index,
}: InteractiveIphoneProps) {
  const rotate =
    (size === "small" && index === 0) || (size === "large" && index === 1);

  return (
    <Canvas style={{ minWidth: "100%" }}>
      <ambientLight intensity={0.2} />
      <Lights />
      <Suspense fallback={<Loader />}>
        <IphoneModel
          model={model}
          scale={scaleIphone}
          position={[0, 0, 0]}
          rotate={rotate}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
