import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { Payment } from '@/pages/ListaPacienti.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LuTrash2 } from 'react-icons/lu';

type Props = {
  payment: Payment;
};

export default function Sterge({ payment }: Props) {
  const sterge = () => {
    toast({
      title: 'Vrei sa stergi serifule?',
      description: payment.id,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={'destructive'}
          size={'icon'}>
          <LuTrash2 className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={sterge}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
