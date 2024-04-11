import StergePacient from '@/pages/pacienti/components/StergePacient.tsx';
import { Button } from '@/components/ui/button.tsx';
import { NavLink } from 'react-router-dom';
import { LuFileSearch } from 'react-icons/lu';
import { AdaugaModificaPacient } from '@/pages/pacienti/components/AdaugaModificaPacient.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';

type Props = {
  pacient: Pacient;
};

export function ActiuniPacient(props: Props) {
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
      <AdaugaModificaPacient pacient={pacient} />
      <StergePacient id={pacient.id} />
    </div>
  );
}
