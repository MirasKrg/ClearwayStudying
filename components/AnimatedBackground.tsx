import React, { useRef, useEffect } from 'react';

interface AnimatedBackgroundProps {
  isDarkMode: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 70;
    const maxLineConnections = 5;
    
    const particleColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(31, 41, 55, 0.6)';

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() * 0.5 - 0.25);
        this.speedY = (Math.random() * 0.5 - 0.25);
      }

      update() {
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if(!ctx) return;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
        if(!ctx) return;
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            let connections = 0;
            for (let b = a; b < particles.length; b++) {
                if (connections >= maxLineConnections) break;
                let distance = Math.sqrt(
                    (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
                    (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
                );

                if (distance < 150) {
                    connections++;
                    opacityValue = 1 - (distance / 150);
                    const currentLineColor = isDarkMode 
                        ? `rgba(255, 255, 255, ${opacityValue * 0.25})`
                        : `rgba(31, 41, 55, ${opacityValue * 0.2})`;

                    ctx.strokeStyle = currentLineColor;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
      if(!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    const handleResize = () => {
        resizeCanvas();
        init(); // Re-initialize particles to fit new screen size
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default AnimatedBackground;
