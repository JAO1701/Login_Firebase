import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { Alert } from './Alert';

export function Register() {
  const { signup } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState();
  const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(user.email, user.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error.code);
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
        setError('El valor que se proporcionó para la contraseñá no es válido. Debe tener al menos 6 caracteres.');
      }
      if (error.code === 'auth/invalid-password') {
        setError('La contraseña no es válida, debe tener al menos 6 caracteres de longitud.');
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Ya existe una cuenta con la dirección de correo proporcionado.');
      }

    }
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4" >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" >Correo</label>
          <input
            type="email"
            name="email"
            id="email"
            //  onChange={(e) => setUser({ ...user, email: e.target.value })}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" >Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            //  onChange={(e) => setUser({ ...user, password: e.target.value })}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Registrar
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        ¿Ya tienes una cuenta?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Ingresar
        </Link>
      </p>
    </div>
  );
}