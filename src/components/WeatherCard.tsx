import { useEffect, useState } from 'react';
import { useCityContext, useCityWeatherContext } from '../services/context';
import {
  DailyWeatherInterface,
  WeatherInterface,
} from '../interfaces/weather.interface';
import { WeatherCardTitle } from './WeatherCardTitle';
import { WeatherCardCondition } from './WeatherCardCondition';
import { isoToDate } from '../services/utils';

export const WeatherCard = () => {
  const { contextCity } = useCityContext();
  const { contextCityWeather } = useCityWeatherContext();
  const [current, setCurrent] = useState({} as WeatherInterface);
  const [daily, setDaily] = useState({} as DailyWeatherInterface);

  useEffect(() => {
    if (!contextCityWeather) return;
    const data = JSON.parse(contextCityWeather);
    setCurrent(data.current);
    setDaily(data.daily);
  }, [contextCityWeather]);

  if (!current) {
    return (
      <div className='w-full mt-2 p-4 text-left flex flex-col gap-2 border border-amber-50 rounded-sm'>
        <WeatherCardTitle title='no data...' />
      </div>
    );
  }

  return (
    <>
      <div className='w-full mt-2 p-4 text-left flex flex-col gap-2 border border-amber-50 rounded-sm'>
        {!contextCity && <WeatherCardTitle title={'no data yet...'} />}
        <WeatherCardTitle
          title={contextCity}
          subtitle={daily.time && ` - ${isoToDate(daily.time[0])}`}
        />
        <WeatherCardCondition
          text='Temp:'
          data={`${current.temperature2m} °C`}
        />
        <WeatherCardCondition
          text='Feels:'
          data={`${current.apparentTemperature} °C`}
        />
        {daily && daily.temperature2mMin && daily.temperature2mMax && (
          <WeatherCardCondition
            data={`${Math.round(daily.temperature2mMin[0])}
              / ${Math.round(daily.temperature2mMax[0])} °C`}
            text='Min/Max:'
          />
        )}

        <WeatherCardCondition data={current.weatherCondition} />

        {current && current.time && (
          <div>
            {`Updated: ${new Date(current.time).toLocaleTimeString('en-US', {
              hour12: false,
            })}`}
          </div>
        )}
      </div>
      <div className='w-full mt-2 p-4 text-left flex flex-col gap-2 border border-amber-50 rounded-sm'>
        {daily &&
          daily.time &&
          daily.temperature2mMin &&
          daily.temperature2mMax && (
            <>
              {[...Array(7)].map((x, i) => {
                return (
                  <WeatherCardTitle
                    key={`${x}+${i}`}
                    title={daily.time && isoToDate(daily.time[i])}
                    subtitle={` - ${Math.round(daily.temperature2mMin[i])}
                  / ${Math.round(daily.temperature2mMax[i])} °C`}
                  />
                );
              })}
            </>
          )}
      </div>
    </>
  );
};
