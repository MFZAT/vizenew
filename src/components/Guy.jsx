/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/guy.glb -o src/components/Guy.jsx -k -K -r public 
*/

import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Outlines } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from "three";

export function Guy(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/guy.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  // const { actions } = useAnimations(animations, group)

  const material = new THREE.MeshStandardMaterial();
  material.color.set(0x00ee44);

  const handsMaterial = new THREE.MeshStandardMaterial();
  handsMaterial.color.set(0x000000);

  const headMaterial = new THREE.MeshStandardMaterial();
  headMaterial.color.set(0xffffff);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="2D-Rig-Eyes-008" geometry={nodes['2D-Rig-Eyes-008'].geometry} material={materials['2D-Rig-Eyes-008']} skeleton={nodes['2D-Rig-Eyes-008'].skeleton} />
          <skinnedMesh name="2D-Rig-Mouth-008" geometry={nodes['2D-Rig-Mouth-008'].geometry} material={materials['2D-Rig-Mouth-008']} skeleton={nodes['2D-Rig-Mouth-008'].skeleton} />
          <skinnedMesh name="arms" geometry={nodes.arms.geometry} material={handsMaterial} skeleton={nodes.arms.skeleton} />
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={material} skeleton={nodes.body.skeleton}> </skinnedMesh>
          <skinnedMesh name="feet" geometry={nodes.feet.geometry} material={handsMaterial} skeleton={nodes.feet.skeleton} />
          <skinnedMesh name="head" geometry={nodes.head.geometry} material={headMaterial} skeleton={nodes.head.skeleton}   >  <Outlines thickness={1} color="black"  /></skinnedMesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/guy.glb')
