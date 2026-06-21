import React, { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

export const WaveBackground = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const noise2D = useRef(createNoise2D());

  const mouseRef = useRef({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  const linesRef = useRef([]);
  const pathsRef = useRef([]);
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const setSize = () => {
      const bounding = container.getBoundingClientRect();
      boundingRef.current = bounding;
      svg.style.width = `${bounding.width}px`;
      svg.style.height = `${bounding.height}px`;
    };

    const setLines = () => {
      const { width, height } = boundingRef.current;
      linesRef.current = [];
      
      // Clear existing paths
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
      pathsRef.current = [];

      const xGap = 10;
      const yGap = 32;
      const oWidth = width + 200;
      const oHeight = height + 30;

      const totalLines = Math.ceil(oWidth / xGap);
      const totalPoints = Math.ceil(oHeight / yGap);

      const xStart = (width - xGap * totalLines) / 2;
      const yStart = (height - yGap * totalPoints) / 2;

      for (let i = 0; i <= totalLines; i++) {
        const points = [];
        for (let j = 0; j <= totalPoints; j++) {
          points.push({
            x: xStart + xGap * i,
            y: yStart + yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 },
          });
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.classList.add("a__line");
        svg.appendChild(path);
        pathsRef.current.push(path);
        linesRef.current.push(points);
      }
    };

    const moved = (point, withCursorForce = true) => {
      const coords = {
        x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
        y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
      };
      coords.x = Math.round(coords.x * 10) / 10;
      coords.y = Math.round(coords.y * 10) / 10;
      return coords;
    };

    const movePoints = (time) => {
      const mouse = mouseRef.current;
      const noise = noise2D.current;

      linesRef.current.forEach((points) => {
        points.forEach((p) => {
          // Wave movement
          const move = noise((p.x + time * 0.0125) * 0.002, (p.y + time * 0.005) * 0.0015) * 12;
          p.wave.x = Math.cos(move) * 32;
          p.wave.y = Math.sin(move) * 16;

          // Mouse effect
          const dx = p.x - mouse.sx;
          const dy = p.y - mouse.sy;
          const d = Math.hypot(dx, dy);
          const l = Math.max(250, mouse.vs);

          if (d < l) {
            const s = 1 - d / l;
            const f = Math.cos(d * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.001;
            p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.001;
          }

          p.cursor.vx += (0 - p.cursor.x) * 0.005; // String tension
          p.cursor.vy += (0 - p.cursor.y) * 0.005;
          p.cursor.vx *= 0.925; // Friction
          p.cursor.vy *= 0.925;
          p.cursor.x += p.cursor.vx * 2; // Strength
          p.cursor.y += p.cursor.vy * 2;

          p.cursor.x = Math.min(100, Math.max(-100, p.cursor.x)); // Clamp
          p.cursor.y = Math.min(100, Math.max(-100, p.cursor.y));
        });
      });
    };

    const drawLines = () => {
      linesRef.current.forEach((points, lIndex) => {
        if (!pathsRef.current[lIndex]) return;
        let p1_start = moved(points[0], false);
        let d = `M ${p1_start.x} ${p1_start.y}`;

        points.forEach((p1, pIndex) => {
          const isLast = pIndex === points.length - 1;
          p1 = moved(p1, !isLast);
          d += ` L ${p1.x} ${p1.y}`;
        });
        pathsRef.current[lIndex].setAttribute("d", d);
      });
    };

    const updateMousePosition = (x, y) => {
      const mouse = mouseRef.current;
      const bounding = boundingRef.current;
      mouse.x = x - bounding.left;
      mouse.y = y - bounding.top;

      if (!mouse.set) {
        mouse.sx = mouse.x; mouse.sy = mouse.y;
        mouse.lx = mouse.x; mouse.ly = mouse.y;
        mouse.set = true;
      }
    };

    const handleMouseMove = (e) => updateMousePosition(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.cancelable) e.preventDefault();
      updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleResize = () => {
      setSize();
      setLines();
    };

    let animationId;
    const tick = (time) => {
      const mouse = mouseRef.current;
      // Smooth mouse movement
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // Mouse velocity
      const dx = mouse.x - mouse.lx;
      const dy = mouse.y - mouse.ly;
      const d = Math.hypot(dx, dy);

      mouse.v = d;
      mouse.vs += (d - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.a = Math.atan2(dy, dx);

      // Animation property for dot
      container.style.setProperty("--x", `${mouse.sx}px`);
      container.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(time);
      drawLines();
      animationId = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    setSize();
    setLines();
    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="a-waves-container">
      <svg ref={svgRef} className="a-waves-svg js-svg"></svg>
    </div>
  );
};
