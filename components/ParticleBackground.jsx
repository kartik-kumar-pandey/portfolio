import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ mousePosition, mouseInWindow }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, in: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let can_w = canvas.width = window.innerWidth;
    let can_h = canvas.height = window.innerHeight;

    const BALL_NUM = 30;
    const R = 2;
    const dis_limit = 180;
    const MAX_CONNECTIONS = 4;
    const link_line_width = 0.6;
    const repel_radius = 100;
    const ball_color = { r: 0, g: 0, b: 0 };
    const customPointerLag = 0.1;

    let balls = [];
    let mouse_in = false;
    let actual_mouse = { x: 0, y: 0 };
    const mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' };

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getRandomSpeed() {
      return [randomNumFrom(-0.3, 0.3), randomNumFrom(-0.3, 0.3)];
    }

    function getRandomBall() {
      const [vx, vy] = getRandomSpeed();
      const x = randomNumFrom(0, can_w);
      const y = randomNumFrom(0, can_h);
      return { x, y, vx, vy, r: R, alpha: 1 };
    }

    function renderBalls() {
      balls.forEach(b => {
        if (!b.type) {
          ctx.fillStyle = `rgb(${ball_color.r},${ball_color.g},${ball_color.b})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    function updateBalls() {
      const newBalls = [];
      
      // Get current mouse state from ref
      const currentMouse = mouseRef.current;
      actual_mouse.x = currentMouse.x;
      actual_mouse.y = currentMouse.y;
      mouse_in = currentMouse.in;
      
      balls.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        const dx = b.x - mouse_ball.x;
        const dy = b.y - mouse_ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse_in && dist < repel_radius && !b.type) {
          const angle = Math.atan2(dy, dx);
          b.vx += Math.cos(angle) * 0.4;
          b.vy += Math.sin(angle) * 0.4;
        }

        if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
          newBalls.push(b);
        }
      });
      
      balls = newBalls;

      mouse_ball.x += (actual_mouse.x - mouse_ball.x) * customPointerLag;
      mouse_ball.y += (actual_mouse.y - mouse_ball.y) * customPointerLag;
    }

    function getDistance(b1, b2) {
      const dx = b1.x - b2.x;
      const dy = b1.y - b2.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        let connections = 0;
        for (let j = 0; j < balls.length; j++) {
          if (i === j || connections >= MAX_CONNECTIONS) continue;

          const dist = getDistance(balls[i], balls[j]);
          if (dist < dis_limit) {
            const distToMouse1 = getDistance(balls[i], mouse_ball);
            const distToMouse2 = getDistance(balls[j], mouse_ball);
            if (distToMouse1 < repel_radius || distToMouse2 < repel_radius) continue;

            const alpha = 1 - dist / dis_limit;
            ctx.strokeStyle = `rgba(0,0,0,${alpha * 0.15})`;
            ctx.lineWidth = link_line_width;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }
    }

    function renderMousePointer() {
      ctx.beginPath();
      ctx.arc(mouse_ball.x, mouse_ball.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(95, 93, 93, 0.31)';
      ctx.fill();
    }

    function render() {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      if (mouse_in) renderMousePointer();
      updateBalls();
      if (balls.length < BALL_NUM) balls.push(getRandomBall());
      requestAnimationFrame(render);
    }

    function initBalls(num) {
      for (let i = 0; i < num; i++) balls.push(getRandomBall());
    }

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      can_w = canvas.width;
      can_h = canvas.height;
    }

    window.addEventListener('resize', initCanvas);

    function goMovie() {
      initCanvas();
      initBalls(BALL_NUM);
      render();
    }

    goMovie();

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []); // Empty dependency array to run only once

  // Update mouse ref when props change
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
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        backgroundColor: '#fff',
      }}
    />
  );
};

export default ParticleBackground;
