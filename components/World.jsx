import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three';
import { Monitor } from './Monitor';

// Materials that should stay as MeshStandardMaterial for environment map reflections
const KEEP_STANDARD = new Set(['tree_bush', 'ground', 'water', 'rock', 'tree_trunk', 'green_plant', 'rose_emissive']);

const materialCache = new Map();
function getSharedLambert(oldMat) {
  const key = [
    oldMat.color?.getHexString(),
    oldMat.emissive?.getHexString(),
    oldMat.emissiveIntensity,
    oldMat.opacity,
    oldMat.transparent,
    oldMat.map?.uuid,
    oldMat.emissiveMap?.uuid,
    oldMat.alphaMap?.uuid,
  ].join('|');
  if (materialCache.has(key)) return materialCache.get(key);
  const mat = new THREE.MeshLambertMaterial({
    color: oldMat.color,
    map: oldMat.map,
    emissive: oldMat.emissive,
    emissiveMap: oldMat.emissiveMap,
    emissiveIntensity: oldMat.emissiveIntensity,
    transparent: oldMat.transparent,
    opacity: oldMat.opacity,
    side: oldMat.side,
    alphaMap: oldMat.alphaMap,
  });
  materialCache.set(key, mat);
  return mat;
}

export function World(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/3d/world.glb', true)
  const { actions } = useAnimations(animations, group)

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Hide flame meshes — the Fire component renders these separately
        if (child.name === 'flame_red' || child.name === 'flame_white' || child.name === 'flame_yellow') {
          child.visible = false;
          return;
        }
        const oldMat = child.material;
        if (oldMat.isMeshStandardMaterial && KEEP_STANDARD.has(oldMat.name)) {
          child.material = getSharedLambert(oldMat);
        }
        child.frustumCulled = true;
      }
    });
  }, [scene]);

  // Find the monitor mesh to attach the Monitor HTML component
  const monitorMesh = useMemo(() => {
    let monitor = null;
    scene.traverse((child) => {
      if (child.name === 'pc_monitor') {
        monitor = child;
      }
    });
    return monitor;
  }, [scene]);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.play();
    });
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
      {monitorMesh && (
        <group
          position={monitorMesh.position}
          rotation={monitorMesh.rotation}
          scale={monitorMesh.scale}
        >
          <Monitor isAtPC={props.isAtPC} autoShowProjects={props.autoShowProjects} onSignIn={props.onSignIn} />
        </group>
      )}
    </group>
  )
}

useGLTF.preload('/3d/world.glb', true);
