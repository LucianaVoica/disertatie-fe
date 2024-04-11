import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useObservable } from '@/lib/hooks/useObservable.ts';
import { BreadcrumbsService } from '@/components/breadcrumbs';

export type Breadcrumb = {
  path: string;
  displayValue: string;
};

const formatPath = (path: string) => {
  const temp = path.replace(/-/g, ' ').replace(/_/g, ' ').toLowerCase();
  return temp.charAt(0).toUpperCase() + temp.slice(1);
};

export const useComputeBreadcrumbs = () => {
  const location = useLocation();

  const ignoring = useObservable(BreadcrumbsService.ignoringMapping$);
  const naming = useObservable(BreadcrumbsService.dictionaryMapping$);

  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    if (!location) {
      return [];
    }
    const parts = location.pathname.split('/').filter((part) => part !== '');
    let crumbs: Breadcrumb[] = [];

    parts.forEach((p, index) => {
      if (ignoring && ignoring?.includes(p)) {
        return;
      }

      const url = parts.slice(0, index + 1).join('/');
      if (naming && Object.keys(naming)?.includes(p)) {
        crumbs = [
          ...crumbs,
          {
            path: url,
            displayValue: naming[p],
          },
        ];
      } else {
        crumbs = [
          ...crumbs,
          {
            path: url,
            displayValue: formatPath(p),
          },
        ];
      }
    });
    return crumbs;
  }, [location, ignoring, naming]);

  return breadcrumbs;
};
