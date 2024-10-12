import React, { useState } from 'react';

function Sidebar({ agregarHabitacion, agregarHuesped, huespedes }) {
  const [numeroHabitacion, setNumeroHabitacion] = useState('');
  const [tipoHabitacion, setTipoHabitacion] = useState('single');
  const [nombreHuesped, setNombreHuesped] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [acompanantes, setAcompanantes] = useState(0);
  const [errorHabitacion, setErrorHabitacion] = useState('');
  const [errorHuesped, setErrorHuesped] = useState('');

  const manejarCrearHabitacion = () => {
    if (!numeroHabitacion) {
      setErrorHabitacion('Debe completar todos los campos');
      return;
    }
    if (agregarHabitacion(numeroHabitacion, tipoHabitacion) === 'error') {
      setErrorHabitacion('El número de habitación ya existe');
      return;
    }
    setNumeroHabitacion('');
    setErrorHabitacion('');
  };

  const manejarCrearHuesped = () => {
    if (!nombreHuesped || !checkIn || !checkOut) {
      setErrorHuesped('Debe completar todos los campos');
      return;
    }
    agregarHuesped({ nombre: nombreHuesped, checkIn, checkOut, acompanantes });
    setNombreHuesped('');
    setCheckIn('');
    setCheckOut('');
    setAcompanantes(0);
    setErrorHuesped('');
  };

  return (
    <div className="sidebar-container">
      <div className="crear-habitacion">
        <h3>Crear Habitación</h3>
        <input
          type="text"
          placeholder="Número de Habitación"
          value={numeroHabitacion}
          onChange={(e) => setNumeroHabitacion(e.target.value)}
        />
        {errorHabitacion && <p className="error-message">{errorHabitacion}</p>}
        <select value={tipoHabitacion} onChange={(e) => setTipoHabitacion(e.target.value)}>
          <option value="single">Single</option>
          <option value="doble">Doble</option>
          <option value="suite">Suite</option>
        </select>
        <button onClick={manejarCrearHabitacion}>Crear Habitación</button>
      </div>

      <div className="crear-huesped">
        <h3>Crear Huésped</h3>
        <input
          type="text"
          placeholder="Nombre del Huésped"
          value={nombreHuesped}
          onChange={(e) => setNombreHuesped(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-In"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-Out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <select value={acompanantes} onChange={(e) => setAcompanantes(e.target.value)}>
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i}>
              {i} Acompañantes
            </option>
          ))}
        </select>
        {errorHuesped && <p className="error-message">{errorHuesped}</p>}
        <button onClick={manejarCrearHuesped}>Crear Huésped</button>
      </div>

      {/* Aquí mostramos los huéspedes creados */}
      <h3>Huéspedes Disponibles</h3>
      <div className="huespedes-list">
        {huespedes.map((huesped, index) => (
          <div key={index} className="huesped-card">
            <p>{huesped.nombre}</p>
            <p>Check-In: {huesped.checkIn}</p>
            <p>Check-Out: {huesped.checkOut}</p>
            <p>Acompañantes: {huesped.acompanantes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
