import React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  let buttonClass = `h-10 w-20 p-1 rounded-sm bg-blue-400
    border-3 border-blue-400 hover:border-blue-500 active:border-blue-600`;
  buttonClass += className ? ` ${className}` : '';

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
