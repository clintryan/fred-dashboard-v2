import { useEffect, useState } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StickyNav } from '@/components/StickyNav'
import { KpiCards } from '@/components/KpiCards'
import { DailyFocus } from '@/components/DailyFocus'
import { Kanban } from '@/components/Kanban'
import { Calendar } from '@/components/Calendar'
import { Personal } from '@/components/Personal'
import { SocialQueue } from '@/components/SocialQueue'
import { ActiveAgents } from '@/components/ActiveAgents'
import { Roadmap } from '@/components/Roadmap'
import { FridayFixLog } from '@/components/FridayFixLog'
import { BuildLog } from '@/components/BuildLog'
import { QuickLinks } from '@/components/QuickLinks'

const PERSONAS = ['All', 'FluentRx', 'CoderClint', 'ClintTeacher', 'Trader']

export default function App() {
  const [persona, setPersona] = useState('All')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/'
    fetch(`${base}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">Failed to load data: {error}</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <StickyNav persona={persona} onPersonaChange={setPersona} personas={PERSONAS} owner={data.meta.owner} />

        <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <KpiCards kpis={data.kpis} persona={persona} />
            </div>
            <div>
              <DailyFocus focus={data.personal.dailyFocus || data.meta.dailyFocus} priorities={data.todaysPriorities} persona={persona} />
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <Kanban kanban={data.kanban} persona={persona} />
            </div>
            <div className="xl:col-span-2">
              <Calendar embedUrl={data.meta.calendarEmbedUrl} timezone={data.meta.timezone} />
            </div>
          </section>

          <section>
            <Personal personal={data.personal} persona={persona} />
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SocialQueue queue={data.socialQueue} persona={persona} />
            </div>
            <div>
              <ActiveAgents agents={data.activeAgents} persona={persona} />
            </div>
          </section>

          <section>
            <QuickLinks links={data.quickLinks} />
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Roadmap items={data.roadmap} persona={persona} />
            <FridayFixLog items={data.fridayFixLog} persona={persona} />
          </section>

          <section>
            <BuildLog entries={data.buildLog} persona={persona} />
          </section>

          <footer className="pb-10 pt-4 text-center text-xs text-muted-foreground">
            Last updated {data.meta.lastUpdated} · Edit <code className="rounded bg-muted px-1 py-0.5">public/data.json</code> to update
          </footer>
        </main>
      </div>
    </TooltipProvider>
  )
}
