import React from 'react';
import { Pacient } from '@/pages/pacienti/Lista.tsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { InformatiiPacient } from '@/pages/pacienti/detalii/components/InformatiiPacient.tsx';

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
