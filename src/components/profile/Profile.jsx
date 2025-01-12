
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function Profile() {
  const { user, getUserRecipes } = useAuth();
  const [recetasCount, setRecetasCount] = useState(0);

  useEffect(() => {
    if (user) {
      cargarRecetas();
    }
  }, [user]);

  const cargarRecetas = async () => {
    const recetas = await getUserRecipes();
    setRecetasCount(recetas.length);
  };

  if (!user) {
    return <p>No estás autenticado</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Perfil
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Información del Usuario
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Correo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cantidad de Recetas</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{recetasCount}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;