import Sterge from '@/pages/components/Sterge.tsx';

type Props = {
  id: string;
};

export function Actiuni(props: Props) {
  const { id } = props;

  return (
    <div className={'flex flex-row gap-1'}>
      <Sterge id={id} />
    </div>
  );
}
