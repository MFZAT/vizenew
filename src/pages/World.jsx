import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Cloud,
  Clouds,
  Environment,
  Float,
  OrbitControls,
  Outlines,
  Stars,
  Stats,
  Text,
  TrackballControls,
} from "@react-three/drei";
import { Planet1 } from "../components/Planet1";
import { Planet3 } from "../components/Planet3";

import { degToRad } from "three/src/math/MathUtils.js";
import { useControls } from "leva";
import { Guy } from "../components/Guy";

const wordData = [
  "Vysokorychlostní tratě (VRT)",

  "AI",
  "Vodík",
  "Technologie",
  " Diverzita a akceptace ",
  "Zvířata na pracovišti",

  "My Zaťáci",
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
  "Trendy",
  "Digitalizace",
  "Malé modulární reaktory / SMR",
  "Decentralizace ",
  "Nové energetické zdroje",
  "Nové transfery energie",
  "Sdílená energetika",
  "Pracoviště jako místo setkávání",
  "Digitalizace",
  "Malé modulární reaktory / SMR",
  "Decentralizace ",
  "Nové energetické zdroje",
  "Nové transfery energie",
  "Sdílená energetika",
  "Pracoviště jako místo setkávání",
  "Digitalizace",
  "Malé modulární reaktory / SMR",
  "Decentralizace ",
  "Nové energetické zdroje",
  "Nové transfery energie",
  "Sdílená energetika",
  "Pracoviště jako místo setkávání",
  "My Zaťáci",
  "Sebevědomí",
];

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const { name, stroke } = useControls({
    // name: wordData[0],
    stroke: "#fff",
  });
  const fillOpacity = useControls("Text fill", {
    opacity: 0.5,
    fill: "white",
  });

  const fontProps = {
    font: "/fonts/Exo2-Medium.ttf",
    // fontSize: Math.random() * 5,
    fontSize: 2,
    letterSpacing: -0.05,
    lineHeight: 1,
    // fillOpacity: 0,
    strokeWidth: "2.5%",
    strokeColor: "#ffffff",
    maxWidth: 15,
    overflowWrap: "break-word",
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
    
        strokeColor={stroke}
        fillOpacity={fillOpacity.opacity}
        color={fillOpacity.fill}
        // opacity={opacity}
      >
        {children}
      </Text>
    </Billboard>
  );
}

function TextCloud({ count = 8, radius = 20 }) {
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
  console.log(words, words.length);

  return words.map(([pos, word], index) => (
    <Float>
      <Word key={index} position={pos} children={word}>
        {wordData[index]}
      </Word>
    </Float>
  ));
}

export default function World() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <color attach="background" args={["#333"]} />
      {/* <fog attach="fog" args={["#202025", 0, 80]} /> */}
      <Suspense fallback={"uuu"}>
        <group>
          <TextCloud count={5} radius={20} />
        </group>
        <Float>
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
              color="skyblue"
              fade={1000}
            />
          </Clouds>
        </Float>
    
        <Float floatIntensity={2} rotationIntensity={0}>
          {/* <Billboard> */}
          <Planet3 rotation-y={degToRad(0)} scale={2.5} />
    <Guy position={[-6,2.6,6]} rotation-y={degToRad(30)}/>
    <Guy position={[4,-6,6]} rotation-y={degToRad(15)}/>
    <Guy position={[3,9,3]} rotation-y={degToRad(0)}/>
          {/* <Planet3 rotation-y={degToRad(0)} scale={2.5} /> */}
          {/* </Billboard> */}
        </Float>
      
        <Environment preset="forest" />
        <Stars
          radius={50}
          depth={50}
          count={100}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />
      </Suspense>
      {/* <axesHelper args={[50]} />
      <gridHelper /> */}
      {/* <TrackballControls /> */}
      <OrbitControls />
      {/* <Stats /> */}
    </Canvas>
  );
}
