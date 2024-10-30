import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
  CameraControls,
  Cloud,
  Clouds,
  Environment,
  Float,
  OrbitControls,
  RandomizedLight,
  Stars,
  Text,
} from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import LoadingView from "../components/LoadingView";
import FormPage from "../components/FormPage";
import style from "../components/style.scss";
import { AnimatePresence } from "framer-motion";
import { Model2 } from "../components/PlanetModel2";
import { WithTie } from "../components/Tie";
import { Planetzat } from "../components/Planetzat";
import { button, useControls } from "leva";
import { ModelSmoothPlanet } from "../components/PlanetModelsmooth";

import { Allpose } from "../components/Allpose";

const wordData = [
  "Vysokorychlostní tratě (VRT)",
  "AI",
  "Vodík",
  "Technologie",
  " Diverzita a akceptace ",
  "Zvířata na pracovišti",
  "My Zaťáci  ",
  "Sebevědomí",
  "Důvěra",
  "Podpora",
  "Cíle",
  "Hodnoty",
  "Dynamičnost",
  "Inovace",
  "Výzvy",
  "Budoucnost",
  "Růst",
  "Trendy💡",
  "Výsledek ",

  "Digitalizace",
  "Malé modulární reaktory / SMR",
  "Decentralizace ",
  "Nové energetické zdroje",
  "Nové transfery energie",
  "Sdílená energetika",
  "Pracoviště jako místo setkávání",
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
    maxWidth: 14,
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
  console.log(words, words.length, texts);

  return words.map(([pos, word], index) => (
    <Float rotationIntensity={0} floatIntensity={3} floatingRange={[-0.3, 0.3]}>
      <Word key={word} position={pos} children={word}>
        {texts.length > 1 ? texts[index] : wordData[index]}
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

export default function World({ texts }) {
  const controls = useRef();
  const textcloud = useRef();
  const [hoveredGuy, setHoveredGuy] = useState(false);

  // useEffect(() => {
  //   // console.log("texts", texts);
  //   console.log("controls", controls);
  // });

  useFrame(() => {
    // controls.current.smoothTime = 0.0001;
    // controls.current.rotate(-0.01, 0, true);
    // textcloud.current.rotation.y += 0.01;
  });

  // useControls("Dolly", {
  //   in: button(() => controls.current.dolly(3, true)),
  //   out: button(() => controls.current.dolly(-3, true)),
  // });

  // useControls("truck", {
  //   up: button(() => controls.current.truck(0, -0.5, true)),
  //   down: button(() => controls.current.truck(0, 0.5, true)),
  //   left: button(() => controls.current.truck(-0.5, 0, true)),
  // });

  const guyHover = (e) => {
    e.stopPropagation();
    setHoveredGuy(true);
    // console.log("Guy");
  };
  const guyOut = () => setHoveredGuy(false);
  // const directionalCtl = useControls("Directional Light", {
  //   visible: true,
  //   position: {
  //     x: 3.3,
  //     y: 1.0,
  //     z: 4.4,
  //   },
  //   castShadow: true,
  // });

  return (
    <>
      {/* CAMERA     */}
      {/* <CameraControls ref={controls} minDistance={20} maxDistance={70} /> */}
      <OrbitControls
        // minPolarAngle={Math.PI / 4}
        // maxPolarAngle={Math.PI / 2}
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.5}
        ref={controls}
        minDistance={20}
        maxDistance={70}
        // enableDamping={false}
      />
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
      {/* <ambientLight intensity={3} color={new THREE.Color("white")} /> 
      <RandomizedLight
        amount={8}
        frames={100}
        position={[0, 0, 0]}
        castShadow
      /> */}
      <FollowCameraLight />
      {/* <hemisphereLight
        skycolor={new THREE.Color("lime")}
        groundColor={new THREE.Color("#efefef")}
        intensity={2}
        position={[0, 100, 100]}
      /> */}
      {/* <fog attach="fog" args={["#202025", 0, 80]} /> */}
      <Suspense fallback={<LoadingView />}>
        {/* TEXTS */}
        <Float rotationIntensity={2} floatIntensity={0}>
          <TextCloud count={5} radius={20} texts={texts} ref={textcloud} />
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
              color="lightblue"
              fade={1000}
            />
          </Clouds>
        </Float>
        {/* PLANET */}
        <Billboard>
          <ModelSmoothPlanet rotation-z={degToRad(0)} scale={2.5} />

          {/* CHARACTERS */}
          {/* <WithTie
            position={[1, 9.5, 3]}
            rotation-y={degToRad(-10)}
            rotation-x={degToRad(30)}
            rotation-z={degToRad(-5)}
            castShadow
            look
            withoutTie
          /> */}
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
