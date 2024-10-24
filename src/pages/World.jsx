import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Billboard,
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
    <Word key={word} position={pos} children={word}>
      {texts.length > 1 ? texts[index] : wordData[index]}
    </Word>
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
      <ambientLight intensity={5} ref={lightRef} />
      {/* <directionalLight ref={lightRef} intensity={10} /> */}
    </>
  );
}

export default function World() {
  const [hoveredGuy, setHoveredGuy] = useState(false);
  const [texts, setTexts] = useState("");
  const [openForm, setOpenForm] = useState(false);
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

  const handleFormData = (childdata) => {
    setTexts(childdata);
    console.log(texts);
    return texts;
  };

  const handleOpenForm = () => {
    setOpenForm(!openForm);
    console.log("open form", openForm);
  };

  return (
    <>
      <AnimatePresence>
        {openForm && <FormPage formData={handleFormData} />}
      </AnimatePresence>

      <button
        className="bg-transparent h-8 w-8 absolute left-0 z-20 rounded-full flex justify-center items-center text-white"
        onClick={handleOpenForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6   ${
            !openForm && "-rotate-180"
          } transition-transform`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </button>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        <color attach="background" args={["#333"]} />

        {/* LIGHTS */}
        <ambientLight intensity={3} />
        <RandomizedLight
          amount={8}
          frames={100}
          position={[0, 0, 0]}
          castShadow
        />
        {/* <FollowCameraLight /> */}

        {/* <fog attach="fog" args={["#202025", 0, 80]} /> */}
        <Suspense fallback={<LoadingView />}>
          {/* TEXTS */}
          <Float rotationIntensity={5} floatIntensity={2}>
            <group>
              <TextCloud count={5} radius={20} texts={texts} />
            </group>
          </Float>
          <Float>
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
                color="skyblue"
                fade={1000}
              />
            </Clouds>
          </Float>

          {/* PLANET */}
          <Billboard>
            <Planetzat rotation-y={degToRad(5)} scale={2.5} />

            {/* CHARACTERS */}
            <WithTie
              position={[1, 9.5, 3]}
              rotation-y={degToRad(-10)}
              rotation-x={degToRad(30)}
              rotation-z={degToRad(-5)}
              castShadow
              look
              withoutTie
            />

            {/* <Guy1 position={[4,-6,5.5]} rotation-y={degToRad(15)} castShadow/> */}
            <WithTie
              position={[-3, 9, 3]}
              rotation-z={degToRad(6)}
              castShadow
              wave
            />

            <WithTie
              position={[-6, 2.45, 6]}
              rotation-z={degToRad(6)}
              castShadow
              idle
            />

            {/* <PresentationControls
 global
        config={{ mass: 2, tension: 500, friction:26 }}
        snap={{ mass: 2, tension: 1000 }}
        rotation={[0, 0, 0]}
        // polar={[-Math.PI / 3, Math.PI / 3]}
        // azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        > */}

            {/* <Guy
              position={[1, 9.5, 3]}
              rotation-y={degToRad(-10)}
              rotation-x={degToRad(30)}
              rotation-z={degToRad(-5)}
              castShadow
              onPointerOver={guyHover}
              onPointerOut={guyOut}
              hoveredThis={hoveredGuy}
            /> */}

            {/* <GuySit
              position={[2, -5.8, 7.5]}
              rotation-y={degToRad(15)}
              castShadow
              sit
              onPointerOver={guyHover}
              onPointerOut={guyOut}
              hoveredThis={hoveredGuy}
            /> */}
            <WithTie
              position={[2, -5.8, 7.5]}
              rotation-y={degToRad(30)}
              castShadow
              sit
            />
            <WithTie
              position={[1, 2.9, 9.2]}
              rotation-y={degToRad(30)}
              castShadow
              sit
              withoutTie
            />

            {/* </PresentationControls> */}
          </Billboard>

          {/* <Environment preset="park" /> */}
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
        {/* <axesHelper args={[50]} />
      <gridHelper /> */}
        {/* <TrackballControls /> */}
        {/* <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.25}
          scale={10}
          blur={1.5}
          far={0.8}
        /> */}
        <OrbitControls minDistance={20} maxDistance={70} />
        {/* <Stats /> */}
      </Canvas>
    </>
  );
}
