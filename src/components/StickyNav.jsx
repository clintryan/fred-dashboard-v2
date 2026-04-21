import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem('theme') || 'dark'
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

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

        <div className="flex items-center gap-2">
          <Tabs value={persona} onValueChange={onPersonaChange}>
            <TabsList className="h-9">
              {personas.map((p) => (
                <TabsTrigger key={p} value={p} className="text-xs sm:text-sm">
                  {p}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
