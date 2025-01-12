import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Acerca: React.FC = () => {
  const [state, handleSubmit] = useForm("mnqklbwz");

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-24 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
          <div className="text-6xl mb-6">✉️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Mensaje Enviado!
          </h2>
          <p className="text-xl text-gray-600">
            Gracias por contactarme.
            <br />
            Me pondré en contacto contigo pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Encabezado con diseño especial */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-8 sm:px-8 sm:py-12">
            <div className="text-center">
              <div className="text-6xl mb-6">💌</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                ¡Hablemos!
              </h2>
              <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto">
                ¿Te interesa este proyecto? Me encantaría escuchar tus ideas y
                sugerencias para hacer esta herramienta aún mejor.
              </p>
            </div>
          </div>

          {/* Formulario con nuevo diseño */}
          <div className="px-6 py-8 sm:px-8 sm:py-12 bg-white">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">
                    Correo electrónico
                  </span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </label>
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Mensaje</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="¿Qué te gustaría compartir?"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </label>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  {state.submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <span className="ml-2">✨</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer con información adicional */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8">
            <p className="text-center text-gray-600 text-sm">
              También puedes encontrarme en{" "}
              <a
                href="https://github.com/juanpistir"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                GitHub
              </a>{" "}
              o{" "}
              <a
                href="https://linkedin.com/in/juan-pablo-hurtado-arce/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acerca;
