import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Data needs to be structured for a waterfall chart
// 'range' is the floating part of the bar, 'value' is the total height
const data = [
    { name: 'Custo Base', value: 2200 },
    { name: 'Reduções', value: 1800, range: [1800, 2200] },
    { name: 'Aumentos Evitados', value: 1950, range: [1800, 1950]},
    { name: 'Resultado Líquido', value: 1950 },
];

const WaterfallChart: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Resultado OBZ no DRE</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                if (props.payload.range) {
                    return `${props.payload.range[0]} -> ${props.payload.range[1]}`;
                }
                return value;
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--primary))" name="Valor" />
            {/* This is a simplified waterfall. A true one would need more complex logic. */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WaterfallChart;
