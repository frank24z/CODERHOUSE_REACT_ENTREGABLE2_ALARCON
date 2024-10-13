import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../index.css"; // Importando el CSS para los estilos

function Home({ usuario, nombreHotel, onLogout }) {
  const [habitaciones, setHabitaciones] = useState(() =>
    JSON.parse(localStorage.getItem("habitaciones")) || []
  );
  const [huespedes, setHuespedes] = useState(() =>
    JSON.parse(localStorage.getItem("huespedes")) || []
  );

  // Estados para los formularios controlados
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("Single");

  const [nombre, setNombre] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [acompanantes, setAcompanantes] = useState(0);

  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  useEffect(() => {
    localStorage.setItem("huespedes", JSON.stringify(huespedes));
  }, [huespedes]);

  const crearHabitacion = (e) => {
    e.preventDefault();
    if (habitaciones.some((h) => h.numero === numero)) {
      alert("La habitación ya existe");
      return;
    }
    const nuevaHabitacion = { numero, tipo, estado: "Limpia + Libre" };
    setHabitaciones([...habitaciones, nuevaHabitacion]);
    setNumero("");
    setTipo("Single");
  };

  const crearHuesped = (e) => {
    e.preventDefault();
    if (huespedes.some((h) => h.nombre.toLowerCase() === nombre.toLowerCase())) {
      alert("El huésped ya existe");
      return;
    }
    const nuevoHuesped = { nombre, checkIn, checkOut, acompanantes };
    setHuespedes([...huespedes, nuevoHuesped]);
    setNombre("");
    setCheckIn("");
    setCheckOut("");
    setAcompanantes(0);
  };

  return (
    <>
      <Navbar usuario={usuario} nombreHotel={nombreHotel} onLogout={onLogout} />
      <div className="home-container">
        <div className="sidebar-container">
          {/* Formulario para Crear Habitación */}
          <form onSubmit={crearHabitacion}>
            <h2>Crear Habitación</h2>
            <input
              type="number"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="Single">Single</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
            </select>
            <button type="submit">Agregar</button>
          </form>

          {/* Formulario para Crear Huésped */}
          <form onSubmit={crearHuesped}>
            <h2>Crear Huésped</h2>
            <input
              type="text"
              placeholder="Nombre del huésped"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Check-In"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Check-Out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Acompañantes"
              value={acompanantes}
              onChange={(e) => setAcompanantes(Number(e.target.value))}
              min="0"
              max="10"
              required
            />
            <button type="submit">Agregar</button>
          </form>
        </div>

        {/* Listado de Habitaciones */}
        <div className="habitaciones-container">
          <h2>Habitaciones</h2>
          {habitaciones.length > 0 ? (
            habitaciones.map((habitacion, index) => (
              <div key={index} className="habitacion-card">
                <span>
                  Habitación {habitacion.numero} - {habitacion.tipo}
                </span>
                <select
                  value={habitacion.estado}
                  onChange={(e) => {
                    const nuevoEstado = e.target.value;
                    setHabitaciones((prev) =>
                      prev.map((h, i) =>
                        i === index ? { ...h, estado: nuevoEstado } : h
                      )
                    );
                  }}
                >
                  <option value="Limpia + Libre">Limpia + Libre</option>
                  <option value="Limpia + Ocupada">Limpia + Ocupada</option>
                  <option value="Sucia + Libre">Sucia + Libre</option>
                  <option value="Sucia + Ocupada">Sucia + Ocupada</option>
                </select>
              </div>
            ))
          ) : (
            <p>No hay habitaciones creadas aún.</p>
          )}
        </div>

        {/* Listado de Huéspedes */}
        <div className="habitaciones-container">
          <h2>Huéspedes</h2>
          {huespedes.length > 0 ? (
            huespedes.map((huesped, index) => (
              <div key={index} className="huesped-card">
                <strong>{huesped.nombre}</strong>
                <p>Check-In: {huesped.checkIn}</p>
                <p>Check-Out: {huesped.checkOut}</p>
                <p>Acompañantes: {huesped.acompanantes}</p>
              </div>
            ))
          ) : (
            <p>No hay huéspedes creados aún.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
