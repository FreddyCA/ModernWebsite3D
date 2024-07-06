'use client'
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./Poimandres.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};


export default function ModelosGLTF() {
  return (
    <Canvas>
    <Suspense fallback={null}>
      <Model />
      <OrbitControls />
      <Environment preset="warehouse" background />
    </Suspense>
  </Canvas>
  );
}
