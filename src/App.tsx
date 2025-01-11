import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Form from './components/forms/Form';
import Recetas from './components/recipes/Recetas';
import Acerca from './components/layout/Acerca';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/contacto" element={<Acerca />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
