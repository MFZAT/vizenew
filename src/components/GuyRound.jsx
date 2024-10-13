/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/guyround.glb -o src/components/GuyRound.jsx -k -K -r public 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Outlines } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function GuyRound(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/guyround.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, names } = useAnimations(animations, group)
  console.log(actions)

  useEffect(() => {
    actions.idle2.play();

  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
  
    
        <group name="Armature001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="body001" geometry={nodes.body001.geometry} material={materials['Material.001']} skeleton={nodes.body001.skeleton} />
          <skinnedMesh name="eyes" geometry={nodes.eyes.geometry} material={materials['Material.008']} skeleton={nodes.eyes.skeleton} />
          <skinnedMesh name="feet001" geometry={nodes.feet001.geometry} material={materials['Material.006']} skeleton={nodes.feet001.skeleton} />
          <skinnedMesh name="hands" geometry={nodes.hands.geometry} material={materials['Material.010']} skeleton={nodes.hands.skeleton} />
          <skinnedMesh name="head001" geometry={nodes.head001.geometry} material={materials['Material.005']} skeleton={nodes.head001.skeleton} >  <Outlines thickness={1} color="black"  /> </skinnedMesh>
          <skinnedMesh name="mouth" geometry={nodes.mouth.geometry} material={materials['Material.009']} skeleton={nodes.mouth.skeleton} />
        </group>
   
    </group>
  )
}

useGLTF.preload('/models/guyround.glb')
