import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function Geometric() {
   const mesh = useRef();

   useFrame(() => (mesh.current.rotation.x += 0.01));
   useFrame(() => (mesh.current.rotation.y += 0.005));

   return (
      <mesh ref={mesh}>
         <boxBufferGeometry attach="geometry" />
         <meshLambertMaterial attach="material" color="hotpink" />
      </mesh>
   )
}

export default function Three01() {
   return (
      <div style={{width: "100%", height: "100vh", margin: "0 auto"}}>
         <Canvas>
            <OrbitControls />
            <Stars />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Geometric position={[-1.2, 0, 0]} />
         </Canvas>
      </div>
   )
}