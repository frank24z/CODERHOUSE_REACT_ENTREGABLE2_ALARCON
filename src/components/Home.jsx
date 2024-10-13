import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Navbar from "./Navbar";
import limpiaLibre from "../assets/limpia+libre.webp";
import limpiaOcupada from "../assets/limpia+ocupada.webp";
import suciaLibre from "../assets/sucia+libre.webp";
import suciaOcupada from "../assets/sucia+ocupada.webp";
import "../index.css"; 

// Función que retorna la imagen según el estado
const obtenerImagenEstado = (estado) => {
  switch (estado) {
    case "Limpia + Libre":
      return limpiaLibre;
    case "Limpia + Ocupada":
      return limpiaOcupada;
    case "Sucia + Libre":
      return suciaLibre;
    case "Sucia + Ocupada":
      return suciaOcupada;
    default:
      return limpiaLibre;
  }
};

// Componente de Huésped para arrastrar
const HuespedCard = ({ huesped }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "HUESPED",
    item: huesped,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="huesped-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <strong>{huesped.nombre}</strong>
      <p>Check-In: {huesped.checkIn}</p>
      <p>Check-Out: {huesped.checkOut}</p>
      <p>Acompañantes: {huesped.acompanantes}</p>
    </div>
  );
};

// Componente de Habitación con funcionalidad de Drop
const HabitacionCard = ({ habitacion, index, onDropHuesped, setHabitaciones }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "HUESPED",
    drop: (item) => onDropHuesped(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="habitacion-card"
      style={{ borderColor: isOver ? "green" : "transparent" }}
    >
      <img
        src={obtenerImagenEstado(habitacion.estado)}
        alt={`Estado ${habitacion.estado}`}
        className="estado-imagen"
      />
      <div className="info-habitacion">
        <span>
          Habitación {habitacion.numero} - {habitacion.tipo}
        </span>
        {habitacion.huesped && (
          <div className="huesped-en-habitacion">
            <p>Huésped: {habitacion.huesped.nombre}</p>
            <button onClick={() => onDropHuesped(null, index)}>Check-out</button>
          </div>
        )}
        <select
          value={habitacion.estado}
          onChange={(e) =>
            setHabitaciones((prev) =>
              prev.map((h, i) =>
                i === index ? { ...h, estado: e.target.value } : h
              )
            )
          }
        >
          <option value="Limpia + Libre">Limpia + Libre</option>
          <option value="Limpia + Ocupada">Limpia + Ocupada</option>
          <option value="Sucia + Libre">Sucia + Libre</option>
          <option value="Sucia + Ocupada">Sucia + Ocupada</option>
        </select>
      </div>
    </div>
  );
};

function Home({ usuario, nombreHotel, onLogout }) {
  const [habitaciones, setHabitaciones] = useState(() =>
    JSON.parse(localStorage.getItem("habitaciones")) || []
  );
  const [huespedes, setHuespedes] = useState(() =>
    JSON.parse(localStorage.getItem("huespedes")) || []
  );

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
    const nuevaHabitacion = { numero, tipo, estado: "Limpia + Libre", huesped: null };
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

  const onDropHuesped = (huesped, habitacionIndex) => {
    if (huesped) {
      setHuespedes((prev) => prev.filter((h) => h.nombre !== huesped.nombre));
      setHabitaciones((prev) =>
        prev.map((h, i) =>
          i === habitacionIndex ? { ...h, estado: "Limpia + Ocupada", huesped } : h
        )
      );
    } else {
      const huespedDevuelto = habitaciones[habitacionIndex].huesped;
      setHuespedes((prev) => [...prev, huespedDevuelto]);
      setHabitaciones((prev) =>
        prev.map((h, i) =>
          i === habitacionIndex ? { ...h, estado: "Sucia + Libre", huesped: null } : h
        )
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar usuario={usuario} nombreHotel={nombreHotel} onLogout={onLogout} />
      <div className="home-container">
        <div className="sidebar-container">
          <form onSubmit={crearHabitacion}>
            <h2>Crear Habitación</h2>
            <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="Single">Single</option>
              <option value="Doble">Doble</option>
              <option value="Suite">Suite</option>
            </select>
            <button type="submit">Agregar</button>
          </form>

          <form onSubmit={crearHuesped}>
            <h2>Crear Huésped</h2>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
            <input type="number" value={acompanantes} onChange={(e) => setAcompanantes(Number(e.target.value))} min="0" max="10" required />
            <button type="submit">Agregar</button>
          </form>
        </div>

        <div className="habitaciones-container">
          <h2>Habitaciones</h2>
          {habitaciones.map((habitacion, index) => (
            <HabitacionCard key={index} habitacion={habitacion} index={index} onDropHuesped={onDropHuesped} setHabitaciones={setHabitaciones} />
          ))}
        </div>

        <div className="huespedes-container">
          <h2>Huéspedes</h2>
          {huespedes.map((huesped, index) => <HuespedCard key={index} huesped={huesped} />)}
        </div>
      </div>
    </DndProvider>
  );
}

export default Home;
