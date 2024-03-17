import { Outlet } from 'react-router-dom';
import Toolbar from './toolbar';
import Footer from './footer';

export default function Layout() {
  return (
    <div className="max-h-screen min-h-screen bg-background">
      <Toolbar />
      <div className="h-[84vh] overflow-y-scroll overflow-x-hidden bg-background">
        <div className="m-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
