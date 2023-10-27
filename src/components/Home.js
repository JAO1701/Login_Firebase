import React, { useState } from "react";
import { useAuth } from "../authContext";

export function Home() {
  const { user, logout, loading } = useAuth();

  // Manejador para cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [containerVisible, setContainerVisible] = useState(true);

  // Manejador para ocultar el contenedor al hacer clic en "Acceder"
  const handleAccessClick = () => {
    setContainerVisible(false);
  };

  if (loading) return <h1>Cargando ...</h1>;

  // Estilos para el contenedor de bienvenida
  const welcomeContainerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    userSelect: 'none'  // Evita que se pueda seleccionar el texto del contenedor
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {containerVisible && (
        <div style={welcomeContainerStyles} className="bg-sky-950 bg-opacity-75 shadow-md rounded px-8 pt-6 pb-6 mb-4 inline-block">
          <p className="text-xl mb-4 font-bold text-slate-50">Bienvenido {user.displayName || user.email}</p>
          <div className="text-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto mr-2"
              onClick={handleLogout}
            >
              Salir
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto ml-2"
              onClick={handleAccessClick}
            >
              Acceder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
