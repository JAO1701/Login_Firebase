import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { Alert } from './Alert';
import VideoBackground from './VideoBackground'; // Importa el componente VideoBackground (Video de Fondo)

export function Login() {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState();

  // Manejador de cambios en los inputs
  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

  // Para enviar el formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error.code);
      // Códigos de error...
    }
  };

  // Para enviar un correo de restablecimiento de contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Escribe un correo para resetear la contraseña");
    try {
      await resetPassword(user.email);
      setError('Te enviamos un correo.');
    } catch (error) {
      setError(error.message);
    }
  };

  //  Para iniciar sesión con Google
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-lg m-auto text-black" style={{ userSelect: 'none' }}>
     
      <VideoBackground /> {/* Renderiza el componente VideoBackground como fondo en el contenedor padre */}

      {error && <Alert message={error} />}

      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit} className="bg-sky-950 bg-opacity-75 shadow-md rounded px-8 pt-6 pb-6 mb-4">
        <div className="mb-4">
          {/* Título del formulario */}
          <h1 className="block text-center text-2xl font-bold mb-2" style={{ fontSize: '2.5rem', color: 'azure', textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)', lineHeight: '1.2',  userSelect: 'none'}}>
            Data Evolution Pro
          </h1> <br/>

          {/* Etiqueta para el campo de correo electrónico */}
          <label
            htmlFor="email"
            className="block text-center text-gray-700 text-sm font-bold mb-2"
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'azure',
              textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)',
              userSelect: 'none',
            }}
          >
            Correo electrónico
          </label>

          {/* Input para el correo electrónico */}
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-sky-500"
            placeholder="name@company.com"
          />
        </div>

        <div className="mb-4">
          {/* Etiqueta para el campo de contraseña */}
          <label
            htmlFor="password"
            className="block text-center text-gray-700 text-sm font-bold mb-2"
            style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: 'azure',
              textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)',
              userSelect: 'none',
            }}
          >
            Contraseña
          </label>

          {/* Input para la contraseña */}
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-sky-500"
            placeholder="*************"
          />
        </div>

        <div className="flex items-center justify-center">
          {/* Botón para enviar el formulario de inicio de sesión */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto">
            Entrar
          </button>
        </div>
      </form>

      {/* Contenedor para mensaje adicional */}
      <div className="flex flex-row justify-center mb-8">
        <span className="absolute bg-sky-950 bg-opacity-80 px-4 text-slate-50 font-bold" style={{ userSelect: 'none' }}>
          o también puedes ingresar con
        </span>
        {/* Línea horizontal */}
        <div className="w-full bg-sky-950 bg-opacity-50 mt-3 h-px"></div>
      </div>

      <div className="flex items-center justify-center">
        {/* Botón para iniciar sesión con Google */}
        <button
          className="w-40 bg-red-700 bg-opacity-75 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={handleGoogleSignin}
        >
          Google
        </button>
      </div>

      <p className="my-4 text-sm text-center">
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700 block mb-2"
          href="#!"
          onClick={handleResetPassword}
        >
          ¿Olvidaste tu contraseña?
        </a>
        <Link to="/register" className="font-bold text-sm text-blue-500 hover:text-blue-700 block">
          Registrarse
        </Link>
      </p>
    </div>
  );
}
