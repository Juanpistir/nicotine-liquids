import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Form from "./components/forms/Form";
import Recetas from "./components/recipes/Recetas";
import Acerca from "./components/layout/Acerca";
import Profile from "@/components/auth/Profile";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import LoginForm from "@/components/auth/LoginForm";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import RegisterForm from "@/components/auth/RegisterForm";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/nicotine-liquids">
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/contacto" element={<Acerca />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
