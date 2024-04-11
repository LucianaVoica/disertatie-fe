import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { InformatiiPacient } from '@/pages/pacienti/detalii/informatii/InformatiiPacient.tsx';
import { Pacient } from '@/pages/pacienti/types/types.ts';

export const DetaliiPacient: React.FC = () => {
  const { id } = useParams();
  async function fetchDetaliiPacient(): Promise<Pacient> {
    const response = await axios.get(`http://localhost:8080/pacienti/${id}`);
    return response.data;
  }
  const { data } = useQuery({
    queryKey: ['detalii-pacient', id],
    queryFn: () => fetchDetaliiPacient(),
    enabled: !!id,
  });

  return <InformatiiPacient data={data} />;
};
