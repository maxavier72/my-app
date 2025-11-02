import React from 'react';
import '../components/DetailCard.css';

function DetailCard({ currentWeather, isCelsius }) {
  if (!currentWeather) {
    return (
      <div className="detail-card no-data">
        <p>🔍 Cari kota untuk melihat cuaca</p>
      </div>
    );
  }

  const temp = isCelsius 
    ? Math.round(currentWeather.main.temp)
    : Math.round((currentWeather.main.temp * 9/5) + 32);

  const feelsLike = isCelsius
    ? Math.round(currentWeather.main.feels_like)
    : Math.round((currentWeather.main.feels_like * 9/5) + 32);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date().toLocaleDateString('id-ID', options);
  };

  return (
    <div className="detail-card">
      <div className="card-header">
        <div className="location-info">
          <h2 className="city-name">📍 {currentWeather.name}, {currentWeather.sys.country}</h2>
          <p className="date-time">{formatDate()}</p>
        </div>
      </div>

      <div className="main-weather">
        <div className="weather-icon">
          <img 
            src={getWeatherIcon(currentWeather.weather[0].icon)} 
            alt={currentWeather.weather[0].description}
          />
        </div>
        
        <div className="temperature-info">
          <div className="temp-main">{temp}°</div>
          <p className="weather-desc">{currentWeather.weather[0].description}</p>
          <p className="feels-like">Terasa seperti {feelsLike}°</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <p className="detail-label">Kelembaban</p>
            <p className="detail-value">{currentWeather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <p className="detail-label">Kecepatan Angin</p>
            <p className="detail-value">{currentWeather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">Tekanan</p>
            <p className="detail-value">{currentWeather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <p className="detail-label">Jarak Pandang</p>
            <p className="detail-value">{(currentWeather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <p className="detail-label">Awan</p>
            <p className="detail-value">{currentWeather.clouds.all}%</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌅</div>
          <div className="detail-content">
            <p className="detail-label">Matahari Terbit</p>
            <p className="detail-value">
              {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;