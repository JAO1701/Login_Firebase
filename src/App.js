import React from 'react';
import './assets/App.css';
import LoginForm from './Componentes/LoginForm'; 

function App() {
  return (
    <div className="App">
      {/* Renderiza el componente LoginForm dentro del elemento con clase "App" */}
      <LoginForm />
    </div>
  );
}

export default App;
