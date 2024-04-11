import Sterge from '@/pages/pacienti/components/Sterge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { LuFileSearch } from 'react-icons/lu';
import { AdaugaModifica } from '@/pages/pacienti/components/AdaugaModifica.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';

type Props = {
  pacient: Pacient;
};

export function Actiuni(props: Props) {
  const { pacient } = props;

  if (!pacient.id) return <>-</>;

  return (
    <div className={'flex flex-row gap-1'}>
      <Button
        variant={'ghost'}
        size={'icon'}
        asChild>
        <NavLink to={`/pacienti/${pacient.id}`}>
          <LuFileSearch className={'w-5 h-5'} />
        </NavLink>
      </Button>
      <AdaugaModifica pacient={pacient} />
      <Sterge id={pacient.id} />
    </div>
  );
}
