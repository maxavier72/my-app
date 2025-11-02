import React from 'react';
import '../components/DataTable.css';

function DataTable({ forecast, isCelsius }) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="data-table-container no-data">
        <h3>📊 Prakiraan 5 Hari ke Depan</h3>
        <p>Data prakiraan tidak tersedia</p>
      </div>
    );
  }

  // Group forecast by day (take one forecast per day)
  const getDailyForecast = () => {
    const dailyData = [];
    const processedDates = new Set();

    forecast.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      // Take midday forecast (12:00) or first available for each day
      if (!processedDates.has(dateString) && dailyData.length < 5) {
        const hour = date.getHours();
        if (hour >= 11 && hour <= 15) {
          processedDates.add(dateString);
          dailyData.push(item);
        }
      }
    });

    // If we don't have 5 days with midday data, fill with any available data
    if (dailyData.length < 5) {
      const fallbackData = [];
      const fallbackDates = new Set();
      
      forecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        if (!fallbackDates.has(dateString) && fallbackData.length < 5) {
          fallbackDates.add(dateString);
          fallbackData.push(item);
        }
      });
      
      return fallbackData;
    }

    return dailyData;
  };

  const dailyForecast = getDailyForecast();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const convertTemp = (temp) => {
    return isCelsius 
      ? Math.round(temp)
      : Math.round((temp * 9/5) + 32);
  };

  return (
    <div className="data-table-container">
      <h3 className="table-title">📊 Prakiraan 5 Hari ke Depan</h3>
      
      <div className="table-responsive">
        <table className="forecast-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Cuaca</th>
              <th>Suhu</th>
              <th>Deskripsi</th>
              <th>Kelembaban</th>
              <th>Angin</th>
            </tr>
          </thead>
          <tbody>
            {dailyForecast.map((day, index) => (
              <tr key={index}>
                <td className="date-cell">
                  <strong>{formatDate(day.dt)}</strong>
                </td>
                <td className="icon-cell">
                  <img 
                    src={getWeatherIcon(day.weather[0].icon)} 
                    alt={day.weather[0].description}
                    className="weather-icon-small"
                  />
                </td>
                <td className="temp-cell">
                  <span className="temp-value">{convertTemp(day.main.temp)}°</span>
                </td>
                <td className="desc-cell">
                  <span className="weather-description">{day.weather[0].description}</span>
                </td>
                <td className="humidity-cell">
                  💧 {day.main.humidity}%
                </td>
                <td className="wind-cell">
                  💨 {day.wind.speed} m/s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-forecast">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-card-header">
              <strong>{formatDate(day.dt)}</strong>
            </div>
            <div className="forecast-card-body">
              <img 
                src={getWeatherIcon(day.weather[0].icon)} 
                alt={day.weather[0].description}
                className="forecast-card-icon"
              />
              <div className="forecast-card-temp">{convertTemp(day.main.temp)}°</div>
            </div>
            <div className="forecast-card-desc">
              {day.weather[0].description}
            </div>
            <div className="forecast-card-details">
              <span>💧 {day.main.humidity}%</span>
              <span>💨 {day.wind.speed} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataTable;