import React, { useState } from 'react';

function CrearHotel({ onCrearHotel }) {
  const [nombreHotel, setNombreHotel] = useState('');
  const [error, setError] = useState('');

  const manejarCrearHotel = () => {
    if (!nombreHotel) {
      setError('¡Debe completar el nombre del hotel!');
      return;
    }
    setError('');
    onCrearHotel(nombreHotel);
  };

  return (
    <div className="crearhotel-container">
      <h2>Crear hotel</h2>
      <input
        type="text"
        placeholder="Ingrese el nombre del hotel"
        value={nombreHotel}
        onChange={(e) => setNombreHotel(e.target.value)}
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="HotelBoton1" onClick={manejarCrearHotel}>Crear Hotel</button>
    </div>
  );
}

export default CrearHotel;
