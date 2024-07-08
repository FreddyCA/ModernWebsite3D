"use client";
import {
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IphoneModel } from "./iphoneModel";
import { Suspense, useEffect } from "react";
import Lights from "./lights";
import { StaticImageData } from "next/image";
type ModelState = {
  title: string;
  color: string[];
  img: StaticImageData;
};

type InteractiveIphoneProps = {
  scaleIphone?: [number, number, number];
  index: number;
  size: string;
  model: ModelState;
};
export default function InteractiveIphone({
  scaleIphone,
  index,
  size,
  model,
}: InteractiveIphoneProps) {

  return (
    <Canvas style={{ minWidth: "100%" }}>
      <ambientLight intensity={0.2} />
      <Lights />
      <Suspense fallback={null}>
        <IphoneModel model={model} scale={scaleIphone} position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
