import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'
import { Bot } from 'lucide-react'

function statusTone(status) {
  if (status === 'running') return 'success'
  if (status === 'draft') return 'warning'
  return 'outline'
}

function formatLastRun(ts) {
  if (!ts) return 'never'
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return ts
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function ActiveAgents({ agents, persona }) {
  const items = filterByPersona(agents, persona)
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-4 w-4" /> Active Agents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.length === 0 ? (
          <div className="rounded border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
            No agents for {persona}
          </div>
        ) : (
          items.map((a) => (
            <div key={a.id} className="rounded-md border border-border/60 bg-background/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-medium">{a.name}</code>
                  <Badge variant={statusTone(a.status)} className="text-[10px]">{a.status}</Badge>
                </div>
                <span className="text-[10px] text-muted-foreground">{a.persona}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Last run: {formatLastRun(a.lastRun)}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
