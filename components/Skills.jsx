import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Skills = () => {
  
  const {gl} = useThree()
  return (
    <Html
      style={{ pointerEvents: "none" }}
      portal={{ current: gl.domElement.parentNode }}
      position={[0, -.05, 0]}
      transform
      center
      scale={0.13}
    >
    <div
      className="flex row-auto"
      style={{
        width: "700px",
        height: "180px",
      }}
    >
      <div className="about-me">
        <p className="text-white font-montserrat pl-3 pt-3 p-3 " style={{lineHeight: "30px"}}>
          <b>Languages:</b> TS/JS, Python, C++, C, HTML/CSS, SQL<br></br>
          <b>Frontend:</b> Next.js/React<br></br>
          <b>Backend:</b> Node.js/Express, Flask<br></br>
          <b>Databases:</b> PostgreSQL, MongoDB/Mongoose, Firebase<br></br>
          <b>Cloud & Tools:</b> AWS (EC2, S3, CW), Portainer, CI/CD (Gitlab CI).
        </p>
      </div>
      <div className="profile">
        <div className="skills-pic">
            <img src="images/code-symbol.svg" width={60}></img>
        </div>
        <p className="font-montserrat text-white text-xl mt-3">
          <b>Skills</b>
        </p>
      </div>
    </div>
    </Html>
  );
};

export default Skills;
