import React from 'react';
import { Breadcrumb } from './hooks/useComputeBreadcrumbs';
import { BreadcrumbItem } from './components/BreadcrumbItem';
import { BreadcrumbIcon } from './components/BreadcrumbIcon';
import { twMerge } from 'tailwind-merge';
import { LuHome } from 'react-icons/lu';

type Props = {
  breadcrumbs: Breadcrumb[];
  homeUrl?: string;
  className?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ breadcrumbs, homeUrl = '/', className }) => {
  return (
    <nav
      className={twMerge('box-border hidden h-[5vh] border-b px-8 lg:flex', className)}
      aria-label="Breadcrumb">
      <ol className="flex w-full space-x-4 px-4 sm:px-0">
        <BreadcrumbIcon
          url={homeUrl}
          Icon={LuHome}
        />
        {breadcrumbs?.map((b) => (
          <BreadcrumbItem
            key={b.path}
            breadcrumb={b}
          />
        ))}
      </ol>
    </nav>
  );
};
