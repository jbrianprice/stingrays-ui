import { useState, useEffect } from 'react';
import useLocation from './useLocation';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userCords = useLocation()

  const {latitude, longitude} = userCords ?? {}

  const apiKey = '26b4a2253d48fd49e161d9e1eb837eda';  // Replace with your weather API key
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // Load weatherData and lastFetched from sessionStorage
  useEffect(() => {
    const storedWeatherData = sessionStorage.getItem('weatherData');
    const storedLastFetched = sessionStorage.getItem('lastFetched');
    
    if (storedWeatherData && storedLastFetched) {
      setWeatherData(JSON.parse(storedWeatherData));
      setLastFetched(parseInt(storedLastFetched, 10));
    }
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(weatherApiUrl);
      console.log('afsdfasdfsas',response)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      const now = Date.now();
      setLastFetched(now);
      sessionStorage.setItem('weatherData', JSON.stringify(data));  // Store data in sessionStorage
      sessionStorage.setItem('lastFetched', now.toString());  // Store last fetched timestamp in sessionStorage
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = Date.now();
    
    // Only fetch new data if it's been more than 10 minutes or no data is in sessionStorage
    if (!lastFetched || now - lastFetched > 600000) {
      fetchWeatherData();
    }
  }, [latitude, longitude, lastFetched]); // Dependency on lat, lon, and lastFetched

  return { weatherData, loading, error };
};

export default useWeather;
