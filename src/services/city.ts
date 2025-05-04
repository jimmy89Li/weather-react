import { City } from '../interfaces/city.interface';

export const getLocalCity = () => {
  return localStorage.getItem(import.meta.env.VITE_SAVED_CITY) || '';
};

export const setLocalCity = (value: string) => {
  return localStorage.setItem(import.meta.env.VITE_SAVED_CITY, value);
};

export const getLocalCityGeo = () => {
  return localStorage.getItem(import.meta.env.VITE_SAVED_CITY_GEO) || '';
};
export const setLocalCityGeo = (value: string) => {
  return localStorage.setItem(import.meta.env.VITE_SAVED_CITY_GEO, value);
};

// Get the city geolocation.
export const getCityGeo = async (city: string) => {
  if (!city) return [] as City;

  try {
    console.log(`Fetching: ${city}`);
    const geoUrl = import.meta.env.VITE_API_GEO_URL;
    const geoQuery = `/search?name=${city}&count=1`;
    const geoResponse = await fetch(geoUrl + geoQuery, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (!geoResponse) {
      throw Error(`No coordinates found for: ${city}`);
    }

    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw Error(`No data found for: ${city}`);
    }

    const cityData: City = {
      name: geoData.results[0].name,
      latitude: geoData.results[0].latitude,
      longitude: geoData.results[0].longitude,
    };

    return cityData;
  } catch (error) {
    console.error(error);
    return [] as City;
  }
};
