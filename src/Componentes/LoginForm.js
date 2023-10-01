import React, { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
  };

  return (
    <div className="login-form-container">
      <Form className="login-form" onSubmit={handleSubmit}>
        <h2 className="mb-4">Iniciar Sesión</h2>

        <div className="form-group mb-3">
          <Input
            type="text"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: 4,
            }}
          />
        </div>

        <div className="form-group mb-3">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: 4,
            }}
          />
        </div>

        <Button
          color="primary"
          className="w-100"
          style={{
            borderRadius: 4,
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
