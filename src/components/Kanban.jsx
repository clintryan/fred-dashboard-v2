import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { filterByPersona } from '@/lib/filter'

const COLUMNS = [
  { key: 'todo', label: 'Must', description: 'Do now', tone: 'border-rose-500/40' },
  { key: 'doing', label: 'Should', description: 'In progress', tone: 'border-amber-500/40' },
  { key: 'done', label: 'Done', description: 'Shipped', tone: 'border-emerald-500/40' },
  { key: 'wont', label: "Won't", description: 'Deferred', tone: 'border-muted-foreground/30' },
]

function Task({ task }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-3 transition-colors hover:border-border hover:bg-muted/30">
      <div className="text-sm leading-snug">{task.title}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="text-[10px]">{task.persona}</Badge>
        {task.tags?.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
        ))}
      </div>
    </div>
  )
}

export function Kanban({ kanban, persona }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>MoSCoW Board</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Must · Should · Done · Won't</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => {
            const items = filterByPersona(kanban[col.key] || [], persona)
            return (
              <div key={col.key} className={`rounded-md border-t-2 ${col.tone} bg-muted/20 p-3`}>
                <div className="mb-3 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{col.label}</span>
                    <span className="text-xs text-muted-foreground">{col.description}</span>
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.length === 0 ? (
                    <div className="rounded border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground">
                      Empty
                    </div>
                  ) : (
                    items.map((task) => <Task key={task.id} task={task} />)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
