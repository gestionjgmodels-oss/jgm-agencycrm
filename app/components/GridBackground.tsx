"use client";

import { useEffect, useRef } from 'react';

export default function GridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // "Particle" definition
        interface Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            density: number;
            vx: number;
            vy: number;
        }

        const particles: Particle[] = [];
        const particleCount = 300; // Optimized for performance
        const sensitivity = 120; // Interaction radius

        let mouseX = -1000;
        let mouseY = -1000;

        function init() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 1.5 + 0.5, // Varied size
                    density: (Math.random() * 30) + 1,
                    vx: (Math.random() - 0.5) * 0.5, // Subtle drift
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        init();

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            // Detect Dark Mode safely
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

            particles.forEach(p => {
                // Mouse Interaction
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = sensitivity;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * p.density;
                const directionY = forceDirectionY * force * p.density;

                if (distance < sensitivity) {
                    p.x -= directionX * 3; // Repel
                    p.y -= directionY * 3;
                } else {
                    // Return to base (with drift)
                    if (p.x !== p.baseX) {
                        const dx = p.x - p.baseX;
                        p.x -= dx / 20;
                    }
                    if (p.y !== p.baseY) {
                        const dy = p.y - p.baseY;
                        p.y -= dy / 20;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Dynamic Color based on Theme
                if (isDark) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.globalAlpha = 0.4; // Matching light mode intensity
                } else {
                    ctx.fillStyle = '#111111';
                    ctx.globalAlpha = 0.4; // Visible black dots
                }

                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
}
