/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/guyanimated3.glb -o src/components/Guy1.jsx -k -K -r public 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Guy1(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/guyanimated3.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, names } = useAnimations(animations, group)
  console.log('guy1 actions', actions)


  useEffect(() => {
  
      actions[names[1]].reset().fadeIn(0.5).play()

   
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="2D-Rig-Eyes-008" geometry={nodes['2D-Rig-Eyes-008'].geometry} material={materials['2D-Rig-Eyes-008']} skeleton={nodes['2D-Rig-Eyes-008'].skeleton} />
          <skinnedMesh name="2D-Rig-Mouth-008" geometry={nodes['2D-Rig-Mouth-008'].geometry} material={materials['2D-Rig-Mouth-008']} skeleton={nodes['2D-Rig-Mouth-008'].skeleton} />
          <skinnedMesh name="arms" geometry={nodes.arms.geometry} material={materials['Material.003']} skeleton={nodes.arms.skeleton} />
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={materials['Material.001']} skeleton={nodes.body.skeleton} />
          <skinnedMesh name="feet" geometry={nodes.feet.geometry} material={materials['Material.002']} skeleton={nodes.feet.skeleton} />
          <skinnedMesh name="head" geometry={nodes.head.geometry} material={nodes.head.material} skeleton={nodes.head.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/guyanimated3.glb')
