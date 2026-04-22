import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target } from 'lucide-react'

const PERSONA_COLORS = {
  fluentrx: 'bg-violet-500/15 text-violet-400',
  clintteacher: 'bg-sky-500/15 text-sky-400',
  coderclint: 'bg-emerald-500/15 text-emerald-400',
  trader: 'bg-amber-500/15 text-amber-400',
  all: 'bg-muted text-muted-foreground',
}

export function DailyFocus({ focus, priorities, persona }) {
  const filtered = priorities
    ? priorities.filter((p) => {
        if (!persona || persona === 'All') return true
        return p.persona === persona.toLowerCase() || p.persona === 'all'
      })
    : null

  return (
    <Card className="h-full border-foreground/20 bg-gradient-to-br from-card to-muted/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Target className="h-3.5 w-3.5" />
          Today's priorities
        </div>
      </CardHeader>
      <CardContent>
        {filtered && filtered.length > 0 ? (
          <ol className="space-y-3">
            {filtered.map((p) => (
              <li key={p.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                  {p.id}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium leading-snug">{p.label}</span>
                    {p.persona && p.persona !== 'all' && (
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${PERSONA_COLORS[p.persona] || PERSONA_COLORS.all}`}>
                        {p.persona}
                      </span>
                    )}
                  </div>
                  {p.detail && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <CardTitle className="text-2xl font-semibold leading-tight tracking-tight">
            {focus || "Set today's focus in data.json"}
          </CardTitle>
        )}
      </CardContent>
    </Card>
  )
}
