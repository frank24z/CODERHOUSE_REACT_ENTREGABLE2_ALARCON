import React from 'react';

function Navbar({ usuario, nombreHotel, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-item">Home</div>
      <div className="navbar-item">Hotel {nombreHotel}</div>
      <div className="navbar-item navbar-right">
        Bienvenido {usuario}
        <button className="logout-btn" onClick={onLogout}>Salir</button>
      </div>
    </nav>
  );
}

export default Navbar;
