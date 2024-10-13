import React, { useState } from "react";

function Sidebar() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("Single");
  const [nombreHuesped, setNombreHuesped] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [acompanantes, setAcompanantes] = useState(0);
  const [error, setError] = useState("");

  const agregarHabitacion = () => {
    if (!numero) {
      setError("Debe ingresar un número de habitación.");
      return;
    }
    if (habitaciones.find((hab) => hab.numero === numero)) {
      setError("La habitación ya existe.");
      return;
    }
    setHabitaciones([...habitaciones, { numero, tipo }]);
    setNumero("");
    setError("");
  };

  const agregarHuesped = () => {
    if (!nombreHuesped) {
      setError("Debe ingresar el nombre del huésped.");
      return;
    }
    setHuespedes([...huespedes, { nombre: nombreHuesped, checkIn, checkOut, acompanantes }]);
    setNombreHuesped("");
    setCheckIn("");
    setCheckOut("");
    setAcompanantes(0);
    setError("");
  };

  return (
    <>
      <h2>Crear Habitación</h2>
      <input
        type="text"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option>Single</option>
        <option>Doble</option>
        <option>Suite</option>
      </select>
      {error && <p className="error-message">{error}</p>}
      <button onClick={agregarHabitacion}>Agregar</button>

      <h2>Crear Huésped</h2>
      <input
        type="text"
        placeholder="Nombre del huésped"
        value={nombreHuesped}
        onChange={(e) => setNombreHuesped(e.target.value)}
      />
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      <select value={acompanantes} onChange={(e) => setAcompanantes(e.target.value)}>
        {[...Array(11).keys()].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
      <button onClick={agregarHuesped}>Agregar</button>

      <h2>Huéspedes</h2>
      {huespedes.map((huesped, index) => (
        <div key={index} className="huesped-card">
          {huesped.nombre} <br />
          Check-In: {huesped.checkIn} <br />
          Check-Out: {huesped.checkOut} <br />
          Acompañantes: {huesped.acompanantes}
        </div>
      ))}
    </>
  );
}

export default Sidebar;
