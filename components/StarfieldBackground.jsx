import React, { useEffect, useRef } from 'react';

const BLACK_HOLE = {
  x: 0.5, // center of screen (relative)
  y: 0.5,
  r: 60, // black hole radius
  diskR: 110, // accretion disk outer radius
};

const GALAXY_COUNT = 5;
const getGalaxies = () =>
  Array.from({ length: GALAXY_COUNT }).map(() => ({
    x: Math.random(), // relative position
    y: Math.random(),
    r: 60 + Math.random() * 80,
    arms: 3 + Math.floor(Math.random() * 3),
    color: `hsl(${180 + Math.random() * 180}, 80%, 70%)`,
    rotation: Math.random() * Math.PI * 2,
    speed: 0.003 + Math.random() * 0.002,
    elliptical: 0.7 + Math.random() * 0.5,
  }));

const StarfieldBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isConsumingRef = useRef(false);
  const galaxies = useRef(getGalaxies()).current;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    let t = 0;

    canvas.width = width;
    canvas.height = height;

    const STAR_COUNT = 120;
    // Each star has: x, y, r, alpha, twinkle, phase, homeX, homeY, progress (0=at home, 1=at black hole)
    const stars = Array.from({ length: STAR_COUNT }).map(() => {
      const homeX = Math.random() * width;
      const homeY = Math.random() * height;
      return {
        x: homeX,
        y: homeY,
        homeX,
        homeY,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.5,
        twinkle: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2,
        progress: 0, // 0 = at home, 1 = at black hole
      };
    });

    function drawBlackHole() {
      const cx = BLACK_HOLE.x * width;
      const cy = BLACK_HOLE.y * height;
      const r = BLACK_HOLE.r;
      const diskR = BLACK_HOLE.diskR;
      // Detect mouse proximity
      const dx = mouseRef.current.x - cx;
      const dy = mouseRef.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isHover = dist < diskR;
      isConsumingRef.current = isHover;
      // 1. Layered, softly animated color effects (blue, teal, purple)
      // Blue
      ctx.save();
      const blueR = r * (isHover ? 2.2 : 1.7) * (1 + 0.06 * Math.sin(t * 1.2));
      const blueGrad = ctx.createRadialGradient(cx, cy, r * 1.05, cx, cy, blueR);
      blueGrad.addColorStop(0, 'rgba(80,120,255,0.13)');
      blueGrad.addColorStop(0.5, 'rgba(80,120,255,0.07)');
      blueGrad.addColorStop(1, 'rgba(80,120,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, blueR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.globalAlpha = isHover ? 0.5 : 0.32;
      ctx.fillStyle = blueGrad;
      ctx.filter = 'blur(1.5px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();
      // Teal
      ctx.save();
      const tealR = r * (isHover ? 2.7 : 2.1) * (1 + 0.07 * Math.cos(t * 1.1));
      const tealGrad = ctx.createRadialGradient(cx, cy, r * 1.2, cx, cy, tealR);
      tealGrad.addColorStop(0, 'rgba(0,255,255,0.09)');
      tealGrad.addColorStop(0.5, 'rgba(0,255,255,0.04)');
      tealGrad.addColorStop(1, 'rgba(0,255,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, tealR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.globalAlpha = isHover ? 0.32 : 0.18;
      ctx.fillStyle = tealGrad;
      ctx.filter = 'blur(2.5px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();
      // Purple
      ctx.save();
      const purpleR = r * (isHover ? 3.1 : 2.5) * (1 + 0.05 * Math.sin(t * 0.9));
      const purpleGrad = ctx.createRadialGradient(cx, cy, r * 1.3, cx, cy, purpleR);
      purpleGrad.addColorStop(0, 'rgba(180,80,255,0.07)');
      purpleGrad.addColorStop(0.5, 'rgba(180,80,255,0.03)');
      purpleGrad.addColorStop(1, 'rgba(180,80,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, purpleR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.globalAlpha = isHover ? 0.18 : 0.11;
      ctx.fillStyle = purpleGrad;
      ctx.filter = 'blur(2.5px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();
      // 2. Gravitational lensing (Einstein ring)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.22, 0, Math.PI * 2);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(180,220,255,0.13)';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#b0e0ff';
      ctx.shadowBlur = 18;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.restore();
      // 3. Event horizon (sharp black core)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.shadowColor = '#222';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }

    function drawStars() {
      const cx = BLACK_HOLE.x * width;
      const cy = BLACK_HOLE.y * height;
      for (let star of stars) {
        // Animate progress
        if (isConsumingRef.current) {
          // Move toward black hole
          star.progress += 0.04 * (1 - star.progress);
        } else {
          // Move back to home
          star.progress -= 0.04 * star.progress;
        }
        star.progress = Math.max(0, Math.min(1, star.progress));
        // Interpolate position
        const x = star.homeX + (cx - star.homeX) * star.progress;
        const y = star.homeY + (cy - star.homeY) * star.progress;
        // Fade out as it gets closer
        const fade = 1 - star.progress;
        star.phase += star.twinkle;
        const twinkleAlpha = star.alpha + Math.sin(star.phase) * 0.3;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, twinkleAlpha * fade));
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8 * fade;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawBlackHole();
      drawStars();
      t += 0.015;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Optionally, reposition stars
      for (let star of stars) {
        star.homeX = Math.random() * width;
        star.homeY = Math.random() * height;
      }
    }
    window.addEventListener('resize', handleResize);

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function handleMouseOut() {
      mouseRef.current = { x: -1000, y: -1000 };
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
};

export default StarfieldBackground; 