export interface WeatherInterface {
  apparentTemperature: number;
  rain: number;
  temperature2m: number;
  time: string;
  weatherCode: number;
  weatherCondition: string;
}

interface Object {
  [id: number]: number;
}

interface Array {
  [id: number]: string;
}

export interface DailyWeatherInterface {
  temperature2mMax: Object;
  temperature2mMin: Object;
  time: Array;
  weatherCode: Object;
}

export interface weatherConditionsInterface {
  code: number;
  condition: string;
}

export const weatherConditions: weatherConditionsInterface[] = [
  { code: 0, condition: 'Clear sky' },
  { code: 1, condition: 'Mainly clear' },
  { code: 2, condition: 'Partly cloudy' },
  { code: 3, condition: 'Overcast' },
  { code: 45, condition: 'Fog' },
  { code: 48, condition: 'Depositing rime fog' },
  { code: 51, condition: 'Drizzle: Light' },
  { code: 53, condition: 'Drizzle: Moderate' },
  { code: 55, condition: 'Drizzle: Dense' },
  { code: 56, condition: 'Freezing Drizzle: Light' },
  { code: 57, condition: 'Freezing Drizzle: Dense' },
  { code: 61, condition: 'Rain: Slight' },
  { code: 63, condition: 'Rain: Moderate' },
  { code: 65, condition: 'Rain: Heavy' },
  { code: 66, condition: 'Freezing Rain: Light' },
  { code: 67, condition: 'Freezing Rain: Heavy' },
  { code: 71, condition: 'Snow fall: Slight' },
  { code: 73, condition: 'Snow fall: Moderate' },
  { code: 75, condition: 'Snow fall: Heavy' },
  { code: 77, condition: 'Snow grains' },
  { code: 80, condition: 'Rain showers: Slight' },
  { code: 81, condition: 'Rain showers: moderate' },
  { code: 82, condition: 'Rain showers: violent' },
  { code: 85, condition: 'Snow showers slight' },
  { code: 86, condition: 'Snow showers heavy' },
  { code: 95, condition: 'Thunderstorm: Slight or moderate' },
  { code: 96, condition: 'Thunderstorm with slight hail' },
  { code: 99, condition: 'Thunderstorm with heavy hail' },
];
