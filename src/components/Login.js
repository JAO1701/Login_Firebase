import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { Alert } from './Alert';

export function Login() {
  const { login, loginWithGoogle, resetPassword } = useAuth();
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
      await login(user.email, user.password);
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
      if (error.code === 'auth/invalid-login-credentials') {
        setError('Usuario o contraseñá incorrectos.');
      }
      if (error.code === 'auth/user-disabled') {
        setError('EL usuario correspondiente a este correo ha sido deshabilitado. Pongase en contacto con el proveedor del sitio');
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Escribe un correo para resetear la contraseña");
    try {
      await resetPassword(user.email);
      setError('Te enviamos un correo.')
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
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
            // onChange={(e) => setUser({ ...user, email: e.target.value })}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="name@company.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" >Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            // onChange={(e) => setUser({ ...user, password: e.target.value })}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Entrar
          </button>


        </div>
      </form>
      <div class="flex flex-row justify-center mb-8">
        <span class="absolute bg-slate-300 px-4 text-gray-500">o entrar con</span>
        <div class="w-full bg-slate-300 mt-3 h-px"></div>
      </div>
      <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        onClick={handleGoogleSignin} > Google
      </button>
      <p className="my-4 text-sm flex justify-between px-3">
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700"
          href="#!" onClick={handleResetPassword} >
          ¿Olvidaste tu contraseña?
        </a>
        <Link to="/register" className="font-bold text-sm text-blue-500 hover:text-blue-700">
          Registrarse
        </Link>
      </p>
    </div>
  );
}