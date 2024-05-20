import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { InformatiiPacient } from '@/pages/pacienti/detalii/informatii/InformatiiPacient.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';
import axiosInstance from '@/lib/interceptor.ts';
import Predictie from '@/pages/predictie/Predictie.tsx';

export const DetaliiPacient: React.FC = () => {
  const { id } = useParams();
  async function fetchDetaliiPacient(): Promise<Pacient> {
    const response = await axiosInstance.get(`http://localhost:8080/pacienti/${id}`);
    return response.data;
  }
  const { data } = useQuery({
    queryKey: ['detalii-pacient', id],
    queryFn: () => fetchDetaliiPacient(),
    enabled: !!id,
  });

  return (
    <div className="flex flex-col gap-3">
      <InformatiiPacient data={data} />
      <Predictie />
    </div>
  );
};
