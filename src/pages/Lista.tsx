import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/pages/components/DataTable.tsx';
import { Header } from '@/components/ui/header.tsx';
import { Adauga } from '@/pages/components/Adauga.tsx';
import { useQuery } from '@tanstack/react-query';
import { LuClock } from 'react-icons/lu';
import { Actiuni } from '@/pages/components/Actiuni.tsx';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export default function Lista() {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex flex-row gap-1 items-center">
          <LuClock className="w-4 h-4" /> {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'id',
      header: 'Acțiuni',
      cell: ({ row }) => <Actiuni payment={row.original} />,
    },
  ];

  async function fetchPayments(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'm@example.com',
      },
      {
        id: '728ed52g',
        amount: 300,
        status: 'failed',
        email: 'q@example.com',
      },
    ];
  }

  const { data } = useQuery({
    queryKey: ['lista'],
    queryFn: () => fetchPayments(),
  });

  return (
    <div className={'card'}>
      <Header title={'Lista'}>
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
