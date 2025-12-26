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
import { phasingData } from '@/data/phasing-data';

const PhasingChart: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Phasing do Ganho Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={phasingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="planejado" stroke="hsl(var(--primary))" name="Planejado" />
            <Line type="monotone" dataKey="implantado" stroke="hsl(var(--secondary))" name="Implantado" />
            <Line type="monotone" dataKey="capturado" stroke="hsl(var(--destructive))" name="Capturado" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PhasingChart;
