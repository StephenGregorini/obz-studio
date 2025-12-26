import React from 'react';
import GainsSavingTable from '@/components/dashboard/GainsSavingTable';

const GestaoGanhos: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestão de Ganhos e Saving</h1>
      <GainsSavingTable />
    </div>
  );
};

export default GestaoGanhos;
