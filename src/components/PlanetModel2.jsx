import * as THREE from "three";
import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function Model2(props) {
  const { nodes, materials } = useGLTF("/models/planetmodel.glb");
  console.log(materials);

  materials["Brown leaves.001"].color.set("#3f9c35");
  materials["Brown leaves.001"].blendColor = "multiply";
  materials["Brown leaves.001"].roughness = 1;
  materials["Brown leaves.001"].metalness = 1;

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="top"
          geometry={nodes.top.geometry}
          material={materials["Brown leaves.001"]}
        />
        <mesh
          name="bottom"
          geometry={nodes.bottom.geometry}
          material={materials["Brown leaves.001"]}
          position={[-0.013, 0.032, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <mesh
          name="bottom001"
          geometry={nodes.bottom001.geometry}
          material={materials["Brown leaves.001"]}
          position={[-0.013, 0.032, 0]}
          rotation={[0, 0, Math.PI]}
        />
        <mesh
          name="top001"
          geometry={nodes.top001.geometry}
          material={materials["Brown leaves.001"]}
        />
        <mesh
          name="middle002"
          geometry={nodes.middle002.geometry}
          material={materials["Brown leaves.001"]}
        />
        <mesh
          name="middle"
          geometry={nodes.middle.geometry}
          material={materials["Brown leaves.001"]}
        />
        <mesh
          name="middle001"
          geometry={nodes.middle001.geometry}
          material={materials["Brown leaves.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/planetmodel.glb");
