import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import Scene from "../components/Scene";

export default function Home() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <main className="">
        <div ref={container} className="h-[300vh]">
          <div className="sticky top-0 h-screen ">
            <Scene scrollProgress={scrollYProgress} />
          </div>
        </div>
        <div className="h-screen w-screen"></div>
      </main>
    </>
  );
}
