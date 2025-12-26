import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { contractData } from "@/data/contract-data";
import { AlertCircle, Filter } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const ContractList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterConta, setFilterConta] = useState("");
  const [filterFornecedor, setFilterFornecedor] = useState("");
  const [filterUnidade, setFilterUnidade] = useState("");

  const filteredContracts = contractData.filter((contract) => {
    const matchesSearch =
      contract.conta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.unidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesConta = filterConta ? contract.conta === filterConta : true;
    const matchesFornecedor = filterFornecedor ? contract.fornecedor === filterFornecedor : true;
    const matchesUnidade = filterUnidade ? contract.unidade === filterUnidade : true;

    return matchesSearch && matchesConta && matchesFornecedor && matchesUnidade;
  });

  const uniqueContas = Array.from(new Set(contractData.map((c) => c.conta)));
  const uniqueFornecedores = Array.from(new Set(contractData.map((c) => c.fornecedor)));
  const uniqueUnidades = Array.from(new Set(contractData.map((c) => c.unidade)));


  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Gestão de Contratos</CardTitle>
        <CardDescription>Filtros inteligentes e alertas de vigência</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-secondary/40 p-3">
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
            <Filter className="h-4 w-4" />
            Filtros
          </div>
          <Input
            placeholder="Buscar por conta, fornecedor, unidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 max-w-sm rounded-full bg-card"
          />
          <select
            value={filterConta}
            onChange={(e) => setFilterConta(e.target.value)}
            className="h-10 rounded-full border bg-card px-4 text-sm text-foreground"
          >
            <option value="">Todas as Contas</option>
            {uniqueContas.map((conta) => (
              <option key={conta} value={conta}>
                {conta}
              </option>
            ))}
          </select>
          <select
            value={filterFornecedor}
            onChange={(e) => setFilterFornecedor(e.target.value)}
            className="h-10 rounded-full border bg-card px-4 text-sm text-foreground"
          >
            <option value="">Todos os Fornecedores</option>
            {uniqueFornecedores.map((forn) => (
              <option key={forn} value={forn}>
                {forn}
              </option>
            ))}
          </select>
          <select
            value={filterUnidade}
            onChange={(e) => setFilterUnidade(e.target.value)}
            className="h-10 rounded-full border bg-card px-4 text-sm text-foreground"
          >
            <option value="">Todas as Unidades</option>
            {uniqueUnidades.map((unid) => (
              <option key={unid} value={unid}>
                {unid}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 rounded-2xl border bg-card/80 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Alertas</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {contractData.filter(c => c.alertaVencimento).map(c => (
              <Badge key={c.id + "-venc"} variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> Contrato {c.id} ({c.fornecedor}) vencendo!
              </Badge>
            ))}
            {contractData.filter(c => c.alertaConsumo).map(c => (
              <Badge key={c.id + "-cons"} variant="warning" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> Contrato {c.id} ({c.fornecedor}) consumo acima do contratado!
              </Badge>
            ))}
            {contractData.filter(c => c.sla === 'Não Atendido').map(c => (
              <Badge key={c.id + "-sla"} variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> Contrato {c.id} ({c.fornecedor}) SLA Não Atendido!
              </Badge>
            ))}
            {contractData.filter(c => !c.alertaVencimento && !c.alertaConsumo && c.sla === 'Atendido').length === contractData.length && (
              <Badge variant="success">
                Nenhum alerta ativo.
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card/80">
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conta</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Vigência</TableHead>
              <TableHead className="text-right">V. Contratado</TableHead>
              <TableHead className="text-right">V. Executado</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead className="text-right">Desvio Fin.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.conta}</TableCell>
                <TableCell>{contract.fornecedor}</TableCell>
                <TableCell>{contract.unidade}</TableCell>
                <TableCell>{contract.vigenciaInicio} a {contract.vigenciaFim}</TableCell>
                <TableCell className="text-right">{formatCurrency(contract.valorContratado)}</TableCell>
                <TableCell className="text-right">{formatCurrency(contract.valorExecutado)}</TableCell>
                <TableCell>
                  <Badge variant={contract.sla === 'Atendido' ? 'success' : 'destructive'}>
                    {contract.sla}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(contract.desvioFinanceiro)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractList;
