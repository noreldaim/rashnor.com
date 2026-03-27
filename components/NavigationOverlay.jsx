"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

const WAYPOINTS = [
  { offset: 0, label: "Home" },
  { offset: 0.252, label: "About" },
  { offset: 0.500, label: "Skills" },
  { offset: 0.788, label: "Terminal" },
];

function smoothScrollTo(scrollEl, targetOffset, duration = 1200) {
  const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
  const startTop = scrollEl.scrollTop;
  const endTop = targetOffset * maxScroll;
  const delta = endTop - startTop;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  return new Promise((resolve) => {
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      scrollEl.scrollTop = startTop + delta * easeInOutCubic(progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

const NavigationOverlay = ({ scroll, onNavigate }) => {
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hovered, setHovered] = useState(null);
  const rafRef = useRef(null);

  // Track current waypoint based on scroll position
  useEffect(() => {
    if (!scroll?.el) return;

    function update() {
      const maxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
      if (maxScroll <= 0) return;
      const offset = scroll.el.scrollTop / maxScroll;

      // Find nearest waypoint
      let nearest = 0;
      let minDist = Infinity;
      WAYPOINTS.forEach((wp, i) => {
        const dist = Math.abs(offset - wp.offset);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      });
      setCurrentWaypoint(nearest);
      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scroll]);

  const navigateTo = useCallback(
    async (waypointIndex) => {
      if (!scroll?.el || isScrolling) return;
      setIsScrolling(true);
      if (onNavigate) onNavigate(waypointIndex);
      await smoothScrollTo(scroll.el, WAYPOINTS[waypointIndex].offset);
      setIsScrolling(false);
    },
    [scroll, isScrolling, onNavigate]
  );

  const goNext = useCallback(() => {
    if (currentWaypoint < WAYPOINTS.length - 1) {
      navigateTo(currentWaypoint + 1);
    }
  }, [currentWaypoint, navigateTo]);

  const goPrev = useCallback(() => {
    if (currentWaypoint > 0) {
      navigateTo(currentWaypoint - 1);
    }
  }, [currentWaypoint, navigateTo]);

  if (!scroll?.el) return null;

  const hasPrev = currentWaypoint > 0;
  const hasNext = currentWaypoint < WAYPOINTS.length - 1;

  return (
    <>
      {/* Hide scrollbar */}
      <style>{`
        /* Hide the drei ScrollControls scrollbar */
        div[style*="overflow"] {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        div[style*="overflow"]::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>

      {/* Previous arrow — left side */}
      <button
        onClick={goPrev}
        className="nav-arrow nav-arrow-prev"
        style={{
          position: "fixed",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          opacity: hasPrev ? 1 : 0,
          pointerEvents: hasPrev ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
        aria-label="Previous section"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(51,19,179,0.3)" />
          <path d="M23 12L15 20L23 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow — right side */}
      <button
        onClick={goNext}
        className="nav-arrow nav-arrow-next"
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          opacity: hasNext ? 1 : 0,
          pointerEvents: hasNext ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
        aria-label="Next section"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(51,19,179,0.3)" />
          <path d="M17 12L25 20L17 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Bottom dot navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "10px 20px",
          borderRadius: 24,
          background: "rgba(51, 19, 179, 0.25)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {WAYPOINTS.map((wp, i) => (
          <button
            key={wp.label}
            onClick={() => navigateTo(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              width: currentWaypoint === i ? 28 : 10,
              height: 10,
              borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.6)",
              background:
                currentWaypoint === i
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
            aria-label={`Go to ${wp.label}`}
          >
            {/* Tooltip */}
            <span
              style={{
                position: "absolute",
                bottom: 22,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 12,
                fontFamily: "Montserrat, sans-serif",
                color: "white",
                whiteSpace: "nowrap",
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
              }}
            >
              {wp.label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default NavigationOverlay;
