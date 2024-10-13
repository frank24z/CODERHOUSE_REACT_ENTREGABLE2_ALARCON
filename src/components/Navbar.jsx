import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import hotelLogo from "../assets/logo.png";

function Navbar({ usuario, nombreHotel, onLogout }) {
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogout = () => {
    onLogout(); // Ejecutamos logout desde App.jsx
    navigate("/login", { replace: true }); // Redirigimos al login
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img 
            src={hotelLogo} 
            alt="Logo Hotel" 
            className="navbar-logo-img" 
          />
        </Link>
        {nombreHotel}
      </div>
      <div className="navbar-right">
        <span>Bienvenido, {usuario}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default Navbar;
