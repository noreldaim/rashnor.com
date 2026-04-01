import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const AboutMe = () => {
  const { gl } = useThree();
  return (
    <Html
      style={{ pointerEvents: "none" }}
      portal={{ current: gl.domElement.parentNode }}
      position={[-0.0, 0.1, 0]}
      transform
      center
      scale={0.18}
    >
      <div className="hud-card about-card">
        {/* Corner accents */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-br" />

        {/* Left — portrait */}
        <div className="hud-portrait-col">
          <div className="hud-portrait-ring">
            <img src="images/prof-pic.png" className="hud-portrait-img" alt="profile" />
          </div>
          <span className="hud-portrait-label">PROFILE</span>
        </div>

        {/* Right — info */}
        <div className="hud-info-col">
          <div className="hud-name-row">
            <span className="hud-name">RASHEED NORELDAIM</span>
            <span className="hud-status">● ACTIVE</span>
          </div>
          <div className="hud-role">Full-Stack Developer</div>
          <div className="hud-divider" />
          <p className="hud-bio">
            Based in Maastricht, Netherlands. CS graduate from Oregon State University,
            with a background in Architecture & Design.
          </p>
          <p className="hud-bio">
            I thrive on unraveling intricate challenges through innovative solutions,
            blending creative artistry with cutting-edge technology.
          </p>
          <div className="hud-meta-row">
            <span className="hud-meta-item">📍 Maastricht, NL</span>
            <span className="hud-meta-item">🎓 OSU — CS</span>
            <span className="hud-meta-item">🏛️ U of K — Arch</span>
          </div>
        </div>
      </div>
    </Html>
  );
};

export default AboutMe;
