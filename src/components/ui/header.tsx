import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  title: React.ReactNode;
};

function Header({ title, children }: Props) {
  return (
    <div className={'flex flex-row justify-between px-6 py-3 border-b'}>
      <span className={'text-lg font-medium leading-6'}>{title}</span>
      {children}
    </div>
  );
}

export { Header };
