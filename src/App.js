import { useEffect, useState, useCallback } from 'react';
import { Weather } from './components/Weather';

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const fetchWeather = useCallback(async () => {
    setError(false);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const responseJson = await response.json();
    setData(responseJson);
  }, [latitude, longitude]);

  const fetchWeatherByCity = async (city) => {
    setError(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/weather?units=metric&q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      }
      if (response.status === 404) {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude, fetchWeather]);

  return (
    <section>
      {data ? (
        <Weather
          error={error}
          data={data}
          fetch={fetchWeather}
          fetchCity={fetchWeatherByCity}
        />
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default App;
