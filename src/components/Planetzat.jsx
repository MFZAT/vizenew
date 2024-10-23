/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/planetmodelzatleaves.glb -o src/components/Planetzat.jsx -k -K -r public 
*/

import React from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

export function Planetzat(props) {
  const { nodes, materials } = useGLTF("/models/planetmodelzatleaves.glb");
  console.log(materials);
  materials["Brown leaves.001"].roughness = 1;
  materials["Brown leaves.001"].metalness = 0;

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="middle002" />
        <mesh
          name="top"
          geometry={nodes.top.geometry}
          material={materials.leavesbgr}
          receiveShadow
        />
        <mesh
          name="bottom"
          geometry={nodes.bottom.geometry}
          material={materials.leavesbgr}
          position={[-0.013, 0.032, 0]}
          rotation={[0, 0, Math.PI]}
          receiveShadow
        />
        <mesh
          name="bottom001"
          geometry={nodes.bottom001.geometry}
          material={materials.leavesbgr}
          position={[-0.013, 0.032, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <mesh
          name="top001"
          geometry={nodes.top001.geometry}
          material={materials.leavesbgr}
        />
        <mesh
          name="middle"
          geometry={nodes.middle.geometry}
          material={materials.leavesbgr}
          receiveShadow
        />
        <mesh
          name="middle001"
          geometry={nodes.middle001.geometry}
          material={materials.leavesbgr}
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/planetmodelzatleaves.glb");
