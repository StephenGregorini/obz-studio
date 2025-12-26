import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/Badge";
import { actionPlanData, type ActionItem } from "@/data/action-plan-data";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const getStatusBadgeVariant = (status: ActionItem['status']) => {
  switch (status) {
    case 'Concluído':
      return "success"; // bg-green-500
    case "Em Andamento":
      return "secondary";
    case "Atrasado":
      return "destructive"; // bg-red-500
    case "Pendente":
    default:
      return "outline";
  }
};

const ActionPlanTable: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Plano de Ação Estruturado</CardTitle>
        <CardDescription>Macro etapas, responsáveis e impacto estimado</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border bg-card/80">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ação</TableHead>
              <TableHead>Macro Etapa</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Impacto Estimado</TableHead>
              <TableHead>Vínculo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actionPlanData.map((item: ActionItem) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.acao}</TableCell>
                <TableCell>{item.macroEtapa}</TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell>{item.prazo}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(item.impactoEstimado)}</TableCell>
                <TableCell>
                  {item.vinculoIndicador && <Badge variant="outline">{item.vinculoIndicador}</Badge>}
                  {item.vinculoContrato && <Badge variant="outline">{item.vinculoContrato}</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPlanTable;
