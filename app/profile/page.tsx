"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ModeBadge } from "@/components/mode-badge"
import { EmptyState } from "@/components/empty-state"
import { mockUser, mockPurchases, mockDonations, formatPrice, type Purchase, type Donation } from "@/lib/mock-data"
import { ShoppingBag, Heart, Sparkles, Award, Download, Calendar, CheckCircle2, Clock, PackageX } from "lucide-react"

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
            <Image
              src={purchase.product.image || "/placeholder.svg"}
              alt={purchase.product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold line-clamp-1">{purchase.product.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(purchase.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              </div>
              <ModeBadge mode={purchase.product.mode} size="sm" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium">{formatPrice(purchase.total)}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Delivered
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DonationCard({ donation }: { donation: Donation }) {
  const completedSteps = donation.trackingSteps.filter((s) => s.completed).length
  const progress = (completedSteps / donation.trackingSteps.length) * 100

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {donation.product && (
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
              <Image
                src={donation.product.image || "/placeholder.svg"}
                alt={donation.product.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold line-clamp-1">{donation.product?.title || "Donation"}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(donation.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                </p>
              </div>
              <ModeBadge mode={donation.type === "dowear" ? "dowear" : "dowear-plus"} size="sm" />
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {completedSteps}/{donation.trackingSteps.length} steps
                </span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Tracking</p>
          <div className="space-y-2">
            {donation.trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <span className={step.completed ? "" : "text-muted-foreground"}>{step.title}</span>
                {step.date && <span className="text-xs text-muted-foreground ml-auto">{step.date}</span>}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CertificateCard() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-semibold">E-Certificate</span>
          </div>
          <Badge variant="secondary">2026</Badge>
        </div>
        <div className="p-4 rounded-lg bg-background border text-center mb-4">
          <p className="text-xs text-muted-foreground mb-2">Certificate of Appreciation</p>
          <p className="font-semibold text-lg">{mockUser.name}</p>
          <p className="text-sm text-muted-foreground mt-1">
            For contributing to sustainable fashion and community support through ReWear+
          </p>
        </div>
        <Link href="/certificate">
          <Button className="w-full bg-transparent" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            View & Download Certificate
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("purchases")

  const physicalDonations = mockDonations.filter((d) => d.type === "dowear")
  const fundDonations = mockDonations.filter((d) => d.type === "dowear-plus")

  return (
    <div className="container px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-muted shrink-0">
              <Image src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} fill className="object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-1">{mockUser.name}</h1>
              <p className="text-muted-foreground mb-3">{mockUser.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {mockUser.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="h-4 w-4" />
                Member since{" "}
                {new Date(mockUser.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-3xl font-bold text-primary">{mockPurchases.length + mockDonations.length}</p>
                <p className="text-xs text-muted-foreground">Total Activity</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Purchases
              </TabsTrigger>
              <TabsTrigger value="physical" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                DoWear
              </TabsTrigger>
              <TabsTrigger value="fund" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                DoWear+
              </TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="space-y-4">
              {mockPurchases.length > 0 ? (
                mockPurchases.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase} />)
              ) : (
                <EmptyState
                  icon={PackageX}
                  title="No purchases yet"
                  description="Start shopping to see your purchase history here."
                />
              )}
            </TabsContent>

            <TabsContent value="physical" className="space-y-4">
              {physicalDonations.length > 0 ? (
                physicalDonations.map((donation) => <DonationCard key={donation.id} donation={donation} />)
              ) : (
                <EmptyState
                  icon={Heart}
                  title="No physical donations yet"
                  description="Donate clothes through DoWear to help those in need."
                />
              )}
            </TabsContent>

            <TabsContent value="fund" className="space-y-4">
              {fundDonations.length > 0 ? (
                fundDonations.map((donation) => <DonationCard key={donation.id} donation={donation} />)
              ) : (
                <EmptyState
                  icon={Sparkles}
                  title="No fund donations yet"
                  description="Donate items through DoWear+ to support our community fund."
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CertificateCard />

          {/* Impact Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Items Donated</span>
                  <span className="font-semibold">{mockDonations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fund Contributed</span>
                  <span className="font-semibold text-primary">
                    {formatPrice(mockPurchases.reduce((sum, p) => sum + p.total * 0.07, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Events Supported</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
