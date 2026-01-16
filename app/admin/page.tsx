"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { ModeBadge } from "@/components/mode-badge"
import { useToast } from "@/hooks/use-toast"
import { mockPendingListings, mockEvents, formatPrice } from "@/lib/mock-data"
import {
  CheckCircle2,
  XCircle,
  Calendar,
  FileText,
  DollarSign,
  Package,
  PlusCircle,
  AlertTriangle,
  Heart,
} from "lucide-react"

export default function AdminPage() {
  const [pendingListings, setPendingListings] = useState(mockPendingListings)
  const [events, setEvents] = useState(mockEvents)
  const [priceInputs, setPriceInputs] = useState<Record<string, number>>({})
  const { toast } = useToast()

  const handleApprove = (id: string) => {
    setPendingListings((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Listing approved",
      description: "The listing is now live on the marketplace.",
    })
  }

  const handleReject = (id: string) => {
    setPendingListings((prev) => prev.filter((p) => p.id !== id))
    toast({
      title: "Listing rejected",
      description: "The seller has been notified.",
    })
  }

  const handleSetPrice = (id: string) => {
    const price = priceInputs[id]
    if (!price || price > 100000) {
      toast({
        title: "Invalid price",
        description: "Price must be between 1 and 100,000 IDR.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Price set",
      description: `DoWear+ item price set to ${formatPrice(price)}`,
    })
    handleApprove(id)
  }

  const handleToggleDistributed = (eventId: string, distributed: boolean) => {
    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, distributed } : e)))
    toast({
      title: distributed ? "Marked as distributed" : "Unmarked as distributed",
      description: "Event status has been updated.",
    })
  }

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Event created",
      description: "New campaign has been added.",
    })
  }

  const doWearPlusListings = pendingListings.filter((p) => p.mode === "dowear-plus")
  const otherListings = pendingListings.filter((p) => p.mode !== "dowear-plus")

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage listings, events, and platform operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingListings.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{events.filter((e) => !e.distributed).length}</p>
                <p className="text-xs text-muted-foreground">Active Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatPrice(12500000)}</p>
                <p className="text-xs text-muted-foreground">Total Fund</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger value="listings" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Pending Listings
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          {/* Regular Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>Review and approve new listings</CardDescription>
            </CardHeader>
            <CardContent>
              {otherListings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otherListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded overflow-hidden bg-muted shrink-0">
                              <Image
                                src={listing.image || "/placeholder.svg"}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium line-clamp-1">{listing.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ModeBadge mode={listing.mode} size="sm" />
                        </TableCell>
                        <TableCell className="capitalize">{listing.category}</TableCell>
                        <TableCell>{formatPrice(listing.price)}</TableCell>
                        <TableCell>{listing.seller}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={() => handleApprove(listing.id)}>
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                              onClick={() => handleReject(listing.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">No pending listings</p>
              )}
            </CardContent>
          </Card>

          {/* DoWear+ Listings (need pricing) */}
          <Card>
            <CardHeader>
              <CardTitle>DoWear+ Items - Set Price</CardTitle>
              <CardDescription>Set fixed prices for donated items (max Rp100,000)</CardDescription>
            </CardHeader>
            <CardContent>
              {doWearPlusListings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Fund</TableHead>
                      <TableHead>Set Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doWearPlusListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded overflow-hidden bg-muted shrink-0">
                              <Image
                                src={listing.image || "/placeholder.svg"}
                                alt={listing.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium line-clamp-1">{listing.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{listing.condition}</TableCell>
                        <TableCell className="capitalize">{listing.fundDestination}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Rp</span>
                            <Input
                              type="number"
                              placeholder="0"
                              className="w-24"
                              max={100000}
                              value={priceInputs[listing.id] || ""}
                              onChange={(e) =>
                                setPriceInputs({
                                  ...priceInputs,
                                  [listing.id]: Math.min(Number(e.target.value), 100000),
                                })
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" onClick={() => handleSetPrice(listing.id)}>
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Set & Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                              onClick={() => handleReject(listing.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground py-8">No DoWear+ items pending</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Manage Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Add a new donation campaign or disaster relief event</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Title</Label>
                    <Input id="event-title" placeholder="Event title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disaster">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Disaster Relief
                          </div>
                        </SelectItem>
                        <SelectItem value="charity">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Charity Campaign
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-desc">Description</Label>
                    <Textarea id="event-desc" placeholder="Describe the campaign..." required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-target">Target (IDR)</Label>
                      <Input id="event-target" type="number" placeholder="0" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-end">End Date</Label>
                      <Input id="event-end" type="date" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Event</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Distributed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => {
                    const progress = (event.raised / event.target) * 100
                    return (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              event.type === "disaster" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            }
                          >
                            {event.type === "disaster" ? "Disaster" : "Charity"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${Math.min(progress, 100)}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {event.distributed ? (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          ) : (
                            <Badge variant="secondary">Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Switch
                            checked={event.distributed}
                            onCheckedChange={(checked) => handleToggleDistributed(event.id, checked)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Export platform data and donation reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Sales Report</span>
                  <span className="text-xs text-muted-foreground">January 2026</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Donation Report</span>
                  <span className="text-xs text-muted-foreground">All DoWear/DoWear+</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span>Fund Usage Report</span>
                  <span className="text-xs text-muted-foreground">Impact summary</span>
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-medium mb-2">Quick Summary - January 2026</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Sales</p>
                    <p className="font-semibold">{formatPrice(4500000)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Auto Donations</p>
                    <p className="font-semibold text-primary">{formatPrice(315000)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">DoWear+ Sales</p>
                    <p className="font-semibold">{formatPrice(890000)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Items Distributed</p>
                    <p className="font-semibold">127</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
