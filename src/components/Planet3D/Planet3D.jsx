import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

const Sphere = ({ link }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(link));
  const ref = useRef();

  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(1, 1);

  useEffect(() => {
    ref.current.rotation.z = 20;
  }, []);

  // useFrame(() => {
  //   ref.current.rotation.y += (Math.random()/100);
  //   ref.current.rotation.x += (Math.random()/100);
  // });

  return (
    <mesh ref={ref}>
      <sphereBufferGeometry args={[2, 200, 200]} attach="geometry" />
      <meshBasicMaterial
        attach="material"
        color="#ffffff"
        map={texture}
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

export function Planet3D({ planetLink }) {
  return (
    <Canvas>
      <Sphere link={planetLink} />
    </Canvas>
  );
}
