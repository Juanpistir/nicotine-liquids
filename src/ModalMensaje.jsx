import { useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";


function ModalMensaje({ mensaje, mostrar, onClose }) {
  useEffect(() => {
    if (mostrar) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000); // Cerrar el modal después de 3 segundos
      return () => clearTimeout(timeout);
    }
  }, [mostrar, onClose]);

  return (
    <Transition
      show={mostrar}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-full max-w-md p-6 text-center text-white bg-green-500 rounded-2xl shadow-xl">
            <p className="text-lg font-medium">{mensaje}</p>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default ModalMensaje;
