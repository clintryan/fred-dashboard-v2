import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function StickyNav({ persona, onPersonaChange, personas, owner }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-bold">
            F
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-tight">Fred Dashboard</span>
            <span className="text-xs text-muted-foreground leading-tight">{owner}</span>
          </div>
        </div>

        <Tabs value={persona} onValueChange={onPersonaChange}>
          <TabsList className="h-9">
            {personas.map((p) => (
              <TabsTrigger key={p} value={p} className="text-xs sm:text-sm">
                {p}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  )
}
