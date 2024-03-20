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
import { Button } from '@/components/ui/button.tsx';
import { LuTrash2 } from 'react-icons/lu';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  id: string;
};

export default function Sterge({ id }: Props) {
  const queryClient = useQueryClient();
  async function sterge(id: string) {
    const response = await fetch(`http://localhost:8080/pacienti/${id}/sterge`, {
      method: 'DELETE',
    });

    return response.json();
  }

  const { mutate } = useMutation({
    mutationFn: (id: string) => sterge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      toast({
        title: 'Success',
        description: 'Pacientul a fost șters cu succes!',
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      toast({
        title: 'Error',
        description: 'A apărut o eroare la ștergere.',
        variant: 'destructive',
      });
    },
  });

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
          <AlertDialogAction onClick={() => mutate(id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
