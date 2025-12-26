import React from 'react';
import ActionPlanTable from '@/components/dashboard/ActionPlanTable';

const PlanoAcao: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Plano de Ação Estruturado</h1>
      <ActionPlanTable />
    </div>
  );
};

export default PlanoAcao;
