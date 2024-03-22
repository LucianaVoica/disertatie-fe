import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/pages/pacienti/components/DataTable.tsx';
import { Header } from '@/components/ui/header.tsx';
import { Adauga } from '@/pages/pacienti/components/actiuni/components/Adauga.tsx';
import { useQuery } from '@tanstack/react-query';
import { Actiuni } from '@/pages/pacienti/components/actiuni/Actiuni.tsx';
import axios from 'axios';

export type Pacient = {
  id: string;
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  cnp: string;
  serieCI: string;
  numarCI: string;
};

export default function Lista() {
  const columns: ColumnDef<Pacient>[] = [
    {
      accessorKey: 'nume',
      header: 'Nume',
    },
    {
      accessorKey: 'prenume',
      header: 'Prenume',
    },
    {
      accessorKey: 'cnp',
      header: 'CNP',
    },
    {
      accessorKey: 'serieCI',
      header: 'Serie CI',
    },
    {
      accessorKey: 'numarCI',
      header: 'Numar CI',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'telefon',
      header: 'Telefon',
    },
    {
      accessorKey: 'id',
      header: 'Acțiuni',
      cell: ({ row }) => <Actiuni id={row.original.id} />,
    },
  ];

  async function fetchPacienti(): Promise<Pacient[]> {
    const response = await axios.get('http://localhost:8080/pacienti');
    return response.data;
  }

  const { data } = useQuery({
    queryKey: ['lista'],
    queryFn: () => fetchPacienti(),
  });

  return (
    <div className={'card'}>
      <Header title={'Pacienti'}>
        <Adauga />
      </Header>
      {data && (
        <DataTable
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}
