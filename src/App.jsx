import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CrearHotel from './components/CrearHotel';
import Navbar from './components/Navbar';
import Home from './components/Hotel'; // Si tienes un componente Home

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

  const handleLogout = () => {
    setUsuario(null);
    setNombreHotel('');
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombreHotel');
  };

  return (
    <Router>
      <Navbar usuario={usuario} nombreHotel={nombreHotel} onLogout={handleLogout} />
      <Routes>
        {!usuario ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : !nombreHotel ? (
          <Route path="*" element={<Navigate to="/crear-hotel" />} />
        ) : (
          <Route path="*" element={<Navigate to="/home" />} />
        )}

        <Route path="/login" element={<Login onLogin={manejarLogin} />} />
        <Route path="/crear-hotel" element={<CrearHotel onCrearHotel={manejarCrearHotel} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
