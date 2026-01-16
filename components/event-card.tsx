import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatPrice, type DonationEvent } from "@/lib/mock-data"
import { AlertTriangle, Heart } from "lucide-react"

interface EventCardProps {
  event: DonationEvent
}

export function EventCard({ event }: EventCardProps) {
  const progress = (event.raised / event.target) * 100

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className={event.type === "disaster" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
            >
              {event.type === "disaster" ? (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1" /> Disaster Relief
                </>
              ) : (
                <>
                  <Heart className="h-3 w-3 mr-1" /> Charity
                </>
              )}
            </Badge>
          </div>
          {event.distributed && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-600 text-white">Completed</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1 mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-medium">{formatPrice(event.raised)}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {Math.round(progress)}% of {formatPrice(event.target)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
