import { useState, useEffect } from 'react';

function useLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            loading: false,
            error: error.message,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        loading: false,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  }, []);

  return location;
}

export default useLocation;