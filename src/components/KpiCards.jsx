import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

function DeltaIcon({ tone }) {
  if (tone === 'positive') return <ArrowUpRight className="h-3 w-3" />
  if (tone === 'negative') return <ArrowDownRight className="h-3 w-3" />
  return <Minus className="h-3 w-3" />
}

export function KpiCards({ kpis, persona }) {
  const visible = filterByPersona(kpis, persona).slice(0, 4)

  if (!visible.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No KPIs for {persona}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visible.map((kpi) => (
        <Card key={kpi.id} className="overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {kpi.label}
            </CardTitle>
            <Badge variant="outline" className="gap-1 text-[10px]">
              <DeltaIcon tone={kpi.deltaTone} />
              {kpi.delta}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-semibold tracking-tight">{kpi.value}</div>
            <Progress value={kpi.progress} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{kpi.target}</span>
              <span className="tabular-nums">{kpi.progress}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
