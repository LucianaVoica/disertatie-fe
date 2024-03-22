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
import axios from 'axios';

type Props = {
  id: string;
};

export default function Sterge({ id }: Props) {
  const queryClient = useQueryClient();
  async function sterge(id: string) {
    const response = await axios.delete(`http://localhost:8080/pacienti/${id}/sterge`);
    return response.data;
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
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className={'text-red-600'}
          variant={'ghost'}
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
