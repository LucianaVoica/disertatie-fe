import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/DataTable.tsx';
import { Header } from '@/components/ui/header.tsx';
import { AdaugaModificaPacient } from '@/pages/pacienti/components/AdaugaModificaPacient.tsx';
import { useQuery } from '@tanstack/react-query';
import { ActiuniPacient } from '@/pages/pacienti/components/ActiuniPacient.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';
import { CommonTerms } from '@/lib/common.terms.ts';
import axiosInstance from '@/lib/interceptor.ts';
import { useEffect } from 'react';
import { BreadcrumbsService } from '@/components/breadcrumbs';

export default function ListaPacienti() {
  const columns: ColumnDef<Pacient>[] = [
    {
      accessorKey: 'nume',
      header: 'Nume Prenume',
      cell: ({ row }) => `${row.original.nume} ${row.original.prenume}`,
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
      header: 'Număr CI',
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
      header: CommonTerms.Actions,
      cell: ({ row }) => <ActiuniPacient pacient={row.original} />,
    },
  ];

  async function fetchPacienti(): Promise<Pacient[]> {
    const response = await axiosInstance.get('http://localhost:8080/pacienti');
    return response.data;
  }

  const { data } = useQuery({
    queryKey: ['lista'],
    queryFn: () => fetchPacienti(),
  });

  useEffect(() => {
    BreadcrumbsService.setNameForPath('pacienti', 'Pacienți');
  }, []);

  return (
    <div className={'card'}>
      <Header title={'Pacienti'}>
        <AdaugaModificaPacient isDetail={true} />
      </Header>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
