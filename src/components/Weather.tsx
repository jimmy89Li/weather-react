import { JSX, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCityGeo } from '../services/city';
import {
  getCityWeather,
  getLocalCityWeather,
  setLocalCityWeather,
} from '../services/weather';
import {
  getLocalCity,
  setLocalCity,
  setLocalCityGeo,
  getLocalCityGeo,
} from '../services/city';
import { CityContext, CityWeatherContext } from '../services/context';

export const Weather = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [contextCity, setContextCity] = useState(getLocalCity());
  const [contextCityWeather, setContextCityWeather] = useState(
    getLocalCityWeather()
  );
  const contextCityGeo = getLocalCityGeo();

  const { data: cityData } = useQuery({
    staleTime: Infinity, // Infinite caching.
    queryKey: ['cityData', { contextCity }],
    queryFn: () => getCityGeo(contextCity),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (!cityData || Object.keys(cityData).length === 0) return;
    if (cityData.name) {
      setContextCity(cityData.name);
      setLocalCity(cityData.name);
    }
    setLocalCityGeo(JSON.stringify(cityData));
  }, [cityData]);

  const { data: cityWeather } = useQuery({
    staleTime: 15 * 60 * 1000, // 15 minutes caching.
    queryKey: ['cityWeather', contextCityGeo],
    queryFn: () => getCityWeather(JSON.parse(contextCityGeo)),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (!cityWeather || Object.keys(cityWeather).length === 0) return;
    setContextCityWeather(JSON.stringify(cityWeather));
    setLocalCityWeather(JSON.stringify(cityWeather));
  }, [cityWeather]);

  return (
    <CityContext.Provider value={{ contextCity, setContextCity }}>
      <CityWeatherContext value={{ contextCityWeather, setContextCityWeather }}>
        {children}
      </CityWeatherContext>
    </CityContext.Provider>
  );
};
