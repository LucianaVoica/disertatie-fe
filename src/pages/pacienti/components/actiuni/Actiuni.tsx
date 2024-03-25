import Sterge from '@/pages/pacienti/components/actiuni/components/Sterge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { LuFile } from 'react-icons/lu';
import { AdaugaModifica } from '@/pages/pacienti/components/actiuni/components/AdaugaModifica.tsx';
import { Pacient } from '@/pages/pacienti/Lista.tsx';

type Props = {
  pacient: Pacient;
};

export function Actiuni(props: Props) {
  const { pacient } = props;

  return (
    <div className={'flex flex-row gap-1'}>
      <Button
        variant={'ghost'}
        size={'icon'}
        asChild>
        <NavLink to={`/${pacient.id}`}>
          <LuFile className={'w-5 h-5'} />
        </NavLink>
      </Button>
      <AdaugaModifica pacient={pacient} />
      <Sterge id={pacient.id} />
    </div>
  );
}
