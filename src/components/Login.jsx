import React, { useState, useEffect } from 'react';

function Login({ onLogin, usuarioGuardado }) {
  const [nombre, setNombre] = useState(usuarioGuardado || '');
  const [error, setError] = useState('');

  const manejarLogin = () => {
    if (!nombre) {
      setError('¡Debe completar su nombre!');
      return;
    }
    setError('');
    onLogin(nombre);
  };

  useEffect(() => {
    if (usuarioGuardado) {
      setNombre(usuarioGuardado);
    }
  }, [usuarioGuardado]);

  return (
    <div className="login-container">
      <h2>Usuario</h2>
      <input
        type="text"
        placeholder="Ingrese su nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className={error ? 'input-error' : ''}
        disabled={Boolean(usuarioGuardado)}  /* Esta línea ahora debería estar bien */
      />
      {error && <p className="error-message">{error}</p>}
      <button className="HotelBoton1" onClick={manejarLogin}>Ingresar</button>
    </div>
  );
}

export default Login;

