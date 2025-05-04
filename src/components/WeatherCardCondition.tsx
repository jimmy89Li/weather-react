import { Strong } from './Strong';

interface WeatherCardCondition {
  text?: string;
  data: number | string;
}

export const WeatherCardCondition = ({ text, data }: WeatherCardCondition) => {
  if (!data) return;

  return (
    <span>
      {text && <Strong>{text}</Strong>} {data}
    </span>
  );
};
