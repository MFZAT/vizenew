import { Html, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import style from "./style.scss";

const LoadingView = () => {
  return (
    <Html transform distanceFactor={20} center fullscreen>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className="text">
        Společná cesta k r
        <span className="letter-u">
          <span className="dot"></span>u
        </span>
        stu a inovacím
        <div></div>
        <div></div>
        <div></div>
      </h1>
    </Html>
  );
};

export default LoadingView;
