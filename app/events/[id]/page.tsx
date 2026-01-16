import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { mockEvents, formatPrice } from "@/lib/mock-data"
import { AlertTriangle, Heart, Calendar, Target, ArrowLeft, HandHeart, Sparkles, CheckCircle2 } from "lucide-react"

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    notFound()
  }

  const progress = (event.raised / event.target) * 100
  const startDate = new Date(event.startDate).toLocaleDateString("en-US", { dateStyle: "medium" })
  const endDate = new Date(event.endDate).toLocaleDateString("en-US", { dateStyle: "medium" })

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-muted">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container">
            <Badge
              variant="secondary"
              className={event.type === "disaster" ? "bg-red-100 text-red-800 mb-3" : "bg-blue-100 text-blue-800 mb-3"}
            >
              {event.type === "disaster" ? (
                <>
                  <AlertTriangle className="h-3 w-3 mr-1" /> Disaster Relief
                </>
              ) : (
                <>
                  <Heart className="h-3 w-3 mr-1" /> Charity Campaign
                </>
              )}
            </Badge>
            {event.distributed && (
              <Badge className="bg-green-600 text-white ml-2">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
              </Badge>
            )}
            <h1 className="text-2xl md:text-4xl font-bold">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/donate">Donate</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{event.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          href="/donate"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Donation Hub
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>

            {/* Needs */}
            <Card>
              <CardHeader>
                <CardTitle>What We Need</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.needs.map((need) => (
                    <Badge key={need} variant="secondary" className="text-sm py-1.5">
                      {need}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTAs */}
            {!event.distributed && (
              <Card>
                <CardHeader>
                  <CardTitle>How You Can Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-dowear/10 flex items-center justify-center">
                          <HandHeart className="h-5 w-5 text-dowear" />
                        </div>
                        <div>
                          <p className="font-semibold">DoWear</p>
                          <p className="text-xs text-muted-foreground">Donate clothes directly</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Send physical clothing items that match the needs above.
                      </p>
                      <Link href="/sell">
                        <Button className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground">
                          Donate Clothes
                        </Button>
                      </Link>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-dowear-plus/10 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-dowear-plus-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">DoWear+ Fund</p>
                          <p className="text-xs text-muted-foreground">Contribute via fund</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Donate items to be sold. Proceeds support this campaign.
                      </p>
                      <Link href="/sell">
                        <Button className="w-full bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground">
                          Donate to Fund
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold">{formatPrice(event.raised)}</span>
                      <span className="text-muted-foreground">of {formatPrice(event.target)}</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% funded</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-medium">
                          {startDate} - {endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="text-sm font-medium">{formatPrice(event.target)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            {event.distributed && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-green-800">Distribution Complete</span>
                  </div>
                  <p className="text-sm text-green-700">
                    This campaign has been successfully completed. Thank you to all donors who contributed!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Share */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-3">Share this campaign</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
