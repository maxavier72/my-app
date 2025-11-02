import React, { useState } from 'react';
import '../components/SearchForm.css';

function SearchForm({ onSearch, searchHistory }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cities = [
    'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang',
    'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi',
    'Bogor', 'Malang', 'Yogyakarta', 'Denpasar', 'Bali',
    'Batam', 'Pekanbaru', 'Bandar Lampung', 'Padang', 'Pontianak'
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleHistoryClick = (city) => {
    setInputValue(city);
    onSearch(city);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => inputValue && setShowSuggestions(true)}
            placeholder="Masukkan nama kota..."
            className="search-input"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((city, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button type="submit" className="search-button">
          🔍 Cari
        </button>
      </form>

      {searchHistory && searchHistory.length > 0 && (
        <div className="search-history">
          <p className="history-title">Riwayat Pencarian:</p>
          <div className="history-items">
            {searchHistory.slice(0, 5).map((city, index) => (
              <button
                key={index}
                className="history-item"
                onClick={() => handleHistoryClick(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchForm;