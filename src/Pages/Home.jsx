import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import QuemSomos from "../components/QuemSomos";
import Diferencal from "../components/Diferencal";

export default function Home() {
  return (
    <>
      <div className="h-full w-full">
        <NavBar />
        <Hero />
        <QuemSomos/>
        <Diferencal />
        <Footer />
      </div>
    </>
  );
}
