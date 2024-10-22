import { BrowserRouter, Routes, Route } from "react-router-dom";
import World from "./pages/World";
import Wave from "./pages/Wave";
import FormPage from "./components/FormPage";
import { useState } from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<World />} />
          {/* <Route path="wave" element={<Wave />} /> */}
          {/* <Route path="form" element={<FormPage formData={handleFormData} />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
