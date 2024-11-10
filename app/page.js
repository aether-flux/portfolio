import { Home } from "@/app/_pages/Home";
import { About } from "@/app/_pages/About";
import { WorksMain } from "@/app/_pages/WorksMain";
import { Footer } from "@/app/_components/Footer";
import { Experience } from "./_pages/Experience";
import { Skills } from "./_pages/Skills";
import CursorFollower from "./_components/CursorFollower";

export default function App() {
  return (
    <>
      <CursorFollower />
      <Home />
      <WorksMain />
      <Skills />
      <Experience />
      <About />
      <Footer />
    </>
  );
}
