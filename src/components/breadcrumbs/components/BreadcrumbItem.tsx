import React from 'react';
import { Breadcrumb } from '../hooks/useComputeBreadcrumbs';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import { NavLink } from 'react-router-dom';

type Props = {
  breadcrumb: Breadcrumb;
};

export const BreadcrumbItem: React.FC<Props> = ({ breadcrumb }) => {
  return (
    <li
      key={breadcrumb.path}
      className="flex">
      <div className="flex items-center">
        <BreadcrumbSeparator />
        <NavLink
          to={breadcrumb.path}
          className={'ml-4 max-w-[300px] overflow-ellipsis text-xs font-medium transition line-clamp-1'}>
          {breadcrumb.displayValue}
        </NavLink>
      </div>
    </li>
  );
};
