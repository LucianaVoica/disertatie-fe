import { Payment } from '@/pages/Lista.tsx';
import Sterge from '@/pages/components/Sterge.tsx';

type Props = {
  payment: Payment;
};

export function Actiuni(props: Props) {
  const { payment } = props;

  return (
    <div className={'flex flex-row gap-1'}>
      <Sterge payment={payment} />
    </div>
  );
}
