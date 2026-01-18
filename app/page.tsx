"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { EventCard } from "@/components/event-card"
import { DonationFundWidget } from "@/components/donation-fund-widget"
import { mockProducts, mockEvents, mockDonationFund, categories } from "@/lib/mock-data"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Leaf } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory && product.status === "approved"
  })

  const rewearProducts = filteredProducts.filter((p) => p.mode === "rewear")
  const donationProducts = filteredProducts.filter((p) => p.mode !== "rewear")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 border-b">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/rewear-logo.png"
                alt="ReWear+ Logo"
                width={80}
                height={80}
                className="rounded-2xl"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Wear Again, Care Again
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Thrift. Donate. <span className="text-primary">Make Impact.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join ReWear+ sustainable fashion movement. Buy pre-loved clothes, donate to those in need, or contribute to
              our community fund through DoWear+.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings">
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Listings
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Donating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="rewear" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="rewear" className="flex-1 sm:flex-none">
                  ReWear Listings
                </TabsTrigger>
                <TabsTrigger value="donation" className="flex-1 sm:flex-none">
                  Donation & Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rewear">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {rewearProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {rewearProducts.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No items found. Try adjusting your search or filters.
                  </div>
                )}
                <div className="mt-8 text-center">
                  <Link href="/listings">
                    <Button variant="outline">
                      View All Listings
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="donation">
                <div className="space-y-8">
                  {/* Donation Products */}
                  {donationProducts.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">DoWear+ Items</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {donationProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Events */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Active Events</h3>
                      <Link href="/donate">
                        <Button variant="ghost" size="sm">
                          View All
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {mockEvents
                        .filter((e) => !e.distributed)
                        .map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <DonationFundWidget fund={mockDonationFund} />

            <div className="p-4 rounded-lg border bg-card">
              <h3 className="font-semibold mb-3">How It Works</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-rewear text-rewear-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">ReWear</p>
                    <p className="text-muted-foreground">Buy & sell pre-loved items with auto 7% donation</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-dowear text-dowear-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">DoWear</p>
                    <p className="text-muted-foreground">Donate clothes directly to those in need</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-dowear-plus text-dowear-plus-foreground flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">DoWear+</p>
                    <p className="text-muted-foreground">Donate items to be sold, proceeds go to fund</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
