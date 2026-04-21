import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'
import { ChevronRight } from 'lucide-react'

function statusVariant(status) {
  if (status === 'published') return 'success'
  if (status === 'queued') return 'warning'
  return 'secondary'
}

function SocialDraft({ item }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <button
      onClick={() => setExpanded((v) => !v)}
      className="w-full rounded-md border border-border/60 bg-background/40 p-3 text-left transition-colors hover:border-border hover:bg-muted/30"
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="text-[10px]">{item.platform}</Badge>
        <Badge variant="outline" className="text-[10px]">{item.persona}</Badge>
        <Badge variant={statusVariant(item.status)} className="text-[10px]">{item.status}</Badge>
        {item.scheduled && (
          <span className="text-[10px] text-muted-foreground">→ {item.scheduled}</span>
        )}
        <ChevronRight
          className={`ml-auto h-3 w-3 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </div>
      <p className={`text-sm leading-snug ${expanded ? '' : 'line-clamp-2'}`}>{item.draft}</p>
    </button>
  )
}

export function SocialQueue({ queue, persona }) {
  const items = filterByPersona(queue, persona)
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Social Queue</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Click a draft to expand</p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.length === 0 ? (
          <div className="rounded border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
            No drafts for {persona}
          </div>
        ) : (
          items.map((item) => <SocialDraft key={item.id} item={item} />)
        )}
      </CardContent>
    </Card>
  )
}
