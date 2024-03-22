import Sterge from '@/pages/components/actiuni/components/Sterge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { LuFile } from 'react-icons/lu';

type Props = {
  id: string;
};

export function Actiuni(props: Props) {
  const { id } = props;

  return (
    <div className={'flex flex-row gap-1'}>
      <Button
        variant={'ghost'}
        size={'icon'}
        asChild>
        <NavLink to={'/'}>
          <LuFile className={'w-5 h-5'} />
        </NavLink>
      </Button>
      <Sterge id={id} />
    </div>
  );
}
