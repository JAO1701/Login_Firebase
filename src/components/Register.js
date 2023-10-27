import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { Alert } from './Alert';
import VideoBackground from './VideoBackground'; // Importa el componente VideoBackground (Video de Fondo)

export function Register() {
  const { signup } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState();

  // Manejador de cambios en los inputs
  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

  // Manejador para enviar el formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error.code);

      // Manejo de errores específicos
      if (error.code === 'auth/invalid-email') {
        setError('El valor que se proporcionó como correo no es válido.');
      }
      if (error.code === 'auth/email-already-exists') {
        setError('Otro usuario ya está utilizando el correo electrónico proporcionado.');
      }
      if (error.code === 'auth/internal-error') {
        setError('El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud.');
      }
      if (error.code === 'auth/weak-password') {
        setError('El valor que se proporcionó para la contraseña no es válido. Debe tener al menos 6 caracteres.');
      }
      if (error.code === 'auth/invalid-password') {
        setError('La contraseña no es válida, debe tener al menos 6 caracteres de longitud.');
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Ya existe una cuenta con la dirección de correo proporcionada.');
      }
    }
  };

  // Estilos para el contenedor principal
  const containerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    userSelect: 'none'
  };

  return (
    <div style={containerStyles} className="flex items-center justify-center h-screen">
      <VideoBackground /> {/* Renderiza el componente VideoBackground como fondo en el contenedor padre */}

      <div className="w-full max-w-xs text-black">
        {error && <Alert message={error} />}

        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="bg-sky-950 bg-opacity-75 shadow-md rounded px-8 pt-6 pb-6 mb-4 mx-auto">
          <div className="mb-4">
            {/* Título del formulario */}
            <h1 className="block text-center text-2xl font-bold mb-2" style={{ fontSize: '2.5rem', color: 'azure', textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)', lineHeight: '1.2',  userSelect: 'none'}}>
              Regístrate
            </h1> <br/>

            {/* Etiqueta para el input de correo electrónico */}
            <label
              htmlFor="email"
              className="block text-center text-gray-700 text-sm font-bold mb-2"
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: 'azure',
                textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)',
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
            {/* Etiqueta para el input de contraseña */}
            <label
              htmlFor="password"
              className="block text-center text-gray-700 text-sm font-bold mb-2"
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: 'azure',
                textShadow: '5px 5px 3px rgba(0, 0, 0, 0.5)',
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
            {/* Botón para registrarse */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrarme
            </button>
          </div>
        </form>

        {/* Enlace para iniciar sesión si ya tienes una cuenta (Te regresa a la ruta login) */}
        <Link to="/login" className="flex items-center justify-center text-slate-50 font-bold hover:text-blue-400">
          ¿Ya tienes una cuenta?, Ingresa aquí
        </Link>
      </div>
    </div>
  );
}
