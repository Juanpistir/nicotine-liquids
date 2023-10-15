import React from "react";
import { useForm, ValidationError } from "@formspree/react";

function Acerca() {
  const [state, handleSubmit] = useForm("mnqklbwz");
  if (state.succeeded) {
    return (
      <p className="border border-dotted border-s-white mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        ¡Gracias por tus sugerencias!
      </p>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen rounded-lg p-4 mx-2">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-500">
          Contáctame
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          ¿Te ha interesado este proyecto? Estaría encantado de recibir tus
          sugerencias para colaborar en futuros proyectos o cualquier
          recomendación que puedas ofrecer para mejorarlo. ¡No dudes en
          compartirlas conmigo!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Tu dirección de correo"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe aquí tu mensaje"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={state.submitting}
              className=" w-1/4 py-3 px-5 m-3 text-sm font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Acerca;
