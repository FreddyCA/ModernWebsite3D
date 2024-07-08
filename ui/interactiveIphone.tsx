"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IphoneModel } from "./iphoneModel";
import { Suspense, useEffect } from "react";
import Lights from "./lights";

type InteractiveIphoneProps = {
  scaleIphone?: [number, number, number];
  index: number;
  size: string;
};
export default function InteractiveIphone({
  scaleIphone,
  index,
  size,
}: InteractiveIphoneProps) {
  return (
    <Canvas style={{ minWidth: "100%" }}>
      <ambientLight intensity={0.2} />
      <Lights />
      {/* completar el otro iphone mas y como cambiar colores */}

      <Suspense fallback={null}>
        <IphoneModel scale={scaleIphone} position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
