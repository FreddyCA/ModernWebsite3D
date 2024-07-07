"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IphoneModel } from "./iphoneModel";
import { Suspense } from "react";

export default function InteractiveIphone() {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <directionalLight color={"white"} position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <IphoneModel />
        <Environment preset="sunset" background />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
