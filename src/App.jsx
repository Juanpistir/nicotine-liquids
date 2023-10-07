import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./Form";
import Recetas from "./Recetas";
import Acerca from './Acerca'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-primary w-full overflow-hidden">
          <div className={`sm:px-16 px-6 flex justify-center items-center`}>
            <div className={`xl:max-w-[1280px] w-full`}>
              <Navbar />
            </div>
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/recetasguardadas" element={<Recetas />} />
          <Route path="/acerca-mi" element={<Acerca />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
