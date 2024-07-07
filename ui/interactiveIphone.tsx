"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IphoneModel } from "./iphoneModel";
import { Suspense } from "react";
import Lights from "./lights";

export default function InteractiveIphone() {
  return (
    // <Canvas camera={{ position: [0, 0, 0.2] }}>
    <Canvas>
      <ambientLight intensity={0.2} />
      <Lights />

      <Suspense fallback={null}>
        <IphoneModel scale={[30, 30, 30]} position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
