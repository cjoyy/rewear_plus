"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/event-card"
import { DonationFundWidget } from "@/components/donation-fund-widget"
import { mockEvents, mockDonationFund, mockImpactLogs, formatPrice } from "@/lib/mock-data"
import { Sparkles, HandHeart, ArrowRight, TrendingUp } from "lucide-react"

export default function DonatePage() {
  const activeEvents = mockEvents.filter((e) => !e.distributed)
  const completedEvents = mockEvents.filter((e) => e.distributed)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary/5 border-b">
        <div className="container px-4 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Donation Hub</h1>
            <p className="text-lg text-muted-foreground">
              Make a real impact. Donate clothes directly to those in need or contribute to our community fund through
              DoWear+.
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donation Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-dowear/30 hover:border-dowear transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-dowear/10 flex items-center justify-center mb-2">
                    <HandHeart className="h-6 w-6 text-dowear" />
                  </div>
                  <CardTitle>DoWear</CardTitle>
                  <CardDescription>Donate physical clothes directly to those in need</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li>• Items go directly to beneficiaries</li>
                    <li>• You pay for shipping</li>
                    <li>• Track your donation journey</li>
                  </ul>
                  <Link href="/sell">
                    <Button className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground">
                      Donate Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-dowear-plus/30 hover:border-dowear-plus transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-dowear-plus/10 flex items-center justify-center mb-2">
                    <Sparkles className="h-6 w-6 text-dowear-plus-foreground" />
                  </div>
                  <CardTitle>DoWear+</CardTitle>
                  <CardDescription>Donate clothes to be sold, proceeds go to fund</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li>• Platform sells your items</li>
                    <li>• 100% goes to Donation Fund</li>
                    <li>• Supports charity events</li>
                  </ul>
                  <Link href="/sell">
                    <Button className="w-full bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground">
                      Donate to Sell
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Active Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Active Events</h2>
                <span className="text-sm text-muted-foreground">{activeEvents.length} events</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Completed Events */}
            {completedEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Completed Events</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {completedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fund Dashboard */}
            <DonationFundWidget fund={mockDonationFund} />

            {/* Impact Log */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Impact Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockImpactLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                        <div className="w-px h-full bg-border" />
                      </div>
                      <div className="pb-4">
                        <p className="text-xs text-muted-foreground">
                          {new Date(log.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                        <p className="text-sm font-medium">{log.title}</p>
                        <p className="text-xs text-muted-foreground">{log.description}</p>
                        {log.amount && (
                          <p className="text-xs text-primary mt-1">Fund used: {formatPrice(log.amount)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-primary">1,250+</p>
                    <p className="text-xs text-muted-foreground">Items Donated</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-primary">3,400+</p>
                    <p className="text-xs text-muted-foreground">People Helped</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
