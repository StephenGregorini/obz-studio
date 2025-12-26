import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Indicator } from '@/data/indicator-data';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface IndicatorTreeProps {
  indicator: Indicator;
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <ArrowUp className="h-5 w-5 text-green-500" />;
  if (trend === 'down') return <ArrowDown className="h-5 w-5 text-red-500" />;
  return <Minus className="h-5 w-5 text-gray-500" />;
};

const IndicatorCard: React.FC<{ indicator: Indicator }> = ({ indicator }) => {
  return (
    <Card className="shadow-sm mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{indicator.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div>
            <p className="font-semibold text-muted-foreground">Meta OBZ</p>
            <p>{indicator.meta}</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Real</p>
            <p>{indicator.real}</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Desvio</p>
            <p>{indicator.desvio}</p>
          </div>
          <div className="flex items-center">
            <p className="font-semibold text-muted-foreground mr-2">Tendência</p>
            <TrendIcon trend={indicator.tendencia} />
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Responsável</p>
            <p>{indicator.responsavel}</p>
          </div>
        </div>
        {indicator.children && (
          <div className="mt-4 pl-6 border-l-2 border-primary/20">
            {indicator.children.map((child) => (
              <IndicatorCard key={child.name} indicator={child} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const IndicatorTree: React.FC<IndicatorTreeProps> = ({ indicator }) => {
  return <IndicatorCard indicator={indicator} />;
};

export default IndicatorTree;
