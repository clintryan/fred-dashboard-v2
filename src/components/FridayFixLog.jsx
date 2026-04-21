import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'
import { Wrench } from 'lucide-react'

export function FridayFixLog({ items, persona }) {
  const filtered = filterByPersona(items, persona)
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-4 w-4" /> Friday Fix Log
        </CardTitle>
        <p className="text-xs text-muted-foreground">Papercuts fixed week-by-week</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
            No fixes for {persona}
          </div>
        ) : (
          filtered.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-md border border-border/60 bg-background/40 p-3">
              <Badge variant="outline" className="shrink-0 text-[10px]">{f.date}</Badge>
              <div className="min-w-0 flex-1">
                <div className="text-sm leading-snug">{f.fix}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{f.persona}</div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
