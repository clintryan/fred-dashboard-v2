// Phase 2 TODO: ingest sleep from Apple Shortcuts → JSON export → data.json.
// For now, Fred manually edits public/data.json each morning.
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ContributionGrid } from './ContributionGrid'
import { SleepBars } from './SleepBars'
import { Moon, Wine, Dumbbell, Droplets, Flame } from 'lucide-react'

function currentStreak(entries) {
  // Walk backwards from the most recent entry while drinks === 0.
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date))
  let streak = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].drinks === 0) streak++
    else break
  }
  return streak
}

function avg(arr, key) {
  if (!arr.length) return 0
  return arr.reduce((s, x) => s + x[key], 0) / arr.length
}

const MONO_LEGEND = [
  'bg-muted',
  'bg-foreground/20',
  'bg-foreground/40',
  'bg-foreground/65',
  'bg-foreground/90',
]

export function Personal({ personal, persona }) {
  if (persona !== 'All' && persona !== 'Personal') {
    return null
  }

  const endDate = personal.sleep[personal.sleep.length - 1]?.date || new Date().toISOString().slice(0, 10)
  const streak = currentStreak(personal.alcohol)
  const avgSleep = avg(personal.sleep.slice(-7), 'hours')
  const avgHydration = avg(personal.hydration.slice(-7), 'litres')
  const last7Fitness = personal.fitness.slice(-7).filter((f) => f.active).length

  return (
    <Card>
      <CardHeader className="flex flex-col gap-1 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Personal</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">Health &amp; lifestyle tracking</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <Badge variant="success" className="gap-1"><Flame className="h-3 w-3" />{streak}-day alcohol-free</Badge>
          <Badge variant="outline" className="gap-1"><Moon className="h-3 w-3" />{avgSleep.toFixed(1)}h avg sleep</Badge>
          <Badge variant="outline" className="gap-1"><Droplets className="h-3 w-3" />{avgHydration.toFixed(1)}L avg water</Badge>
          <Badge variant="outline" className="gap-1"><Dumbbell className="h-3 w-3" />{last7Fitness}/7 active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alcohol contribution grid */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Wine className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Alcohol-free days</span>
            <span className="ml-auto text-xs text-muted-foreground">
              Green = sober · Amber = moderate · Red = heavy
            </span>
          </div>
          <ContributionGrid
            entries={personal.alcohol}
            endDate={endDate}
            ariaLabel="Alcohol-free days"
            getLevel={(e) => {
              if (!e) return 0
              if (e.drinks === 0) return 'sober'
              if (e.drinks <= 2) return 'moderate'
              return 'heavy'
            }}
            getColor={(level, hasEntry) => {
              if (!hasEntry) return 'bg-muted/40'
              if (level === 'sober') return 'bg-emerald-500/70'
              if (level === 'moderate') return 'bg-amber-500/70'
              if (level === 'heavy') return 'bg-rose-500/70'
              return 'bg-muted'
            }}
            getTooltip={(cell) => {
              if (!cell.entry) return `${cell.date} · no entry`
              if (cell.entry.drinks === 0) return `${cell.date} · sober`
              return `${cell.date} · ${cell.entry.drinks} drink${cell.entry.drinks === 1 ? '' : 's'}`
            }}
            legend={['bg-emerald-500/25', 'bg-emerald-500/50', 'bg-emerald-500/70', 'bg-emerald-500/90']}
          />
        </div>

        <Separator />

        {/* Sleep bars */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sleep — last 7 days</span>
            </div>
            <SleepBars sleep={personal.sleep} days={7} />
          </div>

          {/* Fitness grid */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Fitness</span>
            </div>
            <ContributionGrid
              entries={personal.fitness}
              endDate={endDate}
              ariaLabel="Fitness days"
              getLevel={(e) => (!e ? 0 : e.active ? (e.type === 'gym' ? 4 : 2) : 0)}
              getColor={(level, hasEntry) => {
                if (!hasEntry) return 'bg-muted/40'
                if (level === 0) return 'bg-muted'
                return MONO_LEGEND[Math.min(level, 4)]
              }}
              getTooltip={(cell) => {
                if (!cell.entry) return `${cell.date} · no entry`
                return `${cell.date} · ${cell.entry.type}`
              }}
              legend={MONO_LEGEND}
            />
          </div>
        </div>

        <Separator />

        {/* Hydration sparkline-style summary */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Hydration — last 30 days</span>
            <span className="ml-auto text-xs text-muted-foreground">Target: 2.5L/day</span>
          </div>
          <div className="flex h-16 items-end gap-[3px]">
            {personal.hydration.slice(-30).map((h) => {
              const pct = Math.min(100, (h.litres / 3.5) * 100)
              const tone = h.litres >= 2.5 ? 'bg-emerald-500/60' : h.litres >= 2.0 ? 'bg-foreground/40' : 'bg-amber-500/60'
              return (
                <div key={h.date} className="flex flex-1 items-end" title={`${h.date} · ${h.litres}L`}>
                  <div className={`w-full rounded-sm ${tone}`} style={{ height: `${pct}%` }} />
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
