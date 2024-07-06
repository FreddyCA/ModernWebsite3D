"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ModelV2 } from "./ModelV2";

export default function ModelViewV2() {
  return (
    <>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight color={"white"} position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <ModelV2 />
          <Environment preset="sunset" background />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}
