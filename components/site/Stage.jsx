'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { readLook } from './TopBar';

const LOOKS = {
  monolit: { slab: 0x1a1a1a, rail: 0x2a2a2a, light: 0xffffff, dust: 0xffffff, fog: 0x000000, rails: false, filter: 'grayscale(1) contrast(1.12) brightness(1.1)' },
  atelye: { slab: 0x1c1712, rail: 0xb07445, light: 0xffd2a8, dust: 0xe8c39e, fog: 0x12100d, rails: true, filter: 'sepia(0.28) saturate(0.8) contrast(1.05)' },
};

// Portret: public/avatar.jpg. Yangi rasm kelganda shu faylni almashtirish kifoya.
const PORTRAIT = '/avatar.jpg';

function drawPortrait(img, filter) {
  const c = document.createElement('canvas');
  c.width = 800; c.height = 1280;
  const g = c.getContext('2d');
  g.fillStyle = '#141414';
  g.fillRect(0, 0, c.width, c.height);
  if (img) {
    const s = Math.max(c.width / img.width, c.height / img.height);
    const w = img.width * s, h = img.height * s;
    const x = (c.width - w) * 0.3, y = 0;
    g.filter = filter;
    g.drawImage(img, x, y, w, h);
    g.filter = 'none';
    const fade = g.createLinearGradient(0, c.height * 0.6, 0, c.height);
    fade.addColorStop(0, 'rgba(0,0,0,0)');
    fade.addColorStop(1, 'rgba(0,0,0,0.35)');
    g.fillStyle = fade;
    g.fillRect(0, 0, c.width, c.height);
  }
  return c;
}

export default function Stage({ label, hint }) {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return undefined;
    }
    if (fallbackRef.current) fallbackRef.current.hidden = true;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    let look = LOOKS[readLook()];
    let img = null;
    const tex = new THREE.CanvasTexture(drawPortrait(null, look.filter));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const side = new THREE.MeshStandardMaterial({ color: look.slab, metalness: 0.85, roughness: 0.32 });
    const front = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.6, metalness: 0.1, roughness: 0.65 });
    const slab = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.72, 0.2), [side, side, side, side, front, side]);
    const group = new THREE.Group();
    group.add(slab);
    const railMat = new THREE.MeshStandardMaterial({ color: look.rail, metalness: 0.3, roughness: 0.6 });
    const railGeo = new THREE.BoxGeometry(0.16, 2.3, 0.3);
    const r1 = new THREE.Mesh(railGeo, railMat); r1.position.x = -1.0;
    const r2 = new THREE.Mesh(railGeo, railMat); r2.position.x = 1.0;
    group.add(r1, r2);
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.PointLight(0xffffff, 40, 18, 2);
    key.position.set(2.5, 1.2, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(-4, 3, -3);
    scene.add(rim);

    const N = 1400;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pm = new THREE.PointsMaterial({ color: look.dust, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending });
    const dust = new THREE.Points(pg, pm);
    scene.add(dust);

    const apply = (L) => {
      look = L;
      side.color.setHex(L.slab); railMat.color.setHex(L.rail); key.color.setHex(L.light);
      pm.color.setHex(L.dust); scene.fog.color.setHex(L.fog);
      r1.visible = r2.visible = L.rails;
      tex.image = drawPortrait(img, L.filter);
      tex.needsUpdate = true;
      if (reduce) renderer.render(scene, camera);
    };
    apply(look);

    const image = new Image();
    image.onload = () => { img = image; apply(look); };
    image.src = PORTRAIT;

    const onLook = (e) => apply(LOOKS[e.detail] || LOOKS.monolit);
    window.addEventListener('rt-look', onLook);

    const mouse = { x: 0, y: 0 }, sm = { x: 0, y: 0 }, scrollRot = { v: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('pointermove', onMove);

    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduce) renderer.render(scene, camera);
    };
    resize();
    window.addEventListener('resize', resize);

    let visible = true;
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; });
    io.observe(stage);

    gsap.registerPlugin(ScrollTrigger);
    const st = reduce ? null : gsap.to(scrollRot, { v: Math.PI * 0.9, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });

    let raf = 0;
    const t0 = performance.now();
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (now - t0) / 1000;
      sm.x += (mouse.x - sm.x) * 0.05;
      sm.y += (mouse.y - sm.y) * 0.05;
      group.rotation.y = sm.x * 0.45 + Math.sin(t * 0.25) * 0.12 + scrollRot.v;
      group.rotation.x = sm.y * 0.18;
      group.position.y = Math.sin(t * 0.6) * 0.05;
      key.position.x = 2.5 + sm.x * 3;
      key.position.y = 1.2 - sm.y * 2;
      const a = pg.attributes.position.array;
      for (let j = 1; j < a.length; j += 3) { a[j] += 0.0025; if (a[j] > 4) a[j] = -4; }
      pg.attributes.position.needsUpdate = true;
      dust.rotation.y = t * 0.02;
      renderer.render(scene, camera);
    };
    if (reduce) renderer.render(scene, camera); else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('rt-look', onLook);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      io.disconnect();
      if (st) { st.scrollTrigger?.kill(); st.kill(); }
      pg.dispose(); pm.dispose(); railGeo.dispose(); slab.geometry.dispose();
      side.dispose(); front.dispose(); railMat.dispose(); tex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="stage" id="stage" ref={stageRef}>
      <div className="stage-fallback" ref={fallbackRef}>Raximjon Tulaganov</div>
      <canvas ref={canvasRef} aria-label={label} role="img" />
      <span className="stage-note">{hint}</span>
    </div>
  );
}
