import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Hotel() {
  const [habitaciones, setHabitaciones] = useState(() => {
    // Recuperar habitaciones desde localStorage o un arreglo vacío si no hay nada almacenado
    const savedHabitaciones = localStorage.getItem('habitaciones');
    return savedHabitaciones ? JSON.parse(savedHabitaciones) : [];
  });

  const [huespedes, setHuespedes] = useState(() => {
    // Recuperar huéspedes desde localStorage o un arreglo vacío si no hay nada almacenado
    const savedHuespedes = localStorage.getItem('huespedes');
    return savedHuespedes ? JSON.parse(savedHuespedes) : [];
  });

  useEffect(() => {
    // Guardar habitaciones en localStorage cuando cambie el estado
    localStorage.setItem('habitaciones', JSON.stringify(habitaciones));
  }, [habitaciones]);

  useEffect(() => {
    // Guardar huéspedes en localStorage cuando cambie el estado
    localStorage.setItem('huespedes', JSON.stringify(huespedes));
  }, [huespedes]);

  const agregarHabitacion = (numero, tipo) => {
    // Validación para evitar habitaciones duplicadas
    if (habitaciones.some(habitacion => habitacion.numero === numero)) {
      return 'error';  // Retornar 'error' si la habitación ya existe
    }
    const nuevaHabitacion = { numero, tipo, estado: 'Limpia + Libre' };
    setHabitaciones([...habitaciones, nuevaHabitacion]);
  };

  const agregarHuesped = (huesped) => {
    setHuespedes([...huespedes, huesped]);
  };

  const cambiarEstadoHabitacion = (numero, nuevoEstado) => {
    setHabitaciones(habitaciones.map(hab => hab.numero === numero ? { ...hab, estado: nuevoEstado } : hab));
  };

  return (
    <div className="hotel-container">
      <Sidebar agregarHabitacion={agregarHabitacion} agregarHuesped={agregarHuesped} huespedes={huespedes} />
      <div className="habitaciones-container">
        <h2>Habitaciones</h2>
        {habitaciones.map((habitacion, index) => (
          <div key={index} className="habitacion-card">
            <h4>Habitación {habitacion.numero} - {habitacion.tipo}</h4>
            <select
              value={habitacion.estado}
              onChange={(e) => cambiarEstadoHabitacion(habitacion.numero, e.target.value)}
            >
              <option value="Limpia + Libre">Limpia + Libre</option>
              <option value="Limpia + Ocupada">Limpia + Ocupada</option>
              <option value="Sucia + Libre">Sucia + Libre</option>
              <option value="Sucia + Ocupada">Sucia + Ocupada</option>

            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
