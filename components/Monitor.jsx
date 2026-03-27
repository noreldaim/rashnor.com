import React, { useEffect, useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DoubleSide } from "three";
import TypewriterText from "./TypewriterText";

const projects = [
  {
    id: "rashnor.com",
    description:
      "My personal portfolio website, built around a 3d world, using handcrafted 3d assets with Blender, the website showcases my personal info, skills, bio, and projects.",
    stacks: ["Next.js/React", "Three.js", "React Three Fiber", "Blender", "Theatre.js"],
    projectLink: "https://rashnor.com/",
    githubLink: "https://github.com/noreldaim/rashnor.com",
    gifSrc: "rashnor_dev.gif",
    tag: "WEB/3D",
  },
  {
    id: "Promptron",
    description:
      "A web application designed to inspire creativity and facilitate the sharing of AI prompts for platforms like ChatGPT and Midjourney.",
    stacks: ["Next.js/React.js", "Typescript/Tailwind", "MongoDB/Mongoose", "Firebase"],
    projectLink: "https://promptronai.vercel.app/",
    githubLink: "https://github.com/Rasheednour/promptron",
    gifSrc: "prompty_dumpty.gif",
    tag: "WEB/AI",
  },
  {
    id: "TCG_Central",
    description:
      "Interactive web app for designing and playing user-created Trading Card Games. Features extensive customization tools, deck building, game rule creation, and community sharing features.",
    stacks: ["Javascript/React.js", "Express.js/Node.js", "GCP/Firebase", "Phaser3"],
    projectLink: "https://drive.google.com/file/d/1W3c_vOSwjSZBPFG-4pvnqVuPfqh5Snro/view?usp=sharing",
    githubLink: "https://github.com/Rasheednour/TCG-Central",
    gifSrc: "tcg_central.gif",
    tag: "GAME",
  },
  {
    id: "Posts_API",
    description:
      "A REST API representing a simple social media application with support for user authentication, userposts, and comments.",
    stacks: ["Javascript/Pug", "Express.js/Node.js", "GCP/Google OAuth 2.0"],
    projectLink:
      "https://drive.google.com/file/d/1jVhmBvhAbVc3hE1X8ZCrpFHnon8dKRk_/view?usp=drive_link",
    githubLink: "https://github.com/Rasheednour/posts-api",
    gifSrc: "posts_api.gif",
    tag: "API",
  },
  {
    id: "Pomodoor",
    description:
      "A retro-style time management app with task creation, execution, and work time management features based on the Pomodoro technique.",
    stacks: ["Javascript/HTML/CSS", "React.js"],
    projectLink: "https://pomodoor-7j7okyyl9-rasheednour.vercel.app/",
    githubLink: "https://github.com/Rasheednour/pomodoor",
    gifSrc: "pomodoor.gif",
    tag: "WEB",
  },
  {
    id: "OpenCL_PS",
    description:
      "This C++ particle simulator app leverages OpenCL/OpenGL and parallel programming to simulate a particle system where particles bounce off spheres and change colors upon impact.",
    stacks: ["OpenCL/OpenGL", "C++", "GLUI", "Parallel Programming"],
    githubLink: "https://github.com/Rasheednour/openCL-particle-effect-simulatorr",
    gifSrc: "particles.png",
    tag: "GPU",
  },
  {
    id: "SmallSH",
    description:
      "A mini shell program written in C. The program provides a command-line interface for executing shell commands.",
    stacks: ["C"],
    githubLink: "https://github.com/Rasheednour/smallsh-",
    gifSrc: "smallsh.gif",
    tag: "SYS",
  },
];

/* ─── Bio Content ──────────────────────────────── */
function BioView() {
  return (
    <div>

      <div className="term-prompt">
        C:\RASHEED{">"} <span className="term-prompt-cmd">cat timeline.log</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">1990</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">Born in Madani, Sudan</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">2013</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">B.Sc. Architecture</span>
        <span className="term-timeline-sub">University of Khartoum</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">2014</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">Architect (6 years)</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">2020</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">Design Manager (2 years)</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">2023</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">B.Sc. Computer Science</span>
        <span className="term-timeline-sub">Oregon State University</span>
      </div>

      <div className="term-timeline-row">
        <span className="term-timeline-year">cur.</span>
        <span className="term-timeline-connector">──</span>
        <span className="term-timeline-text">Lead Fullstack Developer</span>
        <span className="term-timeline-sub">AgriData Innovations</span>
      </div>

      <div style={{ marginTop: 10 }}>
        <div className="term-prompt">
          C:\RASHEED{">"} <span className="term-cursor-blink" />
        </div>
      </div>
    </div>
  );
}

/* ─── Projects List ────────────────────────────── */
function ProjectsList({ onSelect, selectedIdx, onHover, hoveredIdx }) {
  return (
    <div>
      <div className="term-list-header">
        <span>NAME</span>
        <span>TYPE</span>
      </div>
      {projects.map((p, i) => (
        <div
          key={p.id}
          className={`term-project-row ${hoveredIdx === i ? "selected" : ""}`}
          onClick={() => onSelect(i)}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(-1)}
        >
          <span className="term-project-cursor">{hoveredIdx === i ? "\u25B6" : " "}</span>
          <span className="term-project-name">{p.id}</span>
          <span className="term-project-tag">[{p.tag}]</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Project Detail ───────────────────────────── */
function ProjectDetail({ project, onBack }) {
  return (
    <div className="term-detail">
      <div className="term-detail-header">
        <span className="term-back-btn" onClick={onBack}>ESC</span>
        <span className="term-detail-title">{project.id}</span>
        <div className="term-actions">
          {project.projectLink && (
            <a
              className="term-action-btn"
              href={project.projectLink}
              target="_blank"
              rel="noreferrer"
            >
              <span className="fkey">F5</span> DEMO
            </a>
          )}
          <a
            className="term-action-btn"
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="fkey">F6</span> SOURCE
          </a>
      </div>
      </div>


        

      <div className="flex">
        <div className="flex flex-col flex-1">
          <div className="term-detail-desc">{project.description}</div>
          <div className="term-stack-section">
            <div className="term-stack-badges">
              {project.stacks.map((s) => (
                <span key={s} className="term-badge">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="term-gif-frame">
            <img
              src={`images/${project.gifSrc}`}
              alt={`${project.id} demo`}
              loading="lazy"
            />
            <span className="term-gif-label">PREVIEW</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Monitor Shell ────────────────────────────── */
export function Monitor({ isAtPC, autoShowProjects, onSignIn }) {
  const { gl } = useThree();
  const [view, setView] = useState("bio"); // "bio" | "projects" | "detail"
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [signedIn, setSignedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Show sign-in button after a short delay when arriving at PC
  useEffect(() => {
    if (isAtPC && !signedIn) {
      const timer = setTimeout(() => setShowSignIn(true), 800);
      return () => clearTimeout(timer);
    }
    if (!isAtPC) {
      setShowSignIn(false);
      setSignedIn(false);
    }
  }, [isAtPC, signedIn]);

  const handleSignIn = () => {
    setSignedIn(true);
    setShowSignIn(false);
    if (onSignIn) onSignIn();
  };

  // Always start at bio on sign-in
  useEffect(() => {
    if (signedIn) {
      setView("bio");
      setSelectedProject(null);
    }
  }, [signedIn]);

  const openProject = (idx) => {
    setSelectedProject(idx);
    setView("detail");
  };

  const goBack = () => {
    setSelectedProject(null);
    setView("projects");
  };

  const statusText = () => {
    if (view === "bio") return ["RASHEED NORELDAIM", "TERMINAL v1.0"];
    if (view === "projects") return [`${projects.length} items`, "SELECT TO VIEW"];
    if (view === "detail" && selectedProject !== null)
      return ["", ""];
    return ["", ""];
  };

  const [statusLeft, statusRight] = statusText();

  return (
    <Html
      transform
      portal={{ current: gl.domElement.parentNode }}
      position={[0, 0, 0]}
      rotation-x={Math.PI}
      rotation-z={Math.PI}
      rotation-y={Math.PI}
      scale={0.02958}
      material={
        <meshPhysicalMaterial side={DoubleSide} transparent opacity={1} />
      }
    >
      <div className="term-wrapper">
        <div className="crt">
          {!isAtPC ? (
            <div className="term-boot">
              <img src="images/skynet.png" width={330} alt="boot" />
              <TypewriterText text={"****"} />
            </div>
          ) : !signedIn ? (
            <div className="term-boot">
              <img src="images/skynet.png" width={330} alt="boot" />
              {showSignIn && (
                <button className="term-signin-btn" onClick={handleSignIn}>
                  <span className="term-cursor-blink" style={{ marginRight: 8 }} />
                  SIGN IN
                </button>
              )}
            </div>
          ) : (
            <div className="term-screen">
              {/* Title bar */}
              <div className="term-titlebar">
                <span className="term-titlebar-label">RASHNOR.SYS</span>
                <span className="term-titlebar-time">v1.0</span>
              </div>

              {/* Navigation */}
              <div className="term-nav">
                <button
                  className={`term-nav-btn ${view === "bio" ? "active" : ""}`}
                  onClick={() => { setView("bio"); setSelectedProject(null); }}
                >
                  <span className="fkey">F1</span> BIO
                </button>
                <button
                  className={`term-nav-btn ${view === "projects" || view === "detail" ? "active" : ""}`}
                  onClick={() => { setView("projects"); setSelectedProject(null); }}
                >
                  <span className="fkey">F2</span> PROJECTS
                </button>
              </div>

              {/* Content */}
              <div className="term-content">
                {view === "bio" && <BioView />}
                {view === "projects" && (
                  <ProjectsList
                    onSelect={openProject}
                    onHover={setHoveredIdx}
                    hoveredIdx={hoveredIdx}
                  />
                )}
                {view === "detail" && selectedProject !== null && (
                  <ProjectDetail
                    project={projects[selectedProject]}
                    onBack={goBack}
                  />
                )}
              </div>

              {/* Status bar */}
              {statusLeft && statusRight && 
              <div className="term-statusbar">
                <span>{statusLeft}</span>
                <span>{statusRight}</span>
              </div>}
              
            </div>
          )}
        </div>
      </div>
    </Html>
  );
}
