'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group holds all particles — offset to align with video card center
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    // ─── Textures ────────────────────────────────────────────────────────────

    const makeSprite = (innerAlpha = 0.95, outerStops = [[0.2, 0.55], [0.5, 0.1], [0.8, 0.01]]) => {
      const c = document.createElement('canvas');
      c.width = 64; c.height = 64;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, `rgba(255,255,255,${innerAlpha})`);
      outerStops.forEach(([t, a]) => g.addColorStop(t, `rgba(255,255,255,${a})`));
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };

    const makeHaze = () => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0,   'rgba(255,255,255,0.18)');
      g.addColorStop(0.25,'rgba(255,255,255,0.07)');
      g.addColorStop(0.55,'rgba(255,255,255,0.015)');
      g.addColorStop(0.85,'rgba(255,255,255,0.002)');
      g.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    };

    // Brighter core sprites for more visible sparks
    const sparkTex  = makeSprite(0.98, [[0.16, 0.60], [0.42, 0.14], [0.72, 0.01]]);
    const dotTex    = makeSprite(1.0,  [[0.10, 0.75], [0.32, 0.18], [0.62, 0.01]]);
    const bokehTex  = makeSprite(0.65, [[0.22, 0.25], [0.52, 0.05], [0.82, 0.006]]);
    const hazeTex   = makeHaze();

    // ─── Counts ───────────────────────────────────────────────────────────────
    const mobile = window.innerWidth < 1100;
    const HAZE   = 7;
    const SPARKS = mobile ? 28 : 65;   // main orange embers
    const DOTS   = mobile ? 40 : 90;   // tiny fire dust / spark trails
    const BOKEH  = mobile ? 10 : 20;   // large soft blobs

    // ─── Geometry + metadata helpers ─────────────────────────────────────────
    const makeGeo = (n) => {
      const geo  = new THREE.BufferGeometry();
      const pos  = new Float32Array(n * 3);
      const col  = new Float32Array(n * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      return { geo, pos, col };
    };

    // ─── 1. Haze (slow orange clouds, very soft) ──────────────────────────────
    const hz = makeGeo(HAZE);
    const hazeMeta = [];
    for (let i = 0; i < HAZE; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 2.5;
      hz.pos[i*3]   = Math.cos(a) * r;
      hz.pos[i*3+1] = Math.sin(a) * r;
      hz.pos[i*3+2] = -6 + Math.random() * 3;
      // deep orange-red
      hz.col[i*3]   = 1.0;
      hz.col[i*3+1] = 0.18 + Math.random() * 0.1;
      hz.col[i*3+2] = 0.0;
      hazeMeta.push({ a, r, rot: (0.008 + Math.random() * 0.014) * (Math.random()<0.5?1:-1), ph: Math.random()*Math.PI*2 });
    }

    // ─── 2. Sparks — orbital orange/gold embers with near/far Z depth ─────────
    const sp = makeGeo(SPARKS);
    const sparkMeta = [];
    for (let i = 0; i < SPARKS; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 3.8;
      // Depth bands: 40% near (z 1–3), 40% mid (z -1–1), 20% far (z -4–-2)
      const depthRoll = Math.random();
      const zBase = depthRoll < 0.4 ? 1 + Math.random() * 2
                  : depthRoll < 0.8 ? -1 + Math.random() * 2
                  : -4 + Math.random() * 2;
      sp.pos[i*3]   = Math.cos(a) * r;
      sp.pos[i*3+1] = Math.sin(a) * r;
      sp.pos[i*3+2] = zBase;

      // fire color palette: deep orange → gold → pale amber
      const c = Math.random();
      let g;
      if (c < 0.55)      { sp.col[i*3]=1.0; g=0.32+Math.random()*0.10; sp.col[i*3+2]=0.01; }
      else if (c < 0.82) { sp.col[i*3]=1.0; g=0.60+Math.random()*0.12; sp.col[i*3+2]=0.04; }
      else               { sp.col[i*3]=1.0; g=0.80+Math.random()*0.10; sp.col[i*3+2]=0.08; }
      sp.col[i*3+1] = g;

      sparkMeta.push({
        a, r,
        // Slightly slower for premium smoothness
        orb:  (0.05 + Math.random() * 0.15) * (Math.random()<0.5?1:-1),
        amp:  0.12 + Math.random() * 0.20,
        ph:   Math.random() * Math.PI * 2,
        dr:   (Math.random() - 0.5) * 0.005,
      });
    }

    // ─── 3. Dots — tiny fire dust + particle trails ────────────────────────────
    const dt = makeGeo(DOTS);
    const dotMeta = [];
    for (let i = 0; i < DOTS; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 3.0;
      dt.pos[i*3]   = Math.cos(a) * r;
      dt.pos[i*3+1] = Math.sin(a) * r;
      dt.pos[i*3+2] = -1 + Math.random() * 4;

      // 55% orange-white glowing dust, 45% pure orange sparks
      if (Math.random() < 0.55) {
        dt.col[i*3]=1.0; dt.col[i*3+1]=0.88; dt.col[i*3+2]=0.65; // warm white
      } else {
        dt.col[i*3]=1.0; dt.col[i*3+1]=0.42+Math.random()*0.12; dt.col[i*3+2]=0.02;
      }
      dotMeta.push({
        a, r,
        orb: (0.14 + Math.random() * 0.32) * (Math.random()<0.5?1:-1),
        ph:  Math.random() * Math.PI * 2,
        vy:  0.002 + Math.random() * 0.004,  // slow upward drift for trail effect
        y:   dt.pos[i*3+1],
      });
    }

    // ─── 4. Bokeh — large, very soft glow blobs with Z depth ─────────────────
    const bk = makeGeo(BOKEH);
    const bokehMeta = [];
    for (let i = 0; i < BOKEH; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 4.5;
      // Far bokeh looks naturally out-of-focus; near bokeh is crisper
      bk.pos[i*3]   = Math.cos(a) * r;
      bk.pos[i*3+1] = Math.sin(a) * r;
      bk.pos[i*3+2] = -6 + Math.random() * 9;  // -6 to +3 — wider Z band
      if (Math.random() < 0.5) {
        bk.col[i*3]=1.0; bk.col[i*3+1]=0.60; bk.col[i*3+2]=0.12; // gold
      } else {
        bk.col[i*3]=0.95; bk.col[i*3+1]=0.92; bk.col[i*3+2]=1.0; // ice white
      }
      bokehMeta.push({ a, r, vy: 0.0012+Math.random()*0.0025, ph: Math.random()*Math.PI*2, y: bk.pos[i*3+1] });
    }

    // ─── Materials — slightly higher opacity for more visible premium presence ──
    const hazeMat = new THREE.PointsMaterial({
      size: mobile ? 8 : 14, map: hazeTex, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
      vertexColors: true, sizeAttenuation: true, opacity: 0.045,
    });
    const sparkMat = new THREE.PointsMaterial({
      size: mobile ? 1.05 : 1.72, map: sparkTex, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
      vertexColors: true, sizeAttenuation: true, opacity: 0.96,
    });
    const dotMat = new THREE.PointsMaterial({
      size: mobile ? 0.30 : 0.55, map: dotTex, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
      vertexColors: true, sizeAttenuation: true, opacity: 0.98,
    });
    const bokehMat = new THREE.PointsMaterial({
      size: mobile ? 3.2 : 5.8, map: bokehTex, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
      vertexColors: true, sizeAttenuation: true, opacity: 0.20,
    });

    const hazePoints  = new THREE.Points(hz.geo,  hazeMat);
    const sparkPoints = new THREE.Points(sp.geo,  sparkMat);
    const dotPoints   = new THREE.Points(dt.geo,  dotMat);
    const bokehPoints = new THREE.Points(bk.geo,  bokehMat);

    particleGroup.add(hazePoints, sparkPoints, dotPoints, bokehPoints);

    // ─── Dynamic alignment to video frame ─────────────────────────────────────
    let offsetX = 0, offsetY = 0;

    const recalcOffset = () => {
      const frameEl = document.querySelector('[class*="videoFrameContainer"]');
      if (!frameEl || !container) return;
      const fr = frameEl.getBoundingClientRect();
      const cr = container.getBoundingClientRect();
      const pxX = (fr.left + fr.width  / 2) - (cr.left + cr.width  / 2);
      const pxY = (fr.top  + fr.height / 2) - (cr.top  + cr.height / 2);
      const cz    = camera.position.z;
      const vHalf = Math.tan((camera.fov * Math.PI) / 360) * cz;
      const vWide = vHalf * (cr.width / cr.height);
      offsetX = (pxX / cr.width)  *  vWide * 2;
      offsetY = (pxY / cr.height) * -vHalf * 2;
      particleGroup.position.set(offsetX, offsetY, 0);
    };

    recalcOffset();
    const t1 = setTimeout(recalcOffset, 120);
    const t2 = setTimeout(recalcOffset, 600);
    const t3 = setTimeout(recalcOffset, 1800);

    // ─── Animation loop ───────────────────────────────────────────────────────
    let rafId;
    const clock = new THREE.Clock();
    const YBOUND = 8;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Haze — very slow rotation and sway
      const hPos = hz.geo.attributes.position.array;
      for (let i = 0; i < HAZE; i++) {
        const m = hazeMeta[i];
        m.a += m.rot * 0.003;
        hPos[i*3]   = Math.cos(m.a) * m.r + Math.sin(t * 0.07 + m.ph) * 0.12;
        hPos[i*3+1] = Math.sin(m.a) * m.r + Math.cos(t * 0.06 + m.ph) * 0.10;
      }
      hz.geo.attributes.position.needsUpdate = true;

      // Sparks — orbital embers — slightly slower for premium smoothness
      const sPos = sp.geo.attributes.position.array;
      for (let i = 0; i < SPARKS; i++) {
        const m = sparkMeta[i];
        m.a += m.orb * 0.009;   // was 0.011 — calmer, more cinematic
        m.r = Math.max(1.2, Math.min(5.8, m.r + m.dr));
        if (m.r >= 5.8 || m.r <= 1.2) m.dr *= -1;
        sPos[i*3]   = Math.cos(m.a) * m.r;
        sPos[i*3+1] = Math.sin(m.a) * m.r + Math.sin(t * 0.7 + m.ph) * m.amp;
      }
      sp.geo.attributes.position.needsUpdate = true;

      // Dots — tighter/faster orbit, slight upward float (trail simulation)
      const dPos = dt.geo.attributes.position.array;
      for (let i = 0; i < DOTS; i++) {
        const m = dotMeta[i];
        m.a += m.orb * 0.016;
        m.y += m.vy;
        if (m.y > YBOUND) m.y = -YBOUND;
        dPos[i*3]   = Math.cos(m.a) * m.r;
        dPos[i*3+1] = Math.sin(m.a) * m.r + m.y * 0.18 + Math.cos(t * 1.4 + m.ph) * 0.05;
      }
      dt.geo.attributes.position.needsUpdate = true;

      // Bokeh — slow rise + gentle sway
      const bPos = bk.geo.attributes.position.array;
      for (let i = 0; i < BOKEH; i++) {
        const m = bokehMeta[i];
        m.y += m.vy;
        if (m.y > YBOUND + 2) m.y = -(YBOUND + 2);
        bPos[i*3]   = Math.cos(m.a) * m.r + Math.sin(t * 0.22 + m.ph) * 0.25;
        bPos[i*3+1] = Math.sin(m.a) * m.r + m.y * 0.3;
      }
      bk.geo.attributes.position.needsUpdate = true;

      // Smooth mouse parallax
      targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.04;
      targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.04;
      particleGroup.rotation.y =  targetMouseRef.current.x * 0.055;
      particleGroup.rotation.x = -targetMouseRef.current.y * 0.055;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Events ───────────────────────────────────────────────────────────────
    const onMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      recalcOffset();
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize',    onResize);

    // ─── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize',    onResize);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      [hz.geo, sp.geo, dt.geo, bk.geo].forEach(g => g.dispose());
      [hazeMat, sparkMat, dotMat, bokehMat].forEach(m => m.dispose());
      [sparkTex, dotTex, bokehTex, hazeTex].forEach(t => t.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
      }}
    />
  );
}
