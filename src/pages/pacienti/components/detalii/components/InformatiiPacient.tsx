import React from 'react';
import { Pacient } from '@/pages/pacienti/Lista.tsx';
import { LuUser } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

type Props = {
  data?: Pacient;
};
export const InformatiiPacient: React.FC<Props> = ({ data }) => {
  return (
    <div className="card">
      <div className="border-b px-3 py-3 sm:px-6">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-3">
            <LuUser style={{ fontSize: '24px' }} />
            <div className="font-semibold leading-6 text-base">Detalii pacient</div>
          </div>
          <div className="flex md:flex-row flex-col gap-1 justify-end ml-auto">Ceva acțiuni, dacă e cazul</div>
        </div>
      </div>

      <div className="flex flex-row gap-5 pl-5 pt-5">
        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">Nume</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.nume}</dd>
          </div>
        </div>

        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">Prenume</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.prenume}</dd>
          </div>
        </div>

        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">CNP</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.cnp}</dd>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 pl-5 pt-5">
        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">Seie CI</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.serieCI}</dd>
          </div>
        </div>

        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">Numar CI</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.numarCI}</dd>
          </div>
        </div>

        <div className="flex-1">
          <div className={twMerge('p-2 border-b flex flex-col justify-between')}>
            <dt className="text-2xs">Email</dt>
            <dd className={twMerge('mt-1 text-sm text-default')}>{data?.email}</dd>
          </div>
        </div>
      </div>
    </div>
  );
};
