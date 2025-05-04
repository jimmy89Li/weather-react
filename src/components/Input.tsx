import React from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'>;

export const Input = ({ className, ...rest }: InputProps) => {
  let inputClass =
    'h-10 w-full p-1 rounded-sm bg-white text-black focus:placeholder-gray-400 placeholder-black';
  inputClass += className ? ` ${className}` : '';

  return <input type='text' className={inputClass} {...rest} />;
};
