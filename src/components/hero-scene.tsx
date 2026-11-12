"use client";

import { useEffect, useRef } from "react";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vGlow;
  void main() {
    vec3 p = position;
    float wave = sin(p.x * 2.2 + uTime * 0.8) * cos(p.y * 2.0 + uTime * 0.6) * sin(p.z * 1.8 + uTime * 0.5);
    float pull = dot(normalize(p.xy), uMouse) * 0.12;
    p += normal * (wave * 0.22 + pull);
    vGlow = smoothstep(-0.2, 0.25, wave);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.4 + vGlow * 2.2) * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 base = vec3(0.55, 0.54, 0.5);
    vec3 neon = vec3(0.78, 1.0, 0.24);
    gl_FragColor = vec4(mix(base, neon, vGlow), (1.0 - d * 2.0) * (0.22 + vGlow * 0.5));
  }
`;

// A breathing point-cloud sphere that leans toward the pointer.
// Pauses when off screen or in a background tab; renders one still frame for reduced motion.
export function HeroScene({ className = "" }: { className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;
    // three.js is loaded after the page is interactive, so it never blocks the first paint.
    import("three").then((THREE) => {
      if (!cancelled) cleanup = start(THREE, mount.current!);
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={mount} aria-hidden className={className} />;
}

function start(THREE: typeof import("three"), el: HTMLDivElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer: import("three").WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  } catch {
    return () => {}; // no WebGL: the page still works, just without the scene
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.z = 4.2;

  const geometry = new THREE.IcosahedronGeometry(1.3, 48);
  const uniforms = { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } };
  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = el;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  const target = new THREE.Vector2();
  const onMove = (e: PointerEvent) => target.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  window.addEventListener("pointermove", onMove);

  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(el);

  const t0 = performance.now();
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const t = (performance.now() - t0) / 1000;
    uniforms.uTime.value = t;
    uniforms.uMouse.value.lerp(target, 0.05);
    points.rotation.y = t * 0.08 + uniforms.uMouse.value.x * 0.3;
    points.rotation.x = uniforms.uMouse.value.y * 0.2;
    renderer.render(scene, camera);
  };
  if (reduced) {
    uniforms.uTime.value = 2;
    renderer.render(scene, camera);
  } else tick();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    el.removeChild(renderer.domElement);
  };
}
