
import { BrowserRouter, Routes, Route } from "react-router-dom";
import World from "./pages/World";
import Wave from "./pages/Wave";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<World />} />
          <Route path="wave" element={<Wave />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
