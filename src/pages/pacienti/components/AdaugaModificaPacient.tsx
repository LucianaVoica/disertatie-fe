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
import { Pacient } from '@/pages/pacienti/types/types.ts';
import { CommonTerms } from '@/lib/common.terms.ts';
import axiosInstance from '@/lib/interceptor.ts';
import { useMemo } from 'react';
import { z } from '@/zod.config.ts';

type Props = {
  pacient?: Pacient;
  isDetail?: boolean;
};

export function AdaugaModificaPacient(props: Props) {
  const { pacient, isDetail } = props;
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

  async function adaugaModifica(data: Pacient) {
    if (pacient?.id) {
      const response = await axiosInstance.post(`http://localhost:8080/pacienti/${pacient.id}/modifica`, data);
      return response.data;
    } else {
      const response = await axiosInstance.post('http://localhost:8080/pacienti/adauga', data);
      return response.data;
    }
  }

  const { mutate } = useMutation({
    mutationFn: (data: Pacient) => adaugaModifica(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lista'] });
      pacient?.id && queryClient.invalidateQueries({ queryKey: ['detalii-pacient', pacient.id] });
      toast({
        title: 'Succes',
        description: 'Operație efectuată cu succes!',
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
    form.reset();
  }

  const prefill = () => {
    const numeArray = ['Popescu', 'Ionescu', 'Georgescu', 'Dumitrescu', 'Petrescu'];
    const prenumeArray = ['Ion', 'Vasile', 'Gheorghe', 'Mihai', 'Andrei'];
    const serieCIArray = ['AB', 'BC', 'BR', 'BZ', 'CS'];

    const randomNume = numeArray[Math.floor(Math.random() * numeArray.length)];
    const randomPrenume = prenumeArray[Math.floor(Math.random() * prenumeArray.length)];
    const randomEmail = `${randomPrenume.toLowerCase()}.${randomNume.toLowerCase()}@gmail.com`;
    const randomPhone = Math.floor(Math.random() * 9000000000) + 1000000000; // generates a random 10 digit number
    const randomCNP = Math.floor(Math.random() * 9000000000000) + 1000000000000; // generates a random 13 digit number
    const randomSerieCI = serieCIArray[Math.floor(Math.random() * serieCIArray.length)];
    const randomCI = Math.floor(Math.random() * 900000) + 100000; // generates a random 6 digit number

    form.setValue('nume', randomNume);
    form.setValue('prenume', randomPrenume);
    form.setValue('email', randomEmail);
    form.setValue('telefon', randomPhone.toString());
    form.setValue('cnp', randomCNP.toString());
    form.setValue('serieCI', randomSerieCI);
    form.setValue('numarCI', randomCI.toString());
    form.trigger();
  };

  const buttonContent = useMemo(() => {
    const Icon = pacient?.id ? LuPenSquare : LuPlusCircle;
    const label = pacient?.id ? CommonTerms.Edit : CommonTerms.Add;

    return (
      <>
        <Icon className={'h-5 w-5 mr-2'} />
        {isDetail && label}
      </>
    );
  }, [pacient?.id, isDetail]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={!isDetail ? 'text-blue-600 hover:text-blue-900/80' : ''}
          variant={isDetail ? 'accent' : 'ghost'}
          size={isDetail ? 'default' : 'icon'}>
          {buttonContent}
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
              <Button
                type={'button'}
                onClick={prefill}
                variant="outline">
                {CommonTerms.Prefill}
              </Button>
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
