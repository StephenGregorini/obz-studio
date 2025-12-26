import React, { useMemo, useState } from "react";
import MonthlyTrendChart from "@/components/dashboard/MonthlyTrendChart";
import WaterfallChart from "@/components/dashboard/WaterfallChart";
import KpiCard from "@/components/cockpit/KpiCard";
import DetailDrawer from "@/components/ui/DetailDrawer";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  agentInsights,
  cockpitKpis,
  cockpitSummary,
  dreWaterfallData,
  monthlyTrendData,
  typicalIndicators,
} from "@/data/cockpit-data";
import { Brain, ShieldAlert } from "lucide-react";

const CockpitExecutivo: React.FC = () => {
  const [detailKey, setDetailKey] = useState<string | null>(null);

  const detailPayload = useMemo(() => {
    if (!detailKey) return null;
    if (detailKey === "monthly-trend") {
      return {
        title: "Gasto Mensal - Real x Planejado",
        subtitle: "Comparativo mensal e projeção de fechamento",
        description:
          "O real acumula R$ 48,2M no semestre, 5,9% acima do OBZ. Maio e junho foram os pontos de maior pressão.",
        table: monthlyTrendData.map((item) => ({
          label: item.name,
          real: `${item.real}M`,
          planejado: `${item.planejado}M`,
          gap: `${(item.real - item.planejado).toFixed(1)}M`,
        })),
      };
    }
    if (detailKey === "dre-waterfall") {
      return {
        title: "Waterfall OBZ no DRE",
        subtitle: "Base x reducoes e incrementos evitados",
        description:
          "O resultado liquido no DRE ficou em R$ 42,3M apos iniciativas de renegociacao e ajustes de volume.",
        table: dreWaterfallData.map((item) => ({
          label: item.name,
          real: `${item.value}M`,
          planejado: "N/A",
          gap: item.value > 0 ? `${item.value}M` : `${item.value}M`,
        })),
      };
    }
    const kpi = cockpitKpis.find((item) => item.id === detailKey);
    if (!kpi) return null;
    return {
      title: kpi.title,
      subtitle: kpi.subtitle,
      description: kpi.details.highlight,
      table: kpi.details.drivers.map((driver) => ({
        label: driver.label,
        real: driver.value,
        planejado: driver.trend,
        gap: driver.trend,
      })),
    };
  }, [detailKey]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {cockpitSummary.cycle}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-foreground">Cockpit Executivo OBZ</h2>
          <p className="text-sm text-muted-foreground">
            Visao integrada de gasto, saving, captura DRE e principais riscos.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
            {cockpitSummary.period}
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-semibold">
            {cockpitSummary.updatedAt}
          </Badge>
          <Badge variant="success" className="rounded-full px-3 py-1 text-xs font-semibold">
            12 iniciativas criticas em andamento
          </Badge>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cockpitKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            subtitle={kpi.subtitle}
            delta={kpi.delta}
            trend={kpi.trend as "up" | "down" | "flat"}
            status={kpi.status as "good" | "warning" | "critical"}
            onClick={() => setDetailKey(kpi.id)}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyTrendChart
            data={monthlyTrendData}
            onOpenDetail={() => setDetailKey("monthly-trend")}
          />
        </div>
        <div>
          <WaterfallChart data={dreWaterfallData} onOpenDetail={() => setDetailKey("dre-waterfall")} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Indicadores tipicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typicalIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {indicator.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{indicator.value}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {indicator.delta}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {agentInsights.map((agent) => (
            <Card key={agent.id} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{agent.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                </div>
                <span className="rounded-full border bg-card p-2 text-muted-foreground">
                  {agent.id === "lider-virtual" ? (
                    <ShieldAlert className="h-4 w-4 text-primary" />
                  ) : (
                    <Brain className="h-4 w-4 text-primary" />
                  )}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Principais sinais
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-foreground">
                    {agent.highlights.map((highlight) => (
                      <li key={highlight} className="rounded-lg border bg-secondary/40 px-3 py-2">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Prioridades sugeridas
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-foreground">
                    {agent.priorities.map((priority) => (
                      <li key={priority} className="rounded-lg border bg-white px-3 py-2 shadow-sm">
                        {priority}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <DetailDrawer
        open={Boolean(detailPayload)}
        title={detailPayload?.title ?? ""}
        subtitle={detailPayload?.subtitle}
        onClose={() => setDetailKey(null)}
        size="lg"
      >
        {detailPayload ? (
          <div className="space-y-6">
            <div className="rounded-2xl border bg-secondary/40 p-4 text-sm text-foreground">
              {detailPayload.description}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detalhe</TableHead>
                  <TableHead>Real</TableHead>
                  <TableHead>Planejado</TableHead>
                  <TableHead>Gap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailPayload.table.map((row) => (
                  <TableRow key={`${detailPayload.title}-${row.label}`}>
                    <TableCell className="font-semibold">{row.label}</TableCell>
                    <TableCell>{row.real}</TableCell>
                    <TableCell>{row.planejado}</TableCell>
                    <TableCell>{row.gap}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </DetailDrawer>
    </div>
  );
};

export default CockpitExecutivo;
