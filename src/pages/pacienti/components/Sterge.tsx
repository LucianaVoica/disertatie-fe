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
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
  isDetail?: boolean;
};

export default function Sterge({ id, isDetail }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function sterge(id: string) {
    const response = await axios.delete(`http://localhost:8080/pacienti/${id}/sterge`);
    return response.data;
  }

  const { mutate } = useMutation({
    mutationFn: (id: string) => sterge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      isDetail && navigate('/pacienti');

      toast({
        title: 'Success',
        description: 'Pacientul a fost șters cu succes!',
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={!isDetail ? 'text-red-600 hover:text-red-800' : ''}
          variant={isDetail ? 'destructive' : 'ghost'}
          size={isDetail ? 'default' : 'icon'}>
          <div className="flex flex-row gap-2 items-center">
            <LuTrash2 className="w-5 h-5" />
            {isDetail && 'Șterge'}
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Șterge pacientul</AlertDialogTitle>
          <AlertDialogDescription>Ești sigur că dorești să ștergi pacientul?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anulează</AlertDialogCancel>
          <AlertDialogAction
            className={'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'}
            onClick={() => mutate(id)}>
            Șterge
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
