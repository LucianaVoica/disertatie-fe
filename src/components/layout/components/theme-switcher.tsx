import { useTheme } from '@/components/theme/useTheme.ts';
import { Button } from '@/components/ui/button.tsx';
import { LuMoon, LuSun } from 'react-icons/lu';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant={'ghost'}
      size={'icon'}>
      {theme === 'light' ? <LuMoon className={' w-5 h-5'} /> : <LuSun className={'w-5 h-5'} />}
    </Button>
  );
}
