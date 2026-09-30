import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle atmospheric dust/spark motes
    const particleCount = Math.min(35, Math.floor((width * height) / 35000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1, // Gently drift upwards
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.3 ? '245, 240, 230' : '225, 29, 72', // Cream & subtle crimson
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-crimson/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-amber-accent/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-rose-gold/5 blur-[120px] pointer-events-none" />

      {/* Canvas for fine particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Film grain layer */}
      <div className="absolute inset-0 film-grain opacity-40 mix-blend-overlay" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,8,0.7)_100%)] pointer-events-none" />
    </div>
  );
};
