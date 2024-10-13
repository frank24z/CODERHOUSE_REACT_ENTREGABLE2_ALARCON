import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

function Login({ onLogin, usuarioGuardado }) {
  const [nombre, setNombre] = useState(usuarioGuardado || '');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirección programática

  useEffect(() => {
    if (usuarioGuardado) {
      setNombre(usuarioGuardado); // Cargar el usuario guardado si existe
    }
  }, [usuarioGuardado]);

  const manejarLogin = () => {
    if (!nombre) {
      setError('Debe ingresar su nombre.');
      return;
    }
    setError('');
    sessionStorage.setItem('usuario', nombre); // Guardar en sessionStorage
    onLogin(nombre); // Llamar al login de App.jsx
    navigate('/home'); // Redirigir al Home
  };

  return (
    <div className="card-container">
      <h2>Usuario</h2>
      <input
        type="text"
        placeholder="Ingrese su nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        disabled={!!usuarioGuardado} // Desactivar si ya hay un usuario guardado
      />
      {error && <div className="error-message">{error}</div>}
      <button onClick={manejarLogin}>Ingresar</button> {/* Botón siempre funcional */}
    </div>
  );
}

export default Login;
