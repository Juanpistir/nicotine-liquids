import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between mb-6">
          <button
            className={`px-4 py-2 ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar Sesión
          </button>
          <button
            className={`px-4 py-2 ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
