import { Button } from '@/components/ui/button.tsx';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '@/components/theme/useTheme.ts';

export default function Toolbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[8vh] px-10 border-b bg-card items-center flex">
      <div className={'flex flex-row w-full items-center justify-between'}>
        <div>logo</div>
        <div className="flex flex-row gap-2 items-center">
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
