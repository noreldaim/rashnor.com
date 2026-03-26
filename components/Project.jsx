import React from "react";
import BackArrow from "./BackArrow";
const Project = ({
  title,
  description,
  stacks,
  projectLink,
  githubLink,
  gifSrc,
  setCurrentProject,
  setProjectsTab
}) => {
  return (
    <div className="projects-content">
      <div className="project-content">
        <BackArrow setCurrentProject={setCurrentProject} setProjectsTab={setProjectsTab}/>
        <h1 className="project-title">
          <b>{title}</b>
        </h1>
        <p className="project-description">
          {description}
        </p>
        <h2 className="project-subtitle">
          <b>Tech Stack</b>
        </h2>
        <div className="tech-stack">
            {stacks.map((stack) => (<p key={stack}>
            <b>- {stack}</b>
          </p>))}
          
        </div>
        
      </div>
      <div className="project-media">
        <img className="project-gif" src={gifSrc} loading="lazy" alt={`${title} demo`}></img>
        <div className="project-buttons">
          {projectLink && <a className="project-button" href={projectLink} target="_blank" rel="noreferrer">
            <b>Project</b>
          </a>}
          <a className="project-button" href={githubLink} target="_blank" rel="noreferrer">
            <b>Github</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Project;
