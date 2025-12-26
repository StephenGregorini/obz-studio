import React from 'react';
import ContractList from '@/components/dashboard/ContractList';

const GestaoContratos: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestão de Contratos Hospitalares</h1>
      <ContractList />
    </div>
  );
};

export default GestaoContratos;
