import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';
import './App.css';

const API_KEY = 'c3ba696511fe6829f62f6aa8fa5b330e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState('Jakarta');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchWeather('Jakarta');
    loadSearchHistory();
  }, []);

  const loadSearchHistory = () => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  };

  const saveToHistory = (cityName) => {
    let history = [...searchHistory];
    
    // Remove duplicate if exists
    history = history.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    
    // Add to beginning
    history.unshift(cityName);
    
    // Keep only last 10
    history = history.slice(0, 10);
    
    setSearchHistory(history);
    localStorage.setItem('searchHistory', JSON.stringify(history));
  };

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Mohon masukkan nama kota');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch current weather
      const currentResponse = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=id`
      );
      
      setCurrentWeather(currentResponse.data);
      setCity(currentResponse.data.name);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=id`
      );
      
      setForecast(forecastResponse.data.list);

      // Save to history
      saveToHistory(currentResponse.data.name);

    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Kota tidak ditemukan');
      } else {
        setError('Terjadi kesalahan saat mengambil data cuaca');
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    fetchWeather(cityName);
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="app-container">
      <Header 
        city={city} 
        isCelsius={isCelsius} 
        onToggleUnit={toggleUnit} 
      />
      
      <SearchForm 
        onSearch={handleSearch}
        searchHistory={searchHistory}
      />

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Memuat data cuaca...</p>
        </div>
      ) : (
        <>
          <div className="detail-card-container">
            <DetailCard 
              currentWeather={currentWeather} 
              isCelsius={isCelsius} 
            />
          </div>
          
          <div className="data-table-container">
            <DataTable 
              forecast={forecast} 
              isCelsius={isCelsius} 
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;