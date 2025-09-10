import React, { useEffect, useRef } from "react";

export default function BubbleTrail() {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    const setSize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Ensures crisp drawing
    };

    setSize();
    window.addEventListener("resize", setSize);

    const addBubble = (x, y) => {
      for (let i = 0; i < 3; i++) {
        bubbles.current.push({
          x,
          y,
          radius: Math.random() * 6 + 4,
          opacity: 1,
          speedY: Math.random() * 1 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    // Smooth performance with requestAnimationFrame
    let ticking = false;
    const onMove = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        addBubble(e.clientX, e.clientY);
        ticking = false;
      });
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw bubbles
      for (let i = bubbles.current.length - 1; i >= 0; i--) {
        const b = bubbles.current[i];
        b.y -= b.speedY;
        b.x += b.speedX;
        b.opacity -= 0.01;

        if (b.opacity <= 0) {
          bubbles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 44, 68, ${b.opacity})`; // #642c44 with opacity
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
