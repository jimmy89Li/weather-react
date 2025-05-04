import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { setLocalCity } from '../services/city';
import { useCityContext } from '../services/context';

export const WeatherSearch = () => {
  const { contextCity, setContextCity } = useCityContext();
  const [inputCity, setInputCity] = useState(contextCity);

  return (
    <div className='w-full mt-2 flex justify-between gap-2'>
      <Input
        placeholder='City'
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        onKeyDown={(k) => {
          if (k.key === 'Enter') {
            setContextCity(inputCity);
            setLocalCity(inputCity);
          }
        }}
      />
      <Button
        onClick={() => {
          setContextCity(inputCity);
          setLocalCity(inputCity);
        }}
      >
        Search
      </Button>
    </div>
  );
};
