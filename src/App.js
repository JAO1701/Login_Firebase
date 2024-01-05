import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./authContext";

// Define el componente principal de la aplicación 
function App() {
  return (
    <div className="bg-transparent h-screen text-black flex">
      {/* Proporciona el contexto de autenticación a toda la aplicación */}
      <AuthProvider>
        <Routes>
          {/* Configura las rutas de la aplicación */}
          <Route
            path="/"
            element={
              /* Protege la ruta de inicio con autenticación */
              <ProtectedRoute>
                <Home /> {/* Renderiza el componente "Home" dentro de la ruta protegida */}
              </ProtectedRoute>
            }
          />
          {/* Configura una ruta para el componente "Login" */}
          <Route path="/login" element={<Login />} />
          {/* Configura una ruta para el componente "Register" */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

// Exporta el componente "App" para su uso en otros lugares de la aplicación
export default App;
