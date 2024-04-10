import React from 'react';
import { LuUser } from 'react-icons/lu';
import { AdaugaModifica } from '@/pages/pacienti/components/AdaugaModifica.tsx';
import { Header } from '@/components/ui/header.tsx';
import { InfoBlock } from '@/components/info-block/InfoBlock.tsx';
import { Pacient } from '@/pages/pacienti/components/types.ts';

type Props = {
  data?: Pacient;
};

export const InformatiiPacient: React.FC<Props> = ({ data }) => {
  const { nume, prenume, cnp, serieCI, numarCI, email, telefon } = data || {};

  return (
    <div className="card">
      <Header
        title={
          <div className="flex flex-row gap-2">
            <LuUser style={{ fontSize: '24px' }} /> {nume} {prenume}
          </div>
        }>
        <AdaugaModifica
          pacient={data}
          isDetail={true}
        />
      </Header>

      <div className="grid grid-cols-3 gap-3 px-4">
        <InfoBlock
          title="CNP"
          value={cnp}
        />
        <InfoBlock
          title="Seie CI"
          value={serieCI}
        />
        <InfoBlock
          title="Numar CI"
          value={numarCI}
        />
        <InfoBlock
          title="Email"
          value={email}
          isLastItem={true}
        />
        <InfoBlock
          title="Telefon"
          value={telefon}
          isLastItem={true}
        />
      </div>
    </div>
  );
};
