import { useState } from "react";
import Intro from "./pages/Intro";
import Home from "./pages/Home";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <Intro Finish={() => setShowIntro(false)} />
  ) : (
    <Home />
  );
}
