export const WeatherCardTitle = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <p className='text-xl'>
      {title && <strong>{title}</strong>}
      {subtitle && <span>{subtitle}</span>}
    </p>
  );
};
