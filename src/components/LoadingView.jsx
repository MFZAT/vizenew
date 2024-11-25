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
        Spole
        <span className="letter-c">
          c
          <svg
            id="LIST"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 182.98 148.92"
            width="48"
            height="48"
            className="left"
          >
            <defs>
              <style></style>
              <linearGradient
                id="Nepojmenovaný_přechod_51"
                data-name="Nepojmenovaný přechod 51"
                x1="18.82"
                y1="80.96"
                x2="166.38"
                y2="80.96"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3f9c36" />
                <stop offset="1" stopColor="#004d2a" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#Nepojmenovaný_přechod_51)" }}
              d="M18.82,102.15c5.42-50.15,34.47-82.2,147.57-57.52-46.87,27.73-61.02,119.03-144.7,63.69,24.72-25.17,40.16-35.74,72.86-51.03-25.63,5.84-51.02,19.31-75.73,44.86h0Z"
            />
          </svg>
          <svg
            id="LIST"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 182.98 148.92"
            width="48"
            height="48"
            className="right"
          >
            <defs>
              <style></style>
              <linearGradient
                id="Nepojmenovaný_přechod_51"
                data-name="Nepojmenovaný přechod 51"
                x1="18.82"
                y1="80.96"
                x2="166.38"
                y2="80.96"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#3f9c36" />
                <stop offset="1" stopColor="#004d2a" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#Nepojmenovaný_přechod_51)" }}
              d="M18.82,102.15c5.42-50.15,34.47-82.2,147.57-57.52-46.87,27.73-61.02,119.03-144.7,63.69,24.72-25.17,40.16-35.74,72.86-51.03-25.63,5.84-51.02,19.31-75.73,44.86h0Z"
            />
          </svg>
        </span>
        ná cesta k r
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
