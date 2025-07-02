import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Placeholder para futuros átomos */}
      <Route path="/atoms/:atom" element={<p>Átomo en construcción…</p>} />
    </Routes>
  );
}
