import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to={'/'}>
      <h1 className="font-bold tracking-tight text-2xl">RadiX</h1>
    </NavLink>
  );
}
