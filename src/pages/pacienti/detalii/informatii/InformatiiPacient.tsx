import React, { useEffect } from 'react';
import { LuUser } from 'react-icons/lu';
import { AdaugaModificaPacient } from '@/pages/pacienti/components/AdaugaModificaPacient.tsx';
import { Header } from '@/components/ui/header.tsx';
import { InfoBlock } from '@/components/info-block/InfoBlock.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';
import StergePacient from '@/pages/pacienti/components/StergePacient.tsx';
import { BreadcrumbsService } from '@/components/breadcrumbs';

type Props = {
  data?: Pacient;
};

export const InformatiiPacient: React.FC<Props> = ({ data }) => {
  const { id, nume, prenume, cnp, serieCI, numarCI, email, telefon } = data || {};

  useEffect(() => {
    if (!id) return;
    BreadcrumbsService.setNameForPath(id, `${nume} ${prenume}`);
  }, [id, nume, prenume]);

  return (
    <div className="card">
      <Header
        title={
          <div className="flex flex-row gap-2">
            <LuUser style={{ fontSize: '24px' }} /> {nume} {prenume}
          </div>
        }>
        <div className="flex flex-row gap-2">
          {data?.id && (
            <StergePacient
              id={data.id}
              isDetail={true}
            />
          )}
          <AdaugaModificaPacient
            pacient={data}
            isDetail={true}
          />
        </div>
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
