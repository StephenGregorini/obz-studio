import React from 'react';
import RitualsAgenda from '@/components/dashboard/RitualsAgenda';

const GovernancaRituais: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Governança e Rituais</h1>
      <RitualsAgenda />
    </div>
  );
};

export default GovernancaRituais;
