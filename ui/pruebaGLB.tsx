"use client";
import { OrbitControls, Shadow, ShadowAlpha } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, MeshBasicMaterial } from "three";

const Box: React.FC<any> = (props) => {
  const meshRef = useRef<Mesh>();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    // mesh: contiene la geometria y el material para formar el espacio 3d
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/*boxGeometry args: ancho, largo, profundidad */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const PruebaGLB: React.FC = () => {
  return (
    // Canvas: representa la scena y configura luz y escena
    <Canvas>
      {/* ambientLigth: agrega las luces a nuestra scena */}
      <ambientLight intensity={1} />
      <directionalLight color={"white"} position={[0,0,5]}/>
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
};

export default PruebaGLB;
