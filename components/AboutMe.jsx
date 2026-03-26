import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
const AboutMe = () => {
  const { gl } = useThree();
  return (
    <Html
      style={{ pointerEvents: "none" }}
      portal={{ current: gl.domElement.parentNode }}
      position={[-.66, -.03, 0]}
      transform
      center
      scale={0.13}
    >
      <div
        className="flex row-auto"
        style={{
          marginLeft: "30%",
          marginRight: "60%",
          width: "680px",
          height: "190px",
        }}
      >
        <div className="profile">
          <img src="images/prof-pic.png" className="profile-pic"></img>
          <p className="font-montserrat text-white text-xl mt-3">
            <b>About Me</b>
          </p>
        </div>
        <div className="about-me">
          <p
            className="text-white font-montserrat pl-3 pt-3 p-3 "
            style={{ lineHeight: "20px" }}
          >
            Based in Maastricht, Netherlands, I am a dynamic full-stack developer, and a CS
            graduate from OSU, Corvallis, US.
          </p>
          <p
            className="text-white font-montserrat pl-3 pt-0 p-3 "
            style={{ lineHeight: "20px" }}
          >
            My deep passion lies not only in coding, but also in unraveling
            intricate challenges through innovative solutions.
          </p>
          <p
            className="text-white font-montserrat pl-3 pt-0 p-3 "
            style={{ lineHeight: "20px" }}
          >
            I harness my prior experience in Architecture and Design to blend
            creative artistry with cutting-edge technology.
          </p>
        </div>
      </div>
    </Html>
  );
};

export default AboutMe;
