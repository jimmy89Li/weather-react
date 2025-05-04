import { fetchWeatherApi } from 'openmeteo';
import { City } from '../interfaces/city.interface';
import { weatherConditions } from '../interfaces/weather.interface';

export const getSessionCityWeather = () => {
  return sessionStorage.getItem(import.meta.env.VITE_SAVED_CITY_WEATHER) || '';
};
export const setSessionCityWeather = (value: string) => {
  return sessionStorage.setItem(import.meta.env.VITE_SAVED_CITY_WEATHER, value);
};

export const weatherCodeToCondition = (weatherCode: number): string => {
  const weatherCondition = weatherConditions.find(
    (condition) => condition.code == weatherCode
  );

  return weatherCondition?.condition || 'N/A';
};

const params = {
  latitude: '',
  longitude: '',
  daily: ['weather_code', 'temperature_2m_min', 'temperature_2m_max'],
  current: ['temperature_2m', 'apparent_temperature', 'rain', 'weather_code'],
  timezone: 'GMT', // Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const getCityWeather = async (data: City) => {
  if (!data.latitude || !data.longitude) return [];

  params.latitude = data.latitude;
  params.longitude = data.longitude;

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: Math.round(current.variables(0)!.value()),
      apparentTemperature: Math.round(current.variables(1)!.value()),
      rain: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
      weatherCondition: weatherCodeToCondition(current.variables(3)!.value()),
    },
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      temperature2mMax: daily.variables(2)!.valuesArray()!,
    },
  };

  return weatherData;
};
