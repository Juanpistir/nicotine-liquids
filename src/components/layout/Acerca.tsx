import React from "react";
import { useForm, ValidationError } from "@formspree/react";

interface ContactFormData {
  email: string;
  message: string;
  [key: string]: string;
}

const Acerca: React.FC = () => {
  const [state, handleSubmit] = useForm<ContactFormData>("mnqklbwz");

  if (state.succeeded) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-4xl font-extrabold text-blue-500 mb-4">¡Gracias!</h2>
          <p className="text-xl text-gray-300">
            Tu mensaje ha sido enviado correctamente.
            <br />
            Me pondré en contacto contigo pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen rounded-lg p-4 mx-2">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-500">
          Contáctame
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
          ¿Te ha interesado este proyecto? Estaría encantado de recibir tus
          sugerencias para colaborar en futuros proyectos o cualquier
          recomendación que puedas ofrecer para mejorarlo.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="tu@email.com"
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="mt-1 text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Escribe aquí tu mensaje..."
              className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="mt-1 text-red-500 text-sm"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={state.submitting}
              className="px-8 py-3 text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Acerca;
