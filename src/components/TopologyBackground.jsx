import { useEffect, useRef, useState } from "react";

export const TopologyBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const initVanta = () => {
      // Check if global VANTA and p5 are loaded from index.html
      if (window.VANTA && window.VANTA.TOPOLOGY && !vantaEffect && vantaRef.current) {
        try {
          const effect = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x99b6cd,
            backgroundColor: 0x010c0c,
          });
          setVantaEffect(effect);
        } catch (err) {
          console.error("Vanta initialization failed:", err);
        }
      } else if (!window.VANTA || !window.VANTA.TOPOLOGY) {
        // If not loaded yet, wait a bit and retry (simple polling)
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ backgroundColor: "#010c0c" }}
    />
  );
};
