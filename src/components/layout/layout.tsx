import { Outlet } from 'react-router-dom';
import Toolbar from './toolbar';
import Footer from './footer';
import { Breadcrumbs, useComputeBreadcrumbs } from '@/components/breadcrumbs';

export default function Layout() {
  const breadcrumbs = useComputeBreadcrumbs();
  return (
    <div className="max-h-screen min-h-screen bg-background">
      <Toolbar />
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className={'bg-card'}
      />
      <div className="h-[82vh] overflow-y-scroll overflow-x-hidden bg-background">
        <div className="m-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
