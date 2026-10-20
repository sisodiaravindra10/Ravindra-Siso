// Shared vertex: bends the plane with scroll velocity, swells on hover.
export const vertex = /* glsl */ `
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uVelocity;
uniform float uHover;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  float bend = sin(uv.x * 3.14159265);
  p.y += bend * uVelocity * 0.04;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const common = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uPlane;
uniform float uTime;
uniform float uHover;
uniform float uVelocity;
uniform float uReveal;
uniform vec2 uMouse;
uniform vec2 uSun;     // x: -1 (east, left) .. 1 (west, right); y: altitude 0 (horizon) .. 1 (noon)
uniform float uWarm;   // 0 cool .. 1 warm (dawn and dusk)
uniform float uDpr;
uniform float uLoaded;  // 0 until the texture is on the GPU
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
// 4x4 Bayer threshold, 0..1, branch-free. The jali: light gets in through an ordered lattice.
float m2(vec2 q) { return mod(q.x * 2.0 + q.y * 3.0, 4.0); }
float bayer(vec2 c) {
  vec2 p = floor(c);
  float v = 4.0 * m2(mod(p, 2.0)) + m2(mod(floor(p * 0.5), 2.0));
  return (v + 0.5) / 16.0;
}
// Light from the sun's side: 1 on the lit edge of the plane, 0 on the far edge, softened by altitude.
float lit(vec2 uv) {
  float side = (uv.x - 0.5) * sign(uSun.x) * -1.0;        // sun left → left edge lit
  float spread = mix(0.9, 0.25, uSun.y);                  // low sun: strong gradient; noon: flat
  return clamp(0.5 + side * spread * abs(uSun.x) + (uv.y - 0.5) * 0.15 * (1.0 - uSun.y), 0.0, 1.0);
}
// Reveal: the lattice fills from the lit side, dot by dot (ordered), ending fully clear.
float revealMask(vec2 uv, vec2 cell) {
  float along = uSun.x < 0.0 ? uv.x : 1.0 - uv.x;        // distance from the lit edge
  float edge = uReveal * 1.35 - 0.2;
  float d = edge - along;                                 // > 0 inside the revealed region
  float t = bayer(cell);                                  // ordered threshold
  return smoothstep(0.0, 0.02, d + (t - 0.5) * 0.3 * (1.0 - uReveal));
}`;

// Image plane: object-fit cover in-shader. uDither 1: sun-lit ordered dither in duotone, the
// lattice opens around the pointer (or on hover) to show the photo. uDither 0: the clear photo
// with a slight warm cast from the sun and the ordered reveal.
export const imageFragment = /* glsl */ `
${common}
uniform sampler2D tMap;
uniform vec2 uImage;
uniform float uDither;
uniform vec3 uInk;
uniform vec3 uPaper;
vec2 cover(vec2 uv) {
  vec2 r = vec2(min((uPlane.x / uPlane.y) / (uImage.x / uImage.y), 1.0), min((uPlane.y / uPlane.x) / (uImage.y / uImage.x), 1.0));
  return uv * r + (1.0 - r) * 0.5;
}
void main() {
  vec2 uv = vUv;
  vec2 px = vUv * uPlane;                                   // CSS pixels
  float cellPx = clamp(uPlane.x / 150.0, 2.0, 3.2);         // the lattice pitch follows the plane: a small portrait keeps its face
  vec2 cell = floor(px / cellPx);
  vec2 t = cover(uv);
  vec3 col = texture2D(tMap, t).rgb;
  float L = dot(col, vec3(0.299, 0.587, 0.114));
  float light = lit(uv);
  // the lattice opens where the pointer is (a hand in front of a jali)
  float aspect = uPlane.x / uPlane.y;
  float dM = distance(vec2(uv.x * aspect, uv.y), vec2(uMouse.x * aspect, uMouse.y));
  float open = smoothstep(0.42, 0.05, dM) * uHover;
  // ordered dither in duotone, lit: the far side loses dots. The light breathes a little at rest.
  float breath = sin(uTime * 0.45 + uv.y * 2.5) * 0.06;
  float lum = clamp(L * mix(0.55, 1.25, light + breath) + (light - 0.5) * 0.25, 0.0, 1.0);
  float dot1 = step(bayer(cell), lum);
  vec3 dith = mix(uInk, uPaper, dot1);
  // a warm cast on the clear photo at dawn and dusk, from the sun's side
  vec3 warmCol = col * mix(vec3(1.0), vec3(1.08, 0.98, 0.86), uWarm * light * 0.9);
  warmCol *= mix(0.96, 1.0, light);
  float d = uDither * (1.0 - open);
  vec3 outc = mix(warmCol, dith, d);
  float m = revealMask(uv, cell) * uLoaded;
  gl_FragColor = vec4(outc, 1.0) * m;
}`;

// Procedural plane: seeded flowing field in the palette, dithered like everything else.
export const proceduralFragment = /* glsl */ `
${common}
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uSeed;
void main() {
  vec2 uv = vUv;
  vec2 px = vUv * uPlane;
  vec2 cell = floor(px / 3.0);
  vec2 p = uv * vec2(uPlane.x / uPlane.y, 1.0) * 1.6 + uSeed * 7.0;
  float t = uTime * 0.05;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float f = fbm(p + 2.5 * q + vec2(uVelocity * 0.02, 0.0));
  float light = lit(uv);
  float lum = clamp(f * mix(0.6, 1.3, light), 0.0, 1.0);
  float dot1 = step(bayer(cell), lum);
  vec3 col = mix(uC1, mix(uC2, uC3, smoothstep(0.5, 0.9, f)), dot1);
  gl_FragColor = vec4(col, 1.0) * revealMask(vUv, cell);
}`;
