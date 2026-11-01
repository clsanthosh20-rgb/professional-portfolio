import React, { useEffect, useRef } from 'react';

export function CinematicCanvas({ activeSection = 'home', isEntering = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = window.innerWidth < 768 ? 35 : 70;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // gentle upward drift
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.45 ? 'rgba(255, 43, 67,' : 'rgba(230, 230, 245,',
      });
    }

    // Light trails
    const lightTrails = [
      { x: width * 0.2, y: -200, length: 300, speed: 2.2, width: 1.5, alpha: 0.18 },
      { x: width * 0.7, y: -400, length: 420, speed: 3.1, width: 2, alpha: 0.25 },
      { x: width * 0.85, y: -100, length: 250, speed: 1.8, width: 1.2, alpha: 0.15 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Section-specific ambient atmosphere
      const speedMultiplier = isEntering ? 3.5 : 1.0;

      // Render Light Trails (Subtle deep red streaks)
      lightTrails.forEach((trail) => {
        trail.y += trail.speed * speedMultiplier;
        if (trail.y > height + trail.length) {
          trail.y = -trail.length - Math.random() * 300;
          trail.x = Math.random() * width;
        }

        const gradient = ctx.createLinearGradient(
          trail.x,
          trail.y,
          trail.x + 80,
          trail.y + trail.length
        );
        gradient.addColorStop(0, 'rgba(255, 43, 67, 0)');
        gradient.addColorStop(0.7, `rgba(255, 43, 67, ${trail.alpha * (isEntering ? 1.8 : 1)})`);
        gradient.addColorStop(1, 'rgba(255, 43, 67, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = trail.width * (isEntering ? 2 : 1);
        ctx.beginPath();
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(trail.x + 80, trail.y + trail.length);
        ctx.stroke();
      });

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEntering, activeSection]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Deep atmospheric glow gradients */}
      <div
        className="ambient-pulse"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 43, 67, 0.08) 0%, rgba(8, 8, 12, 0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 43, 67, 0.05) 0%, rgba(8, 8, 12, 0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
