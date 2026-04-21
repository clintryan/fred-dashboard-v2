import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export function Calendar({ embedUrl, timezone = 'Asia/Bangkok' }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle>Calendar</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{timezone}</p>
        </div>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Open <ExternalLink className="h-3 w-3" />
        </a>
      </CardHeader>
      <CardContent className="p-0">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Google Calendar"
            className="block h-[520px] w-full border-0 bg-white"
            frameBorder="0"
            scrolling="no"
          />
        ) : (
          <div className="flex h-[520px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1 py-0.5">meta.calendarEmbedUrl</code> in{' '}
            <code className="rounded bg-muted px-1 py-0.5">public/data.json</code> to embed your
            Google Calendar.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
