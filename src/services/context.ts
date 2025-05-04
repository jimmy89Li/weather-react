import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface CityContext {
  contextCity: string;
  setContextCity: Dispatch<SetStateAction<string>>;
}

interface CityWeatherContext {
  contextCityWeather: string;
  setContextCityWeather: Dispatch<SetStateAction<string>>;
}

// City context.
export const CityContext = createContext<CityContext>({} as CityContext);

export const useCityContext = () => {
  const { contextCity, setContextCity } = useContext(CityContext);

  if (contextCity === undefined) {
    throw new Error('CityContext is missing.');
  }

  return { contextCity, setContextCity };
};

// City weather context.
export const CityWeatherContext = createContext<CityWeatherContext>(
  {} as CityWeatherContext
);

export const useCityWeatherContext = () => {
  const { contextCityWeather, setContextCityWeather } =
    useContext(CityWeatherContext);

  if (contextCityWeather === undefined) {
    throw new Error('CityWeatherContext is missing.');
  }

  return { contextCityWeather, setContextCityWeather };
};
