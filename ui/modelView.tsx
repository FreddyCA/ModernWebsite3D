import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./lights";
import Loader from "./loader";

import { StaticImageData } from "next/image";
import Iphone from "./iphone";
import { Suspense } from "react";
// import { Iphone } from "./iphone";

interface ModelViewProps {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.MutableRefObject<any>; // Ajusta el tipo según el tipo de control que estés usando
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  size: string;
  item: {
    title: string;
    color: string[];
    img: string | StaticImageData;
  };
}

export default function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}: ModelViewProps) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0 ,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      /> 

      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large`} position={[0, 0 ,0]}>
        <Suspense fallback={<Loader />}>
          <Iphone 
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}
