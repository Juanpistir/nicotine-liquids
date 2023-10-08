import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Form from "./Form";
import Recetas from "./Recetas";
import Acerca from "./Acerca";

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
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <Routes>
            <Route exact path="/" element={<Form />} />
            <Route path="/recetasguardadas" element={<Recetas />} />
            <Route path="/acerca-mi" element={<Acerca />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
