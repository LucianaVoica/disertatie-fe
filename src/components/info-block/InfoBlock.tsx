import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type InfoBlockProps = {
  title: string;
  value?: string;
  isLastItem?: boolean;
};

export const InfoBlock: React.FC<InfoBlockProps> = React.memo(({ title, value, isLastItem }) => {
  const className = useMemo(
    () => twMerge(`p-2 ${isLastItem ? '' : 'border-b'} flex flex-col justify-between`),
    [isLastItem]
  );

  const valueClassName = useMemo(() => twMerge('mt-1 text-sm text-default'), []);

  return (
    <div className={className}>
      <dt className="text-2xs">{title}</dt>
      <dd className={valueClassName}>{value ? value : '-'}</dd>
    </div>
  );
});
