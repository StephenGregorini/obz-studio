import React from 'react';
import StatCard from '@/components/StatCard';
import { DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MonthlyTrendChart from '@/components/dashboard/MonthlyTrendChart';
import WaterfallChart from '@/components/dashboard/WaterfallChart';

const CockpitExecutivo: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cockpit Executivo OBZ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Gasto Total Real x Planejado"
          value="R$ 1.2M / R$ 1.1M"
          change="+9.1% vs Planejado"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="Saving Planejado"
          value="R$ 150k"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Saving Capturado (DRE)"
          value="R$ 95k"
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <StatCard
          title="Gap de Captura"
          value="R$ 55k"
          icon={<Minus className="h-5 w-5" />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonthlyTrendChart />
        </div>
        <div>
          <WaterfallChart />
        </div>
      </div>
    </div>
  );
};

export default CockpitExecutivo;
