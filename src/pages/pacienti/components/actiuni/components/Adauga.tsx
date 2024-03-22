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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea.tsx';
import axios from 'axios';

export type Pacient = {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  cnp: string;
  serieCI: string;
  numarCI: string;
};

function Adauga() {
  const queryClient = useQueryClient();

  const formSchema = z.object({
    nume: z.string().min(2).max(50),
    prenume: z.string().min(2).max(50),
    email: z.string(),
    telefon: z.string().max(10),
    cnp: z.string().max(13),
    serieCI: z.string().max(5),
    numarCI: z.string().max(6),
    adresa: z.string().max(255),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function adauga(data: Pacient) {
    const response = await axios.post('http://localhost:8080/pacienti/adauga', data);
    return response.data;
  }

  const { mutate } = useMutation({
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'accent'}>
          <LuPlusCircle className={'h-5 w-5 mr-2'} />
          Adaugă
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle className={'flex flex-row gap-2 items-center'}>
            <LuPenSquare className={'h-5 w-5'} />
            Adauga
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 max-h-[475px] overflow-y-scroll p-1 ">
            <FormField
              control={form.control}
              name="nume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Popescu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prenume</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="EX: Ion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnp"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numar CI</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eddie"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="07..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
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
            <FormField
              control={form.control}
              name="adresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresa</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { Adauga };
