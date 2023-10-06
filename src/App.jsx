import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./Form";
import Recetas from "./Recetas";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/recetasguardadas" element={<Recetas />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
