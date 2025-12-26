import React from 'react';
import PhasingChart from '@/components/dashboard/PhasingChart';
import DREImpactWaterfallChart from '@/components/dashboard/DREImpactWaterfallChart';

const PhasingGanho: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Phasing do Ganho e Impacto no DRE</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PhasingChart />
        <DREImpactWaterfallChart />
      </div>
    </div>
  );
};

export default PhasingGanho;
