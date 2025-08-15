import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ mousePosition, mouseInWindow }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, in: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let can_w = canvas.width = window.innerWidth;
    let can_h = canvas.height = window.innerHeight;

    const BALL_NUM = 40;
    const MIN_R = 1;
    const MAX_R = 3;
    const dis_limit = 200;
    const MAX_CONNECTIONS = 3;
    const link_line_width = 0.8;
    const repel_radius = 120;
    const customPointerLag = 0.1;

    // Galaxy theme colors
    const particleColors = [
      { r: 147, g: 197, b: 253 },  // Light blue
      { r: 167, g: 139, b: 250 },  // Purple
      { r: 236, g: 172, b: 251 },  // Pink
      { r: 255, g: 255, b: 255 },  // White
    ];

    let balls = [];
    let mouse_in = false;
    let actual_mouse = { x: 0, y: 0 };
    const mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' };

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getRandomSpeed() {
      let vx = 0, vy = 0;
      while (vx === 0 && vy === 0) {
        vx = randomNumFrom(-0.15, 0.15);
        vy = randomNumFrom(-0.15, 0.15);
      }
      return [vx, vy];
    }

    function getRandomColor() {
      return particleColors[Math.floor(Math.random() * particleColors.length)];
    }

    function getRandomBall() {
      const [vx, vy] = getRandomSpeed();
      const x = randomNumFrom(MAX_R, can_w - MAX_R);
      const y = randomNumFrom(MAX_R, can_h - MAX_R);
      const r = randomNumFrom(MIN_R, MAX_R);
      const color = getRandomColor();
      return { x, y, vx, vy, r, color, alpha: 1 };
    }

    function renderBalls() {
      balls.forEach(b => {
        if (!b.type) {
          // Create glowing effect
          const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2);
          gradient.addColorStop(0, `rgba(${b.color.r},${b.color.g},${b.color.b},0.8)`);
          gradient.addColorStop(0.5, `rgba(${b.color.r},${b.color.g},${b.color.b},0.3)`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * 2, 0, Math.PI * 2);
          ctx.fill();

          // Core of the particle
          ctx.fillStyle = `rgb(${b.color.r},${b.color.g},${b.color.b})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    function updateBalls() {
      const currentMouse = mouseRef.current;
      actual_mouse.x = currentMouse.x;
      actual_mouse.y = currentMouse.y;
      mouse_in = currentMouse.in;

      balls.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        // Add slight random movement for more organic feel
        b.vx += (Math.random() - 0.5) * 0.01;
        b.vy += (Math.random() - 0.5) * 0.01;

        // Limit max speed
        b.vx = Math.max(-0.5, Math.min(0.5, b.vx));
        b.vy = Math.max(-0.5, Math.min(0.5, b.vy));

        // Bounce off edges with damping
        if (b.x - b.r <= 0 && b.vx < 0) {
          b.x = b.r;
          b.vx = -b.vx * 0.8;
        } else if (b.x + b.r >= can_w && b.vx > 0) {
          b.x = can_w - b.r;
          b.vx = -b.vx * 0.8;
        }
        if (b.y - b.r <= 0 && b.vy < 0) {
          b.y = b.r;
          b.vy = -b.vy * 0.8;
        } else if (b.y + b.r >= can_h && b.vy > 0) {
          b.y = can_h - b.r;
          b.vy = -b.vy * 0.8;
        }

        // Mouse repulsion
        if (mouse_in && !b.type) {
          const dx = b.x - mouse_ball.x;
          const dy = b.y - mouse_ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < repel_radius) {
            const force = (1 - dist / repel_radius) * 0.5;
            const angle = Math.atan2(dy, dx);
            b.vx += Math.cos(angle) * force;
            b.vy += Math.sin(angle) * force;
          }
        }
      });

      mouse_ball.x += (actual_mouse.x - mouse_ball.x) * customPointerLag;
      mouse_ball.y += (actual_mouse.y - mouse_ball.y) * customPointerLag;
    }

    function getDistance(b1, b2) {
      const dx = b1.x - b2.x;
      const dy = b1.y - b2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function renderLines() {
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < balls.length; i++) {
        let connections = 0;
        for (let j = 0; j < balls.length; j++) {
          if (i === j || connections >= MAX_CONNECTIONS) continue;

          const dist = getDistance(balls[i], balls[j]);
          if (dist < dis_limit) {
            const distToMouse1 = getDistance(balls[i], mouse_ball);
            const distToMouse2 = getDistance(balls[j], mouse_ball);
            if (distToMouse1 < repel_radius || distToMouse2 < repel_radius) continue;

            const alpha = (1 - dist / dis_limit) * 0.2;
            const gradient = ctx.createLinearGradient(
              balls[i].x, balls[i].y,
              balls[j].x, balls[j].y
            );
            
            gradient.addColorStop(0, `rgba(${balls[i].color.r},${balls[i].color.g},${balls[i].color.b},${alpha})`);
            gradient.addColorStop(1, `rgba(${balls[j].color.r},${balls[j].color.g},${balls[j].color.b},${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function renderMousePointer() {
      const gradient = ctx.createRadialGradient(
        mouse_ball.x, mouse_ball.y, 0,
        mouse_ball.x, mouse_ball.y, 15
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.beginPath();
      ctx.arc(mouse_ball.x, mouse_ball.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function render() {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      if (mouse_in) renderMousePointer();
      updateBalls();
      requestAnimationFrame(render);
    }

    function initBalls(num) {
      balls = [];
      for (let i = 0; i < num; i++) balls.push(getRandomBall());
    }

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      can_w = canvas.width;
      can_h = canvas.height;
    }

    window.addEventListener('resize', () => {
      initCanvas();
      initBalls(BALL_NUM);
    });

    function goMovie() {
      initCanvas();
      initBalls(BALL_NUM);
      render();
    }

    goMovie();

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  useEffect(() => {
    if (mousePosition && mouseInWindow) {
      mouseRef.current = {
        x: mousePosition.x,
        y: mousePosition.y,
        in: true
      };
    } else {
      mouseRef.current = {
        x: 0,
        y: 0,
        in: false
      };
    }
  }, [mousePosition, mouseInWindow]);

  return (
    <canvas
      ref={canvasRef}
      id="nokey"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default ParticleBackground;
