import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Jan', real: 4000, planejado: 4200 },
  { name: 'Fev', real: 3000, planejado: 3200 },
  { name: 'Mar', real: 5000, planejado: 4800 },
  { name: 'Abr', real: 4500, planejado: 4600 },
  { name: 'Mai', real: 6200, planejado: 6000 },
  { name: 'Jun', real: 5800, planejado: 5900 },
];

const MonthlyTrendChart: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Gasto Mensal: Real vs. Planejado</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="real" stroke="hsl(var(--primary))" name="Gasto Real" />
            <Line type="monotone" dataKey="planejado" stroke="hsl(var(--muted-foreground))" name="Gasto Planejado" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendChart;
