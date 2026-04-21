import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target } from 'lucide-react'

export function DailyFocus({ focus }) {
  return (
    <Card className="h-full border-foreground/20 bg-gradient-to-br from-card to-muted/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Target className="h-3.5 w-3.5" />
          The ONE thing today
        </div>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-4rem)] items-center">
        <CardTitle className="text-2xl font-semibold leading-tight tracking-tight">
          {focus || 'Set today\'s focus in data.json'}
        </CardTitle>
      </CardContent>
    </Card>
  )
}
