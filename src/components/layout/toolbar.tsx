import Logo from '@/components/layout/components/logo.tsx';
import User from './components/user.tsx';
import ThemeSwitcher from '@/components/layout/components/theme-switcher.tsx';
import PacientiButton from './components/pacienti-button.tsx';

export default function Toolbar() {
  return (
    <div className="h-[7vh] px-10 border-b bg-card items-center flex">
      <div className={'flex flex-row w-full items-center justify-between'}>
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <PacientiButton />
          <User />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
