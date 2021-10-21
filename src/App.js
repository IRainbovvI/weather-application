import { useEffect, useState, useCallback } from 'react';
import { Weather } from './components/Weather';

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [data, setData] = useState();

  const fetchWeather = useCallback(async () => {
    const responce = await fetch(
      `${process.env.REACT_APP_API_URL}/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const responceJson = await responce.json();
    setData(responceJson);
  }, [latitude, longitude]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    console.log('Latitude: ', latitude);
    console.log('Longitude: ', longitude);
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude, fetchWeather]);

  return <section>{data ? <Weather data={data} /> : <div></div>}</section>;
}

export default App;
