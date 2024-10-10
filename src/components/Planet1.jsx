import React from "react";
import { Outlines, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Planet1(props) {
  const { nodes, materials } = useGLTF("/models/zatplanet4.glb");
  const map = useTexture(
    "/textures/Poliigon_GrassPatchyGround_4585_BaseColor.jpg"
  );
  // const displacementMap = useTexture(
  //   "/textures/Poliigon_GrassPatchyGround_4585_Displacement.tiff"
  // );
  const normalMap = useTexture(
    "/textures/Poliigon_GrassPatchyGround_4585_Normal.png"
  );
  const rougnessMap = useTexture(
    "/textures/Poliigon_GrassPatchyGround_4585_Roughness.jpg"
  );

  const material = new THREE.MeshStandardMaterial();

  material.map = map;
  material.normalMap = normalMap;
  // material.displacementMap = displacementMap;
  material.displacementScale = 0.01;
  material.roughnessMap = rougnessMap;
  // material.wireframe = true;
  material.color.set(0x00ee44);
  // material.flatShading = false;
  material.blendColor = "multiply";
  // material.wireframe = true;

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Sphere"
          geometry={nodes.Sphere.geometry}
          material={material}
          scale={[4, 4, 4]}
        >  <Outlines thickness={1} color="black"  /></mesh>
        <group>
          <mesh
            name="Sphere003"
            geometry={nodes.Sphere003.geometry}
            material={material}
            scale={[4.002, 4.018, 4.003]}
          ><Outlines thickness={1} color="black" /></mesh>
        </group>
        <group name="Overlay" args={[1, 1, 100, 100]}>
          <mesh
            name="Sphere004"
            geometry={nodes.Sphere004.geometry}
            material={material}
            scale={[4.002, 4.018, 4.003]}
            ><Outlines thickness={1} color="black" /></mesh>
        </group>
        <mesh
          name="Sphere005"
          geometry={nodes.Sphere005.geometry}
          material={material}
          scale={[4.002, 4.018, 4.003]}
          ><Outlines thickness={1} color="black" /></mesh>

        {/* <mesh
          name="Sphere002"
          geometry={nodes.Sphere002.geometry}
          material={material}
          scale={[4.002, 4.018, 4.003]}
          position={[-6.985, 4.56, -4.674]}
        /> */}
      </group>

      {/* <mesh>
          <sphereGeometry args={[1, 100]} />
        </mesh> */}
    </group>
  );
}

useGLTF.preload("/models/zatplanet.glb");
