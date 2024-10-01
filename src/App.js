// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Cloud,
  Clouds,
  Environment,
  Float,
  Stars,
  Text,
  TrackballControls,
} from "@react-three/drei";
import { Planet3 } from "./components/Planet3";
import { degToRad } from "three/src/math/MathUtils.js";

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
];

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/fonts/Inter_24pt-Bold.ttf",
    // fontSize: Math.random() * 5,
    fontSize: 2,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    ref.current.material.color.lerp(
      color.set(hovered ? "#fa2720" : "white"),
      0.1
    );
  });
  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log("clicked")}
        {...fontProps}
        children={children}
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

export default function App() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
      <color attach="background" args={["#333"]} />
      {/* <fog attach="fog" args={["#202025", 0, 80]} /> */}
      <Suspense fallback={null}>
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
          <Planet3 rotation-y={degToRad(0)} scale={2.5} />
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

      <TrackballControls />
    </Canvas>
  );
}
