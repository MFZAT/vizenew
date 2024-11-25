import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import World from "./pages/World";
import Wave from "./pages/Wave";
import FormPage from "./components/FormPage";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence } from "framer-motion";
import Panel1 from "./pages/Panel1";
import Panel3 from "./pages/Panel3";
import Panel2 from "./pages/Panel2";

function ButtonComponent({ handleOpenForm, openForm }) {
  const location = useLocation();

  return (
    location.pathname === "/" && (
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
          className={`size-6 ${
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
    )
  );
}

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

      <Router>
        <ButtonComponent handleOpenForm={handleOpenForm} openForm={openForm} />
        <Canvas
          shadows
          shadowMap
          dpr={[1, 2]}
          camera={{ position: [0, 0, 30], fov: 100 }}
        >
          <color attach="background" args={["#222"]} />

          <Routes>
            <Route path="/" element={<World texts={texts} />} />
            <Route path="/panel1" element={<Panel1 texts={[]} />} />
            <Route path="/panel2" element={<Panel2 texts={[]} />} />
            <Route path="/panel3" element={<Panel3 texts={[]} />} />
          </Routes>
        </Canvas>
      </Router>
    </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
