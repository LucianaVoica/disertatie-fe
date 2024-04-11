import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { FaUserDoctor } from 'react-icons/fa6';

export default function ThemeSwitcher() {
  return (
    <Button
      variant={'ghost'}
      asChild>
      <NavLink to={'/pacienti'}>
        <div className="flex flex-row items-center gap-1">
          <FaUserDoctor className={'w-4 h-4'} />
          Pacienți
        </div>
      </NavLink>
    </Button>
  );
}
