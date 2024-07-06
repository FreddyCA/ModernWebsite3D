import Hero from "@/ui/hero";
import Navbar from "@/ui/navbar";
import Highlights from "@/ui/highlights";
import Model from "@/ui/model";
import PruebaGLB from "@/ui/pruebaGLB";
import ModelosGLTF from "@/ui/modelosGLTF";
import ModelViewV2 from "@/ui/ModelViewV2";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <div
        className="screen-max-width"
        style={{
          height: "100vh",
          width: "50vw",
          border: "5px solid blue",
          margin: "0 auto",
        }}
      >
        <PruebaGLB />
      </div>
      <div
        className="screen-max-width"
        style={{
          height: "100vh",
          width: "50vw",
          border: "5px solid blue",
          margin: "0 auto",
        }}
      >
        <ModelosGLTF />
      </div>
      <div
        className="screen-max-width"
        style={{
          height: "100vh",
          width: "50vw",
          border: "5px solid blue",
          margin: "0 auto",
        }}
      >
        <ModelViewV2 />
      </div>
    </main>
  );
}
