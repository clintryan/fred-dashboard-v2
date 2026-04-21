import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { filterByPersona } from '@/lib/filter'
import { ChevronDown, ScrollText } from 'lucide-react'

const PREVIEW_COUNT = 3

export function BuildLog({ entries, persona }) {
  const [open, setOpen] = useState(false)
  const filtered = filterByPersona(entries, persona)
  const visible = open ? filtered : filtered.slice(0, PREVIEW_COUNT)
  const hidden = filtered.length - visible.length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" /> Build Log
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Archive — {filtered.length} entries {persona !== 'All' && `· ${persona}`}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            No build log entries for {persona}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="w-[100px]">Persona</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead className="w-[80px] text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((e, i) => (
                  <TableRow key={`${e.date}-${i}`}>
                    <TableCell className="text-xs text-muted-foreground">{e.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{e.persona}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{e.entry}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success" className="text-[10px]">{e.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length > PREVIEW_COUNT && (
              <button
                onClick={() => setOpen((v) => !v)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
                {open ? 'Show fewer' : `Show all ${filtered.length} entries (${hidden} more)`}
              </button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
