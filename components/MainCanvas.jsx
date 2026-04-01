"use client";
import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { World } from "./World";
import {
  ScrollControls,
  useScroll,
  Stars,
  Sky,
  Environment,
  PresentationControls,
  Loader,
} from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";
import walkthrough from "@public/walkthrough.json";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import MonitorLight from "./MonitorLight";
import { Fire } from "./Fire";

const Scene = ({ isAtPC, setIsAtPC }) => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const sequenceLength = useRef(val(sheet.sequence.pointer.length));
  const lastPosition = useRef(-1);
  useFrame(() => {
    const newPosition = scroll.offset * sequenceLength.current;
    if (Math.abs(newPosition - lastPosition.current) > 0.001) {
      lastPosition.current = newPosition;
      sheet.sequence.position = newPosition;
    }
    if (newPosition > 5.5) {
      if (!isAtPC) setIsAtPC(true);
    } else {
      if (isAtPC) setIsAtPC(false);
    }
  });
};

const AutoScroll = ({ setScroll }) => {
  const scroll = useScroll();
  useEffect(() => {
    setScroll(scroll);
  }, [scroll, setScroll]);
  return null;
};

const MainCanvas = ({ setScroll, autoShowProjects, onSignIn }) => {
  const sheet = getProject("Walkthrough", { state: walkthrough }).sheet(
    "Scene"
  );
  const [isAtPC, setIsAtPC] = useState(false);

  return (
    <div className="absolute z-0 w-full h-full">
      <Canvas
        style={{ touchAction: "none" }}
      >
        <color attach="background" args={["#0a0a2e"]} />
        <fog attach="fog" args={["#0a0a2e", 8, 30]} />
        <ScrollControls pages={5} damping={0.1}>
          <SheetProvider sheet={sheet}>
            <Suspense fallback={null}>
            <AutoScroll setScroll={setScroll} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={1}
              fade
              speed={1}
            />
            <ambientLight intensity={0.15} />
            <hemisphereLight args={["#6f8fff", "#0a0a2e", 0.6]} />
            <directionalLight
              name="skylight"
              intensity={2.5}
              decay={3}
              color="#6f8fff"
              position={[0.095, 9.303, 0.144]}
              rotation={[-1.303, 0.278, 2.143]}
            />
            <spotLight
              position={[0, 2, 0]}
              distance={10}
              intensity={12}
              angle={0.65}
              color="white"
              penumbra={1.9}
            />
            <Sky
              distance={1000}
              sunPosition={[0, 0, 0]}
              inclination={0}
              azimuth={0.25}
            />
            <Environment
              files={"images/ice_lake.hdr"}
              rotation-z={Math.PI / 2}
            />
            <PresentationControls
              snap
              global
              zoom={1}
              rotation={[0, 0, 0]}
              polar={[0, 0]}
              azimuth={[-Math.PI / 22, Math.PI / 22]}
            >
              <Fire style={{ touchAction: "none" }} />
              <World isAtPC={isAtPC} autoShowProjects={autoShowProjects} onSignIn={onSignIn} />
              <MonitorLight />
            </PresentationControls>

            <PerspectiveCamera
              theatreKey="Camera"
              makeDefault
              position={[0, 0, 0]}
              fov={30}
              near={0.1}
              far={300}
            />
            <e.mesh
              theatreKey="scroll-prompt"
              visible={false}
              position={[-0.85, 0.8, -0.85]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <boxGeometry args={[1.5, 0.66, 0.01]} />
              <meshBasicMaterial transparent opacity={0} />
            </e.mesh>
            <e.mesh
              theatreKey="about"
              visible
              position={[0, 1, 0]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <boxGeometry args={[2.3, 0.66, 0.01]} />
              <meshBasicMaterial transparent opacity={0} />
              <AboutMe />
            </e.mesh>
            <e.mesh
              theatreKey="skills"
              visible
              position={[0.1, 0.8, 0]}
              rotation={[0, 0, 0]}
            >
              <boxGeometry args={[2.5, 0.8, 0.01]} />
              <meshBasicMaterial transparent opacity={0} />
              <Skills />
            </e.mesh>
            <Scene isAtPC={isAtPC} setIsAtPC={setIsAtPC} />
            {/* <Stats /> */}
            </Suspense>
          </SheetProvider>
        </ScrollControls>
      </Canvas>
      <Loader />
    </div>
  );
};

export default MainCanvas;
