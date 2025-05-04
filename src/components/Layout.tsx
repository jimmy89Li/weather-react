import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div className='max-w-full flex justify-center'>
      <div className='max-w-xs text-center'>{children}</div>
    </div>
  );
};
