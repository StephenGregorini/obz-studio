import React from 'react';
import PvmTable from '@/components/dashboard/PvmTable';
import PvmChart from '@/components/dashboard/PvmChart';

const AnaliseDesvio: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Análise de Desvio Preço x Volume</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PvmTable />
        <PvmChart />
      </div>
    </div>
  );
};

export default AnaliseDesvio;
