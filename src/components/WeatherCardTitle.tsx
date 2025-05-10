export const WeatherCardTitle = ({
  title,
  subtitle,
  className,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) => {
  return (
    <p className={'text-xl' + (className ? ` ${className}` : '')}>
      {title && <strong>{title}</strong>}
      {subtitle && <span>{subtitle}</span>}
    </p>
  );
};
