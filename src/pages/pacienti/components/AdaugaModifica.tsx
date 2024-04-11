import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { LuPenSquare, LuPlusCircle } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Pacient } from '@/pages/pacienti/types/types.ts';
import { z } from '@/main';
import { CommonTerms } from '@/lib/common.terms.ts';

export function AdaugaModifica({ pacient, isDetail }: { pacient?: Pacient; isDetail?: boolean }) {
  const queryClient = useQueryClient();

  const formSchema = z.object({
    nume: z.string().min(1).max(50),
    prenume: z.string().min(1).max(50),
    email: z.string().min(1),
    telefon: z.string().max(10),
    cnp: z.string().max(13),
    serieCI: z.string().max(5),
    numarCI: z.string().max(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  async function adauga(data: Pacient) {
    const response = await axios.post('http://localhost:8080/pacienti/adauga', data);
    return response.data;
  }

  async function modifica(data: Pacient) {
    const response = await axios.post(`http://localhost:8080/pacienti/${pacient?.id}/modifica`, data);
    return response.data;
  }

  const { mutate: adaugaPacient } = useMutation({
    mutationFn: (data: Pacient) => adauga(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      toast({
        title: 'Success',
        description: 'Operatie efectuata cu succes!',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Eroare',
        variant: 'destructive',
      });
    },
  });

  const { mutate: modificaPacient } = useMutation({
    mutationFn: (data: Pacient) => modifica(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      queryClient.invalidateQueries({ queryKey: ['detalii-pacient', pacient?.id] });
      toast({
        title: 'Succes',
        description: 'Operație efectuată cu succes!',
      });
    },
    onError: () => {
      toast({
        title: 'Eroare',
        description: 'Ceva nu a mers conform planului',
        variant: 'destructive',
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!pacient?.id) {
      adaugaPacient(values);
    } else {
      modificaPacient(values);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={!isDetail ? 'text-blue-600 hover:text-blue-900/80' : ''}
          variant={isDetail ? 'accent' : 'ghost'}
          size={isDetail ? 'default' : 'icon'}>
          {!pacient?.id ? <LuPlusCircle className={'h-5 w-5 mr-2'} /> : <LuPenSquare className={'h-5 w-5 mr-2'} />}
          {isDetail && (!pacient?.id ? CommonTerms.Add : CommonTerms.Edit)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className={'flex flex-row gap-2 items-center'}>
            {!pacient?.id ? <LuPlusCircle className={'h-5 w-5'} /> : <LuPenSquare className={'h-5 w-5'} />}
            {!pacient?.id ? CommonTerms.Add : CommonTerms.Edit}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 max-h-[475px] overflow-y-scroll px-3 py-1.5">
            <FormField
              control={form.control}
              name="nume"
              defaultValue={pacient?.nume}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenume"
              defaultValue={pacient?.prenume}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prenume</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnp"
              defaultValue={pacient?.cnp}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serieCI"
              defaultValue={pacient?.serieCI}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serie CI</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numarCI"
              defaultValue={pacient?.numarCI}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Număr CI</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefon"
              defaultValue={pacient?.telefon}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              defaultValue={pacient?.email}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={!form.formState.isValid}
                  type="submit">
                  <div className="flex flex-row gap-2 items-center">
                    {!pacient?.id ? <LuPlusCircle className={'h-5 w-5'} /> : <LuPenSquare className={'h-5 w-5'} />}
                    {!pacient?.id ? CommonTerms.Add : CommonTerms.Edit}
                  </div>
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
