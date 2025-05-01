import { openDatabase } from 'expo-sqlite';

let db;
try {
  db = openDatabase('farm.db');
} catch (error) {
  console.log('SQLite not available, using mock data');
  // Mock database implementation
  db = {
    transaction: (callback) => {
      callback({
        executeSql: (query, params, success, error) => {
          console.log('Mock SQL:', query, params);
          success({ rows: { _array: [] } });
        }
      });
    }
  };
}

export const initDatabase = () => {
  // ... existing tables ...

  // Create weather table
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS weather (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location_name TEXT,
        latitude REAL,
        longitude REAL,
        current_temperature TEXT,
        current_condition TEXT,
        current_humidity TEXT,
        current_wind_speed TEXT,
        current_feels_like TEXT,
        current_rain TEXT,
        current_sunrise TEXT,
        current_sunset TEXT,
        forecast_data TEXT,
        last_updated TEXT
      )`
    );
  });
};

export const saveWeatherData = (weatherData) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT OR REPLACE INTO weather (
          id, location_name, latitude, longitude, 
          current_temperature, current_condition, current_humidity,
          current_wind_speed, current_feels_like, current_rain,
          current_sunrise, current_sunset, forecast_data, last_updated
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          weatherData.locationName,
          weatherData.latitude,
          weatherData.longitude,
          weatherData.current.temperature,
          weatherData.current.condition,
          weatherData.current.humidity,
          weatherData.current.windSpeed,
          weatherData.current.feelsLike,
          weatherData.current.rain,
          weatherData.current.sunrise,
          weatherData.current.sunset,
          JSON.stringify(weatherData.forecast),
          new Date().toISOString()
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getWeatherData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM weather WHERE id = 1',
        [],
        (_, { rows: { _array } }) => {
          if (_array && _array.length > 0) {
            const data = _array[0];
            resolve({
              current_temperature: data.current_temperature,
              current_rain: data.current_rain
            });
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
}; 