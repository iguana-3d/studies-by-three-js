import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import img from './logo.jpg';

const WaveShaderMaterial = shaderMaterial(
   //uniform
   {
      uTime: 0,
      uColor: new THREE.Color(0.0, 0.0, 0.0),
      uTexture: new THREE.Texture(),
   },
   //vertex shader
   glsl`
      precision mediump float;

      varying vec2 vUv;

      uniform float uTime;

      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

      void main() {
         vUv = uv;

         vec3 pos = position;
         float noiseFreq = 1.5;
         float noiseAmp = 0.25;
         vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
         pos.z += snoise3(noisePos) * noiseAmp;

         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
   `,
   //Fragment shader
   glsl`
   precision mediump float;

   uniform vec3 uColor;
   uniform float uTime;
   uniform sampler2D uTexture;

   varying vec2 vUv;

   void main() {
      vec3 texture = texture2D(uTexture, vUv).rgb;
      // gl_FragColor = vec4(sin(vUv.x + uTime) * uColor, 1.0);
      gl_FragColor = vec4(texture, 1.0);
   }`
);

extend({ WaveShaderMaterial });

const Wave = () => {
   const wave = useRef();

   useFrame(({clock}) => (wave.current.uTime = clock.getElapsedTime()));

   const [image] = useLoader(THREE.TextureLoader, [img]);

   return (
      <mesh>
         <planeBufferGeometry args={[0.4, 0.6, 16, 16]} />
         <waveShaderMaterial uColor="hotpink" ref={wave} uTexture={image} />
      </mesh>
   );
}

function Scene() {
   return (
      <Canvas camera={{ fov: 12, position: [0, 0, 5] }}>
         <Suspense fallback={null}>
            <Wave />
         </Suspense>
      </Canvas>
   );
}

export default function Three02() {
   return (
      <Scene />
   );
}