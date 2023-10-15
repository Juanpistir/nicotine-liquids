import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./Form";
import Recetas from "./Recetas";
import Acerca from "./Acerca";
import "./App.css"

function App() {
  return (
    <>
      <HashRouter>
        <div className="bg-primary w-full overflow-hidden">
          <div className={`sm:px-16 px-6 flex justify-center items-center`}>
            <div className={`xl:max-w-[1280px] w-full`}>
              <Navbar />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 min-h-screen">
          <Routes>
            <Route exact path="/nicotine-liquids/" element={<Form />} />
            <Route path="/nicotine-liquids/recetasguardadas" element={<Recetas />} />
            <Route path="/nicotine-liquids/acerca-mi" element={<Acerca />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
