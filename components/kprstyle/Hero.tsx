// "use client";

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";

// export const Hero = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     // --- THREE.JS SCENE SETUP ---
//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     // --- UNIFORMS FOR SHADER ---
//     const uniforms = {
//       u_resolution: {
//         value: new THREE.Vector2(container.clientWidth, container.clientHeight),
//       },
//       u_image_resolution: {
//         value: new THREE.Vector2(1, 1), // Updated when texture loads
//       },
//       u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
//       u_mouse_dir: { value: new THREE.Vector2(0.0, 0.0) },
//       u_intensity: { value: 0.0 }, // Decays to 0 when mouse stops moving
//       u_texture: { value: null as THREE.Texture | null },
//     };

//     // --- DYNAMIC TEXTURE LOADER (DESKTOP vs MOBILE) ---
//     const textureLoader = new THREE.TextureLoader();
//     let activeImagePath = "";

//     const loadResponsiveTexture = () => {
//       const isMobile = window.innerWidth < 768;
//       const targetPath = isMobile ? "/me1.jpg" : "/me24.jpg";

//       if (activeImagePath === targetPath) return;

//       activeImagePath = targetPath;
//       textureLoader.load(targetPath, (tex) => {
//         tex.minFilter = THREE.LinearFilter;
//         if (uniforms.u_texture.value) {
//           uniforms.u_texture.value.dispose();
//         }
//         uniforms.u_texture.value = tex;
        
//         // Pass natural image aspect ratio to uniforms
//         if (tex.image) {
//           uniforms.u_image_resolution.value.set(
//             tex.image.width,
//             tex.image.height
//           );
//         }
//       });
//     };

//     loadResponsiveTexture();

//     const material = new THREE.ShaderMaterial({
//       uniforms,
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         uniform sampler2D u_texture;
//         uniform vec2 u_resolution;
//         uniform vec2 u_image_resolution;
//         uniform vec2 u_mouse;
//         uniform vec2 u_mouse_dir;
//         uniform float u_intensity;
//         varying vec2 vUv;

//         // Aspect Ratio Correction (Simulates object-fit: cover)
//         vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imageRes) {
//           vec2 s = screenRes;
//           vec2 i = imageRes;
//           float rs = s.x / s.y;
//           float ri = i.x / i.y;
//           vec2 newUv = uv;
          
//           if (rs > ri) {
//             newUv.y = (uv.y - 0.5) * (ri / rs) + 0.5;
//           } else {
//             newUv.x = (uv.x - 0.5) * (rs / ri) + 0.5;
//           }
//           return newUv;
//         }

//         void main() {
//           vec2 st = gl_FragCoord.xy / u_resolution;
          
//           // Distance from cursor
//           float dist = distance(st, u_mouse);
          
//           // Concentric ripple wave active strictly within cursor radius
//           float waveRadius = 0.35;
//           float wave = sin(dist * 35.0) * smoothstep(waveRadius, 0.0, dist);
          
//           // Directional displacement aligned with mouse movement vector
//           vec2 directionalPush = u_mouse_dir * smoothstep(0.25, 0.0, dist) * 0.04;
          
//           // Combine directional displacement and radial ripples scaled by movement intensity
//           vec2 distortion = (vec2(wave * 0.015) + directionalPush) * u_intensity;
          
//           vec2 distortedUv = vUv - distortion;

//           // Apply cover crop scaling to prevent stretching on mobile aspect ratios
//           vec2 coverUv = getCoverUv(distortedUv, u_resolution, u_image_resolution);

//           vec4 color = texture2D(u_texture, coverUv);

//           gl_FragColor = color;
//         }
//       `,
//     });

//     const geometry = new THREE.PlaneGeometry(2, 2);
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // --- MOUSE TRACKING ---
//     const targetMouse = { x: 0.5, y: 0.5 };
//     const smoothMouse = { x: 0.5, y: 0.5 };
//     const smoothDir = { x: 0.0, y: 0.0 };

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = container.getBoundingClientRect();
//       targetMouse.x = (e.clientX - rect.left) / rect.width;
//       targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     // --- RESIZE HANDLER ---
//     const handleResize = () => {
//       if (!container) return;
//       const width = container.clientWidth;
//       const height = container.clientHeight;
//       renderer.setSize(width, height);
//       uniforms.u_resolution.value.set(width, height);

//       loadResponsiveTexture();
//     };

//     window.addEventListener("resize", handleResize);

//     // --- ANIMATION LOOP ---
//     let animationFrameId: number;
//     const POSITION_LERP = 0.15;
//     const DIR_LERP = 0.2;
//     const MOVE_EPSILON = 0.0008;

//     const animate = () => {
//       const prevX = smoothMouse.x;
//       const prevY = smoothMouse.y;

//       smoothMouse.x += (targetMouse.x - smoothMouse.x) * POSITION_LERP;
//       smoothMouse.y += (targetMouse.y - smoothMouse.y) * POSITION_LERP;

//       const dx = smoothMouse.x - prevX;
//       const dy = smoothMouse.y - prevY;
//       const speed = Math.sqrt(dx * dx + dy * dy);

//       if (speed > MOVE_EPSILON) {
//         const nx = dx / speed;
//         const ny = dy / speed;

//         smoothDir.x += (nx - smoothDir.x) * DIR_LERP;
//         smoothDir.y += (ny - smoothDir.y) * DIR_LERP;

//         const gain = Math.min(speed * 40, 1.0);
//         uniforms.u_intensity.value = Math.min(
//           uniforms.u_intensity.value + gain * 0.15,
//           1.0
//         );
//       }

//       uniforms.u_mouse.value.set(smoothMouse.x, smoothMouse.y);
//       uniforms.u_mouse_dir.value.set(smoothDir.x, smoothDir.y);

//       uniforms.u_intensity.value *= 0.94;
//       if (uniforms.u_intensity.value < 0.001) {
//         uniforms.u_intensity.value = 0.0;
//       }

//       renderer.render(scene, camera);
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     // --- CLEANUP ---
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(animationFrameId);
//       if (container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//       if (uniforms.u_texture.value) {
//         uniforms.u_texture.value.dispose();
//       }
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <section className="relative w-screen h-screen bg-black text-white overflow-hidden p-0 m-0 font-mono select-none">
//       {/* FULL-SCREEN RIPPLE CANVAS CONTAINER */}
//       <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

//       {/* OVERLAY HUD ELEMENTS */}

//       {/* Main Full-Bleed Name */}
//       <div className="absolute bottom-10 left-6 sm:left-12 right-6 z-10 pointer-events-none select-none">
//         <h1 className="font-extrabold text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] tracking-tighter uppercase leading-[0.78] text-white">
//           LUKWAGO <br />
//           JOEL.
//         </h1>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 right-8 sm:right-14 z-10 font-medium text-xs tracking-widest text-white/70 flex items-center gap-2.5 pointer-events-none">
//         <span>SCROLL</span>
//         <span className="animate-bounce text-base">↓</span>
//       </div>
//     </section>
//   );
// };

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useTransform, MotionValue } from "framer-motion";

interface HeroProps {
  progress: MotionValue<number>;
}

export const Hero = ({ progress }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hero fully shrinks/fades in the FIRST HALF of the shared timeline
  const scale = useTransform(progress, [0, 0.45], [1, 0.15]);
  const borderRadius = useTransform(progress, [0, 0.3], ["0px", "48px"]);
  const opacity = useTransform(progress, [0.3, 0.5], [1, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_image_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_mouse_dir: { value: new THREE.Vector2(0.0, 0.0) },
      u_intensity: { value: 0.0 },
      u_texture: { value: null as THREE.Texture | null },
    };

    const textureLoader = new THREE.TextureLoader();
    let activeImagePath = "";

    const loadResponsiveTexture = () => {
      const isMobile = window.innerWidth < 768;
      const targetPath = isMobile ? "/me1.jpg" : "/me24.jpg";
      if (activeImagePath === targetPath) return;
      activeImagePath = targetPath;
      textureLoader.load(targetPath, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        if (uniforms.u_texture.value) uniforms.u_texture.value.dispose();
        uniforms.u_texture.value = tex;
        if (tex.image) {
          uniforms.u_image_resolution.value.set(tex.image.width, tex.image.height);
        }
      });
    };

    loadResponsiveTexture();

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D u_texture;
        uniform vec2 u_resolution;
        uniform vec2 u_image_resolution;
        uniform vec2 u_mouse;
        uniform vec2 u_mouse_dir;
        uniform float u_intensity;
        varying vec2 vUv;

        vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imageRes) {
          vec2 s = screenRes;
          vec2 i = imageRes;
          float rs = s.x / s.y;
          float ri = i.x / i.y;
          vec2 newUv = uv;
          if (rs > ri) {
            newUv.y = (uv.y - 0.5) * (ri / rs) + 0.5;
          } else {
            newUv.x = (uv.x - 0.5) * (rs / ri) + 0.5;
          }
          return newUv;
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution;
          float dist = distance(st, u_mouse);
          float waveRadius = 0.35;
          float wave = sin(dist * 35.0) * smoothstep(waveRadius, 0.0, dist);
          vec2 directionalPush = u_mouse_dir * smoothstep(0.25, 0.0, dist) * 0.04;
          vec2 distortion = (vec2(wave * 0.015) + directionalPush) * u_intensity;
          vec2 distortedUv = vUv - distortion;
          vec2 coverUv = getCoverUv(distortedUv, u_resolution, u_image_resolution);
          gl_FragColor = texture2D(u_texture, coverUv);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const smoothDir = { x: 0.0, y: 0.0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(width, height);
      loadResponsiveTexture();
    };
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const POSITION_LERP = 0.15;
    const DIR_LERP = 0.2;
    const MOVE_EPSILON = 0.0008;

    const animate = () => {
      const prevX = smoothMouse.x;
      const prevY = smoothMouse.y;
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * POSITION_LERP;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * POSITION_LERP;

      const dx = smoothMouse.x - prevX;
      const dy = smoothMouse.y - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > MOVE_EPSILON) {
        const nx = dx / speed;
        const ny = dy / speed;
        smoothDir.x += (nx - smoothDir.x) * DIR_LERP;
        smoothDir.y += (ny - smoothDir.y) * DIR_LERP;
        const gain = Math.min(speed * 40, 1.0);
        uniforms.u_intensity.value = Math.min(uniforms.u_intensity.value + gain * 0.15, 1.0);
      }

      uniforms.u_mouse.value.set(smoothMouse.x, smoothMouse.y);
      uniforms.u_mouse_dir.value.set(smoothDir.x, smoothDir.y);
      uniforms.u_intensity.value *= 0.94;
      if (uniforms.u_intensity.value < 0.001) uniforms.u_intensity.value = 0.0;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (uniforms.u_texture.value) uniforms.u_texture.value.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      style={{ scale, borderRadius, opacity }}
      className="absolute inset-0 z-10 w-full h-full bg-black overflow-hidden font-mono select-none border border-white/10 shadow-2xl origin-center will-change-transform"
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

      <div className="absolute bottom-10 left-6 sm:left-12 right-6 z-10 pointer-events-none select-none">
        <h1 className="font-extrabold text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw] tracking-tighter uppercase leading-[0.78] text-white">
          LUKWAGO <br />
          JOEL.
        </h1>
      </div>

      <div className="absolute bottom-8 right-8 sm:right-14 z-10 font-medium text-xs tracking-widest text-white/70 flex items-center gap-2.5 pointer-events-none">
        <span>SCROLL</span>
        <span className="animate-bounce text-base">↓</span>
      </div>
    </motion.div>
  );
};