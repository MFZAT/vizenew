import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  Cloud,
  Clouds,
  Float,
  OrbitControls,
  RandomizedLight,
  Stars,
  Text,
} from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import LoadingView from "../components/LoadingView";
import style from "../components/style.scss";
import { ModelSmoothPlanet } from "../components/PlanetModelsmooth";

import { Allpose } from "../components/Allpose";

const wordData = [
  "technologie",
  "technické prostředky",
  "umělá inteligence",
  "matematické modelování",
  "digitální dvojčata",
  "kybernetická bezpečnost",
  "decentralizace",
  "distribuční systémy",
  "regulační algoritmy",
  "konkurenční výhoda",
  "rozšířená realita",
  "virtuální elektrárny",
  "modernizace platforem",
  "využití dat",
  "big data",
  "inovace",
  "automatizace",
  "digitalizace",
  "algoritmy",
  "prediktivní analýza",
  "virtualizace",
  "cloudové technologie",
  "adaptivní systémy",
  "optimalizace procesů",
  "simulace",
  "technologická integrace",
  "udržitelné technologie",
  "IoT",
  "datové analýzy",
  "digitální transformace",
  "virtuální realita",
];

function Word({ children, ...props }) {
  // const { stroke } = useControls({
  //   stroke: "#fff",
  // });
  // const fillOpacity = useControls("Text fill", {
  //   opacity: 0.5,
  //   fill: "white",
  // });

  const fontProps = {
    font: "/fonts/IndieFlower-Regular.ttf",
    // fontSize: Math.random() * 5,
    fontSize: 2,
    letterSpacing: 0,
    lineHeight: 1,
    // fillOpacity: 0,
    strokeWidth: "3%",
    strokeColor: "#ffffff",
    maxWidth: 20,
    overflowWrap: "break-word",
    textAlign: "center",
    "material-toneMapped": true,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const over = (e) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    // ref.current.material.color.lerp(
    //   color.set(hovered ? "green" : "white"),
    //   0.1
    // );
    // if (hovered) {
    //   ref.current.fillOpacity = 1;
    //   ref.current.color = "red";
    // } else {
    //   ref.current.fillOpacity = 0;
    //   ref.current.color = fillOpacity.color;
    // }
    // ref.current.fontProps.strokeColor.lerp(
    //   strokeColor.set(hovered ? "green" : "white"),
    //   0.1
    // );
  });
  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onPointerDown={() => {
          setSelected(!selected);
        }}
        onClick={() => console.log("clicked")}
        {...fontProps}
        children={children}
        strokeColor={"#fff"}
        fillOpacity={0.5}
        color={"#fff"}
        castShadow
        // opacity={opacity}
      >
        {children}
      </Text>
    </Billboard>
  );
}

function TextCloud({ count = 8, radius = 20, texts }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;

    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
        ]);

    return temp;
  }, [count, radius]);
  console.log(words, words.length, wordData.length);

  return words.map(([pos, word], index) => (
    <Float rotationIntensity={0} floatIntensity={3} floatingRange={[-0.3, 0.3]}>
      <Word key={word} position={pos} children={word}>
        {wordData[index]}
      </Word>
    </Float>
  ));
}

function FollowCameraLight() {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    lightRef.current.position.copy(camera.position);
  });

  return (
    <>
      {/* <directionalLight ref={lightRef} position={[0, 10, -20]} intensity={5} /> */}
      {/* <directionalLight intensity={5} /> */}

      {/* <RandomizedLight amount={8} frames={100} position={[0, 0, 0]} /> */}
      <ambientLight intensity={3} ref={lightRef} />
      <directionalLight ref={lightRef} intensity={3} />
    </>
  );
}

export default function Panel2({ texts }) {
  const controls = useRef();
  const textcloud = useRef();
  const dirLight = useRef();
  const [hoveredGuy, setHoveredGuy] = useState(false);

  return (
    <>
      {/* CAMERA     */}
      {/* <CameraControls ref={controls} minDistance={20} maxDistance={70} /> */}
      {/* 
        <mesh
          ref={meshFitCameraHome}
          position-z={1.5}
          position-x={1}
          visible={false}
        >
          <boxGeometry args={[10, 10, 10]} />
          <meshBasicMaterial color="orange" />
        </mesh> */}
      {/* LIGHTS */}
      <ambientLight intensity={3} color={new THREE.Color("white")} />
      <RandomizedLight
        amount={8}
        frames={100}
        position={[0, 0, 0]}
        castShadow
      />

      {/* <FollowCameraLight /> */}
      {/* <hemisphereLight
        skycolor={new THREE.Color("lime")}
        groundColor={new THREE.Color("#efefef")}
        intensity={2}
        position={[0, 100, 100]}
      /> */}
      {/* <fog attach="fog" args={["#202025", 0, 80]} /> */}
      <Suspense fallback={<LoadingView />}>
        <OrbitControls
          // minPolarAngle={Math.PI / 4}
          // maxPolarAngle={Math.PI / 2}
          // minAzimuthAngle={-Math.PI / 4}
          // maxAzimuthAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={20}
          maxDistance={70}
          // enableDamping={false}
          // target={[0, 5, 10]}
        />
        {/* TEXTS */}
        <Float rotationIntensity={2} floatIntensity={0}>
          <TextCloud count={6} radius={20} texts={texts} ref={textcloud} />
        </Float>
        <Float rotationIntensity={2} floatIntensity={5} floatingRange={[1, -1]}>
          {/* SPACE */}
          <Clouds material={THREE.MeshBasicMaterial}>
            <Cloud
              bounds={[15, 15, 15]}
              seed={20}
              scale={1}
              volume={10}
              color="white"
              fade={500}
            />
            <Cloud
              bounds={[10, 10, 10]}
              seed={200}
              scale={2}
              volume={50}
              color="snow"
              fade={1000}
            />
          </Clouds>
        </Float>
        {/* PLANET */}
        <Billboard>
          <ModelSmoothPlanet rotation-z={degToRad(0)} scale={2.5} />

          {/* CHARACTERS */}

          <Allpose
            position={[1, 9.5, 3]}
            rotation-y={degToRad(-10)}
            rotation-x={degToRad(30)}
            rotation-z={degToRad(-5)}
            castShadow
            wave
            tie
          />

          <Allpose
            happy
            position={[-3.5, 9, 3]}
            rotation-z={degToRad(15)}
            castShadow
          />
          <Allpose
            happy
            position={[5, 8.3, 3]}
            rotation-x={degToRad(45)}
            rotation-z={degToRad(-10)}
            castShadow
          />
          <Allpose
            position={[-4.3, 2.4, 8.4]}
            rotation-y={degToRad(10)}
            rotation-x={degToRad(10)}
            castShadow
            sit2
          />

          <Allpose
            position={[-2, 2.65, 9.3]}
            rotation-z={degToRad(10)}
            rotation-x={degToRad(10)}
            castShadow
            tie
          />
          <Allpose
            position={[0, 2.9, 9.2]}
            rotation-y={degToRad(10)}
            rotation-x={degToRad(10)}
            castShadow
            sit
          />

          <Allpose
            position={[4, -5.6, 6]}
            rotation-y={degToRad(30)}
            castShadow
            happy
          />
          <Allpose
            position={[1, -5.2, 8]}
            rotation-y={degToRad(10)}
            castShadow
            happy2
            tie
          />

          {/* </PresentationControls> */}
        </Billboard>
        {/* <Environment preset="sunset" /> */}
        <Stars
          radius={50}
          depth={50}
          count={200}
          factor={Math.floor(Math.random() * 10)}
          saturation={0.5}
          fade
          speed={3}
        />
      </Suspense>
    </>
  );
}
