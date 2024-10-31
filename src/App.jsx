import { BrowserRouter, Routes, Route } from "react-router-dom";
import World from "./pages/World";
import Wave from "./pages/Wave";
import FormPage from "./components/FormPage";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [openForm, setOpenForm] = useState(false);
  const [texts, setTexts] = useState("");

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

      <Canvas
        shadows
        shadowMap
        dpr={[1, 2]}
        camera={{ position: [0, 0, 30], fov: 100 }}
      >
        <color attach="background" args={["#222"]} />
        <World texts={texts} />
      </Canvas>
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">
    //       <Route index element={<World />} />
    //       {/* <Route path="wave" element={<Wave />} /> */}
    //       {/* <Route path="form" element={<FormPage formData={handleFormData} />} /> */}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
