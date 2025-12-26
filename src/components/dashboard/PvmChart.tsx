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
  Line,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pvmData } from '@/data/pvm-data';

const PvmChart: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Análise de Efeitos (Preço, Volume, Mix) e Impacto Total</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pvmData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="conta" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="efeitoPreco" stackId="a" fill="hsl(var(--primary))" name="Efeito Preço" />
            <Bar dataKey="efeitoVolume" stackId="a" fill="hsl(var(--secondary))" name="Efeito Volume" />
            <Bar dataKey="efeitoMix" stackId="a" fill="hsl(var(--destructive))" name="Efeito Mix" />
            <Line type="monotone" dataKey="impactoTotal" stroke="hsl(var(--foreground))" name="Impacto Total" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PvmChart;
