import { Button } from '@/components/ui/button.tsx';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '@/components/theme/useTheme.ts';
import Logo from '@/components/layout/logo.tsx';
import { NavLink } from 'react-router-dom';
import { FaUserDoctor } from 'react-icons/fa6';

export default function Toolbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[8vh] px-10 border-b bg-card items-center flex">
      <div className={'flex flex-row w-full items-center justify-between'}>
        <Logo />

        <div className="flex flex-row gap-2 items-center">
          <Button asChild>
            <NavLink to={'/pacienti'}>
              <div className="flex flex-row items-center gap-1">
                <FaUserDoctor className={'w-4 h-4'} />
                Pacienți
              </div>
            </NavLink>
          </Button>
          <Button
            onClick={toggleTheme}
            variant={'ghost'}
            size={'icon'}>
            {theme === 'light' ? <LuMoon className={' w-5 h-5'} /> : <LuSun className={'w-5 h-5'} />}
          </Button>
          <div>user</div>
        </div>
      </div>
    </div>
  );
}
