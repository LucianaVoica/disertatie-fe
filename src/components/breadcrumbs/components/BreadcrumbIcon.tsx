import React from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

type Props = {
  url: string;
  Icon: IconType;
};

export const BreadcrumbIcon: React.FC<Props> = ({ Icon, url }) => {
  return (
    <li className="ml-1 flex">
      <div className="flex items-center">
        <NavLink
          to={url}
          className="transition">
          <Icon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="sr-only">Acasă</span>
        </NavLink>
      </div>
    </li>
  );
};
