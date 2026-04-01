import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const skillCategories = [
  {
    label: "LANGUAGES",
    accent: "#a78bfa",
    items: ["TypeScript", "JavaScript", "Python", "C/C++", "SQL", "HTML/CSS"],
  },
  {
    label: "FRONTEND",
    accent: "#67e8f9",
    items: ["Next.js", "React", "React Native/Expo", "Tailwind CSS", "shadcn/ui", "React Flow", "Tanstack Table", "Figma"],
  },
  {
    label: "BACKEND",
    accent: "#86efac",
    items: ["Node.js", "Express", "Redis", "WebSockets", "MongoDB/Mongoose", "Flask", "REST/OpenAPI"],
  },
  {
    label: "CLOUD & DEVOPS",
    accent: "#fbbf24",
    items: ["AWS (EC2, S3, Lambda, CloudWatch, DocumentDB)", "Vercel", "Docker", "GitLab CI/CD", "Portainer"],
  },
  {
    label: "AUTH & APIS",
    accent: "#f9a8d4",
    items: ["Clerk (SSO, RBAC)", "OpenAPI/Swagger", "Orval", "openapi-typescript", "SDK Generation"],
  },
  {
    label: "TOOLS",
    accent: "#c4b5fd",
    items: ["Git", "VS Code", "Claude Code", "Cursor", "MKDocs", "Redocly"],
  },
];

const Skills = () => {
  const { gl } = useThree();
  return (
    <Html
      style={{ pointerEvents: "none" }}
      portal={{ current: gl.domElement.parentNode }}
      position={[0, 0.2, 0]}
      transform
      center
      scale={0.16}
    >
      <div className="hud-card skills-card">
        {/* Corner accents */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-br" />

        <div className="skills-header-row">
          <span className="skills-title">TECHNICAL SKILLS</span>
          <span className="skills-count">{skillCategories.reduce((a, c) => a + c.items.length, 0)} ITEMS</span>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="skills-category">
              <div className="skills-cat-label" style={{ color: cat.accent, borderColor: cat.accent }}>
                {cat.label}
              </div>
              <div className="skills-badges">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="skills-badge"
                    style={{
                      borderColor: `${cat.accent}66`,
                      color: cat.accent,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default Skills;
