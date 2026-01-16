"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModeBadge } from "@/components/mode-badge"
import { DonationBreakdown } from "@/components/donation-breakdown"
import { useToast } from "@/hooks/use-toast"
import { formatPrice, calculateFees, type Product } from "@/lib/mock-data"
import { ShoppingCart, Heart, Share2, Truck, Package, CheckCircle2, ArrowLeft, Info, HandHeart } from "lucide-react"

export function ListingContent({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  const { sellerNet } = calculateFees(product.price)

  const conditionColors = {
    "like-new": "bg-green-100 text-green-800",
    good: "bg-yellow-100 text-yellow-800",
    fair: "bg-orange-100 text-orange-800",
  }

  const handleBuy = () => {
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Product link has been copied to clipboard.",
    })
  }

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/listings">Listings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Link
        href="/listings"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to listings
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <ModeBadge mode={product.mode} />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{product.size}</Badge>
              <Badge variant="secondary" className={conditionColors[product.condition]}>
                {product.condition === "like-new"
                  ? "Like New"
                  : product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Mode-specific content */}
          {product.mode === "rewear" && (
            <>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                </div>
                <DonationBreakdown price={product.price} showSellerNet />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" onClick={handleBuy}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {product.mode === "dowear" && (
            <>
              <Card className="border-dowear/30 bg-dowear/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-dowear">
                    <HandHeart className="h-5 w-5" />
                    Physical Donation Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This item will be donated directly to those in need. As a donor, you are responsible for shipping
                    costs.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Prepare your item</p>
                        <p className="text-xs text-muted-foreground">Clean and pack the item securely</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Ship to our warehouse</p>
                        <p className="text-xs text-muted-foreground">Shipping label will be provided after donation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">We handle the rest</p>
                        <p className="text-xs text-muted-foreground">Your item will be distributed to beneficiaries</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-dowear hover:bg-dowear/90 text-dowear-foreground">
                    <HandHeart className="h-5 w-5 mr-2" />
                    Donate Similar Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start Your Donation</DialogTitle>
                    <DialogDescription>
                      Ready to donate a similar item? Head to the Sell page and select DoWear mode.
                    </DialogDescription>
                  </DialogHeader>
                  <Link href="/sell">
                    <Button className="w-full mt-4">Go to Donate</Button>
                  </Link>
                </DialogContent>
              </Dialog>
            </>
          )}

          {product.mode === "dowear-plus" && (
            <>
              <Card className="border-dowear-plus/30 bg-dowear-plus/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-dowear-plus-foreground">
                    <Info className="h-5 w-5" />
                    DoWear+ Item
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This item was donated through DoWear+. The platform sets a fixed price (max Rp100,000), and all
                    proceeds go to our Donation Fund.
                  </p>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background border">
                    <div className="h-10 w-10 rounded-full bg-dowear-plus/20 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-dowear-plus-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Fund Destination: <span className="capitalize">{product.fundDestination}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">100% of sale goes to the fund</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  <span className="text-sm text-muted-foreground">Platform price</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-dowear-plus hover:bg-dowear-plus/90 text-dowear-plus-foreground"
                  onClick={handleBuy}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy & Support the Fund
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {/* Seller Info */}
          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              {product.mode === "rewear" ? "Sold by" : "Donated by"}{" "}
              <span className="font-medium text-foreground">{product.seller}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Listed on {new Date(product.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
