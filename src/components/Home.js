import React from "react";
import { useAuth } from "../authContext";

export function Home() {
  const { logout, loading } = useAuth();

  // Manejador para cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    // Si la autenticación está en curso, muestra un mensaje de carga
    return <h1>Cargando ...</h1>;
  }

  return (
    <div>
      <h1>Home</h1>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
        onClick={handleLogout}
      >
        Salir
      </button>
    </div>
  );
}
