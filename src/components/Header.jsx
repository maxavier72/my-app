import React from 'react';

function Header({ city, isCelsius, onToggleUnit }) {
  return (
    <div className="header">
      <div>
        <h1>Weather Dashboard</h1>
        <p>Cuaca terkini untuk {city || 'kota Anda'}</p>
      </div>
      <button 
        className="toggle-unit"
        onClick={onToggleUnit}
      >
        °{isCelsius ? 'C' : 'F'}
      </button>
    </div>
  );
}

export default Header;