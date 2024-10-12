import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import CrearHotel from './components/CrearHotel';
import Navbar from './components/Navbar';

function App() {
  const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario') || null);
  const [nombreHotel, setNombreHotel] = useState(() => localStorage.getItem('nombreHotel') || '');

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', usuario);
    }
  }, [usuario]);

  useEffect(() => {
    if (nombreHotel) {
      localStorage.setItem('nombreHotel', nombreHotel);
    }
  }, [nombreHotel]);

  const manejarLogin = (nombre) => {
    setUsuario(nombre);
  };

  const manejarCrearHotel = (hotel) => {
    setNombreHotel(hotel);
  };

  // El logout solo reinicia la sesión, pero mantiene los datos en el localStorage
  const handleLogout = () => {
    setUsuario(null);  // Cierra la sesión actual
  };

  return (
    <div>
      {!usuario ? (
        <Login onLogin={manejarLogin} usuarioGuardado={localStorage.getItem('usuario')} />
      ) : !nombreHotel ? (
        <CrearHotel onCrearHotel={manejarCrearHotel} />
      ) : (
        <>
          <Navbar usuario={usuario} nombreHotel={nombreHotel} onLogout={handleLogout} />
        </>
      )}
    </div>
  );
}

export default App;
