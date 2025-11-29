import React, { useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform vec3 uWaveColor;
  uniform float uColorNum;
  uniform float uPixelSize;
  uniform float uMouseRadius;
  uniform bool uEnableMouse;

  varying vec2 vUv;

  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    // Pixelation logic
    vec2 grid = uResolution / max(uPixelSize, 1.0);
    vec2 pixelUV = floor(vUv * grid) / grid;
    
    // Aspect ratio correction for wave shape
    vec2 aspectUV = pixelUV;
    aspectUV.x *= uResolution.x / uResolution.y;

    // Mouse interaction
    float mouseDist = 0.0;
    if (uEnableMouse) {
        vec2 mouseAspect = uMouse;
        mouseAspect.x *= uResolution.x / uResolution.y;
        
        float d = distance(aspectUV, mouseAspect);
        if (d < uMouseRadius) {
            mouseDist = smoothstep(uMouseRadius, 0.0, d);
        }
    }

    // Wave generation
    float t = uTime * uWaveSpeed;
    float wave = sin(aspectUV.x * uWaveFrequency + t) * cos(aspectUV.y * uWaveFrequency + t);
    
    // Combine wave and mouse
    float value = wave * uWaveAmplitude + mouseDist * 0.5;
    
    // Base color
    vec3 color = uWaveColor + value;

    // Dithering (Noise)
    // Use static noise to avoid high-frequency flickering
    float noise = random(pixelUV);
    
    // Apply noise to color before quantization
    // Reduced multiplier to 0.02 for a subtle, smoother look
    color += (noise - 0.5) * (0.02 / uColorNum);

    // Quantization (Color limiting)
    color = floor(color * uColorNum) / uColorNum;

    gl_FragColor = vec4(color, 1.0);
  }
`;

class DitherMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uWaveSpeed: { value: 0.05 },
        uWaveFrequency: { value: 3 },
        uWaveAmplitude: { value: 0.3 },
        uWaveColor: { value: new THREE.Color(0.5, 0.5, 0.5) },
        uColorNum: { value: 4 },
        uPixelSize: { value: 2 },
        uMouseRadius: { value: 0.3 },
        uEnableMouse: { value: true },
      },
    });
  }
}

extend({ DitherMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    ditherMaterial: ThreeElement<typeof DitherMaterial>;
  }
}

export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

const DitherScene: React.FC<DitherProps> = ({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
}) => {
  const materialRef = useRef<DitherMaterial>(null);
  const { size, pointer } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      if (!disableAnimation) {
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      }

      materialRef.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );

      if (enableMouseInteraction) {
        const u = (pointer.x + 1) / 2;
        const v = (pointer.y + 1) / 2;
        materialRef.current.uniforms.uMouse.value.set(u, v);
      }

      materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
      materialRef.current.uniforms.uWaveFrequency.value = waveFrequency;
      materialRef.current.uniforms.uWaveAmplitude.value = waveAmplitude;
      materialRef.current.uniforms.uWaveColor.value.set(...waveColor);
      materialRef.current.uniforms.uColorNum.value = colorNum;
      materialRef.current.uniforms.uPixelSize.value = pixelSize;
      materialRef.current.uniforms.uMouseRadius.value = mouseRadius;
      materialRef.current.uniforms.uEnableMouse.value = enableMouseInteraction;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <ditherMaterial ref={materialRef} />
    </mesh>
  );
};

const Dither: React.FC<DitherProps> = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
        <DitherScene {...props} />
      </Canvas>
    </div>
  );
};

export default Dither;
