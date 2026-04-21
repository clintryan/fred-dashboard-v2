import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'
import { Milestone } from 'lucide-react'

function statusVariant(status) {
  if (status === 'shipped') return 'success'
  if (status === 'at-risk') return 'danger'
  if (status === 'on-track') return 'outline'
  return 'secondary'
}

export function Roadmap({ items, persona }) {
  const filtered = filterByPersona(items, persona)
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Milestone className="h-4 w-4" /> Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
            No milestones for {persona}
          </div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="flex flex-col gap-1 rounded-md border border-border/60 bg-background/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{m.milestone}</span>
                <Badge variant={statusVariant(m.status)} className="text-[10px]">{m.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{m.persona} · due {m.due}</span>
              </div>
              {m.notes && <p className="text-xs text-muted-foreground">{m.notes}</p>}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
