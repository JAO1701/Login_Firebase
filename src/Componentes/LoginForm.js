import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import '../assets/App.css'; // Importa los estilos CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // Estado para mostrar u ocultar el mensaje de error

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!username || !password) {
      setShowError(true); // Muestra el mensaje de error si algún campo está vacío
      return;
    }

    // Lógica de inicio de sesión
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <Container className="login-container">
      <Row>
        <Col xs="12" lg="6" className="mx-auto">
          <h1 className="display-3">Data Evolution Pro</h1>
          <h2 className="h3">Iniciar sesión</h2>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nombre de usuario"
                className={`form-control-lg ${showError && !username && 'is-invalid'}`}
                required
              />
              {showError && !username && (
                <div className="invalid-feedback">Este campo debe completarse</div>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`form-control-lg ${showError && !password && 'is-invalid'}`}
                required
              />
              {showError && !password && (
                <div className="invalid-feedback">Este campo debe completarse</div>
              )}
            </FormGroup>
            <Button type="submit" color="primary" className="btn-lg">
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
