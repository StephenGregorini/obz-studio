import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ritualsData, type Ritual } from '@/data/rituals-data';
import { Badge } from '@/components/ui/badge';

const RitualsAgenda: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {ritualsData.map((ritual: Ritual) => (
        <Card key={ritual.id} className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {ritual.nome}
              <Badge>{ritual.frequencia}</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Próxima Data: {ritual.proximaData}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Indicadores por Ritual:</h3>
              <ul className="list-disc pl-5 text-sm">
                {ritual.indicadoresChave.map((indicator, index) => (
                  <li key={index}>{indicator}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Decisões Registradas:</h3>
              <ul className="list-disc pl-5 text-sm">
                {ritual.decisoesRegistradas.map((decision, index) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Pendências:</h3>
              <ul className="list-disc pl-5 text-sm">
                {ritual.pendencias.map((pendency, index) => (
                  <li key={index}>
                    {pendency.descricao} (Responsável: {pendency.responsavel})
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RitualsAgenda;
