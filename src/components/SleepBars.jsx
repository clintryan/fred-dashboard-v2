import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export function SleepBars({ sleep, days = 7 }) {
  const recent = sleep.slice(-days)
  const max = 10 // hours axis ceiling

  return (
    <div className="flex h-32 items-end gap-2">
      {recent.map((entry) => {
        const heightPct = Math.min(100, (entry.hours / max) * 100)
        const qualityTone =
          entry.quality >= 85
            ? 'bg-emerald-500/70'
            : entry.quality >= 70
            ? 'bg-foreground/50'
            : 'bg-amber-500/60'
        const label = new Date(entry.date + 'T00:00:00Z').toLocaleDateString('en-US', {
          weekday: 'short',
          timeZone: 'UTC',
        })
        return (
          <div key={entry.date} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="relative flex h-full w-full items-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-full rounded-t-sm transition-all ${qualityTone}`}
                    style={{ height: `${heightPct}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[11px]">
                  <div className="font-medium">{entry.date}</div>
                  <div>{entry.hours}h · quality {entry.quality}</div>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
