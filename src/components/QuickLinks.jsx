import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Link as LinkIcon } from 'lucide-react'

export function QuickLinks({ links }) {
  const grouped = links.reduce((acc, l) => {
    const k = l.group || 'Links'
    acc[k] = acc[k] || []
    acc[k].push(l)
    return acc
  }, {})

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" /> Quick Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="space-y-1.5">
              <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {group}
              </div>
              <div className="flex flex-col gap-1">
                {items.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm transition-colors hover:border-border hover:bg-muted/30"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
