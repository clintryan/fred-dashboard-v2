import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

// GitHub-style grid: 52 weeks × 7 days. Most recent column = current week.
// Rows = days of week (Sun=0 .. Sat=6). Columns = consecutive weeks.
function buildGrid(entries, endDate, weeks = 52) {
  const map = new Map(entries.map((e) => [e.date, e]))
  const end = new Date(endDate + 'T00:00:00Z')
  // Align end to the Saturday of its week so final column is fully displayed.
  const endDay = end.getUTCDay() // 0..6, Sun..Sat
  const daysUntilSat = 6 - endDay
  const gridEnd = new Date(end)
  gridEnd.setUTCDate(gridEnd.getUTCDate() + daysUntilSat)

  const totalDays = weeks * 7
  const start = new Date(gridEnd)
  start.setUTCDate(start.getUTCDate() - (totalDays - 1))

  const cols = []
  for (let w = 0; w < weeks; w++) {
    const col = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(start)
      day.setUTCDate(day.getUTCDate() + w * 7 + d)
      const iso = day.toISOString().slice(0, 10)
      const entry = map.get(iso)
      const isFuture = day > end
      col.push({ date: iso, entry, isFuture })
    }
    cols.push(col)
  }
  return cols
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function ContributionGrid({
  entries,
  endDate,
  weeks = 52,
  getLevel,
  getColor,
  getTooltip,
  legend,
  ariaLabel,
}) {
  const cols = buildGrid(entries, endDate, weeks)

  // Month label row: show a label when this column's first (top) cell falls in
  // a month not yet shown, and there's space before the next label.
  const monthLabels = []
  let lastMonth = -1
  cols.forEach((col, i) => {
    const topDate = new Date(col[0].date + 'T00:00:00Z')
    const m = topDate.getUTCMonth()
    if (m !== lastMonth) {
      monthLabels.push({ index: i, label: MONTH_LABELS[m] })
      lastMonth = m
    }
  })

  return (
    <div className="space-y-2" aria-label={ariaLabel}>
      <div className="overflow-x-auto scrollbar-thin">
        <div className="inline-block min-w-full">
          <div className="relative ml-6 grid grid-flow-col gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 10px)' }}>
            {cols.map((col, i) =>
              col.map((cell, d) => {
                if (cell.isFuture) {
                  return <div key={`${i}-${d}`} className="h-[10px] w-[10px]" />
                }
                const level = getLevel(cell.entry)
                const color = getColor(level, !!cell.entry)
                const tip = getTooltip(cell)
                return (
                  <Tooltip key={`${i}-${d}`}>
                    <TooltipTrigger asChild>
                      <div
                        className={`h-[10px] w-[10px] rounded-[2px] ${color}`}
                        role="gridcell"
                        aria-label={tip}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-[11px]">
                      {tip}
                    </TooltipContent>
                  </Tooltip>
                )
              })
            )}
          </div>
          <div className="relative ml-6 mt-1 h-3 text-[10px] text-muted-foreground">
            {monthLabels.map((m) => (
              <span
                key={m.index}
                className="absolute"
                style={{ left: `${m.index * 13}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      {legend && (
        <div className="flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
          <span>Less</span>
          {legend.map((cls, i) => (
            <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  )
}
