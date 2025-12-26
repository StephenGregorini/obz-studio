import React from 'react';
import IndicatorTree from '@/components/dashboard/IndicatorTree';
import { indicatorData } from '@/data/indicator-data';

const EstruturaIndicadores: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Estrutura de Indicadores OBZ</h1>
      <IndicatorTree indicator={indicatorData} />
    </div>
  );
};

export default EstruturaIndicadores;
