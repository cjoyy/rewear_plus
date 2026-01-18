"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ModeBadge } from "@/components/mode-badge"
import { DonationBreakdown } from "@/components/donation-breakdown"
import { useToast } from "@/hooks/use-toast"
import {
  categories,
  conditions,
  sizes,
  formatPrice,
  calculateFees,
  type Mode,
  type Category,
  type Condition,
  type Size,
} from "@/lib/mock-data"
import { ArrowLeft, ArrowRight, Upload, CheckCircle2, AlertCircle, Leaf, Heart, Sparkles } from "lucide-react"

type FundDestination = "disaster" | "education" | "general"

interface FormData {
  title: string
  category: Category | ""
  size: Size | ""
  condition: Condition | ""
  description: string
  photos: string[]
  mode: Mode
  price: number
  donationDestination: string
  shippingAcknowledged: boolean
  fundDestination: FundDestination
  platformPriceAcknowledged: boolean
}

const initialFormData: FormData = {
  title: "",
  category: "",
  size: "",
  condition: "",
  description: "",
  photos: [],
  mode: "rewear",
  price: 0,
  donationDestination: "",
  shippingAcknowledged: false,
  fundDestination: "general",
  platformPriceAcknowledged: false,
}

const donationPartners = [
  { id: "yayasan-anak-bangsa", name: "Yayasan Anak Bangsa", focus: "Children & Education" },
  { id: "rumah-zakat", name: "Rumah Zakat", focus: "Disaster Relief" },
  { id: "dompet-dhuafa", name: "Dompet Dhuafa", focus: "General Aid" },
]

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { toast } = useToast()

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  const validateStep1 = () => {
    return formData.title && formData.category && formData.size && formData.condition && formData.description
  }

  const validateStep2 = () => {
    switch (formData.mode) {
      case "rewear":
        return formData.price > 0 && formData.price <= 100000
      case "dowear":
        return formData.donationDestination && formData.shippingAcknowledged
      case "dowear-plus":
        return formData.fundDestination && formData.platformPriceAcknowledged
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) {
      toast({
        title: "Please fill in all fields",
        description: "All item details are required to continue.",
        variant: "destructive",
      })
      return
    }
    if (step === 2 && !validateStep2()) {
      toast({
        title: "Please complete all required fields",
        description: "Make sure you've filled in the mode-specific details.",
        variant: "destructive",
      })
      return
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    toast({
      title: "Listing submitted!",
      description:
        formData.mode === "rewear"
          ? "Your item is now pending review."
          : "Thank you for your donation! We'll be in touch soon.",
    })
    setFormData(initialFormData)
    setStep(1)
  }

  const fees = formData.price > 0 ? calculateFees(formData.price) : null

  return (
    <div className="container max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
        <p className="text-muted-foreground">List your item to sell or donate</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Item Details</span>
          <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Mode & Pricing</span>
          <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Confirmation</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step 1: Item Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Tell us about the item you want to list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mode Selector */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Mode</Label>
              <RadioGroup
                value={formData.mode}
                onValueChange={(value: Mode) => updateFormData({ mode: value })}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <Label
                  htmlFor="rewear"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.mode === "rewear" ? "border-rewear bg-rewear/5" : "border-border hover:border-muted-foreground"}`}
                >
                  <RadioGroupItem value="rewear" id="rewear" className="sr-only" />
                  <div className="h-10 w-10 rounded-full bg-rewear/10 flex items-center justify-center mb-2">
                    <Leaf className="h-5 w-5 text-rewear" />
                  </div>
                  <span className="font-semibold">ReWear</span>
                  <span className="text-xs text-muted-foreground text-center">Sell with auto donation</span>
                </Label>

                <Label
                  htmlFor="dowear"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.mode === "dowear" ? "border-dowear bg-dowear/5" : "border-border hover:border-muted-foreground"}`}
                >
                  <RadioGroupItem value="dowear" id="dowear" className="sr-only" />
                  <div className="h-10 w-10 rounded-full bg-dowear/10 flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-dowear" />
                  </div>
                  <span className="font-semibold">DoWear</span>
                  <span className="text-xs text-muted-foreground text-center">Donate physical items</span>
                </Label>

                <Label
                  htmlFor="dowear-plus"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.mode === "dowear-plus" ? "border-dowear-plus bg-dowear-plus/5" : "border-border hover:border-muted-foreground"}`}
                >
                  <RadioGroupItem value="dowear-plus" id="dowear-plus" className="sr-only" />
                  <div className="h-10 w-10 rounded-full bg-dowear-plus/10 flex items-center justify-center mb-2">
                    <Sparkles className="h-5 w-5 text-dowear-plus-foreground" />
                  </div>
                  <span className="font-semibold">DoWear+</span>
                  <span className="text-xs text-muted-foreground text-center">Donate to sell for fund</span>
                </Label>
              </RadioGroup>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Vintage Batik Tulis Solo"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
              />
            </div>

            {/* Category, Size, Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Category) => updateFormData({ category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={formData.size} onValueChange={(value: Size) => updateFormData({ size: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value: Condition) => updateFormData({ condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((cond) => (
                      <SelectItem key={cond.value} value={cond.value}>
                        {cond.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail..."
                rows={4}
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Photos</Label>
              <div className="border-2 border-dashed rounded-lg p-6">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                      const newPhotos: string[] = []
                      Array.from(files).slice(0, 5 - formData.photos.length).forEach((file) => {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          newPhotos.push(reader.result as string)
                          if (newPhotos.length === Math.min(files.length, 5 - formData.photos.length)) {
                            updateFormData({ photos: [...formData.photos, ...newPhotos].slice(0, 5) })
                          }
                        }
                        reader.readAsDataURL(file)
                      })
                    }
                  }}
                />
                {formData.photos.length === 0 ? (
                  <label htmlFor="photo-upload" className="cursor-pointer block text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop photos or click to upload</p>
                    <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById('photo-upload')?.click()}>
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Max 5 photos, 5MB each</p>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted group">
                          <img src={photo || "/placeholder.svg"} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => updateFormData({ photos: formData.photos.filter((_, i) => i !== index) })}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {formData.photos.length < 5 && (
                        <label
                          htmlFor="photo-upload"
                          className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">{formData.photos.length}/5 photos uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Mode-specific Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ModeBadge mode={formData.mode} />
              <div>
                <CardTitle>
                  {formData.mode === "rewear" && "Pricing"}
                  {formData.mode === "dowear" && "Donation Details"}
                  {formData.mode === "dowear-plus" && "Fund Allocation"}
                </CardTitle>
                <CardDescription>
                  {formData.mode === "rewear" && "Set your selling price (max Rp100,000)"}
                  {formData.mode === "dowear" && "Choose where your donation goes"}
                  {formData.mode === "dowear-plus" && "Select which fund receives the sale proceeds"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ReWear: Pricing */}
            {formData.mode === "rewear" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="price">Selling Price (IDR)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      min={0}
                      max={100000}
                      value={formData.price || ""}
                      onChange={(e) => updateFormData({ price: Math.min(Number(e.target.value), 100000) })}
                      className="pl-10"
                    />
                  </div>
                  {formData.price > 100000 && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Maximum price is Rp100,000
                    </p>
                  )}
                  {formData.price > 0 && formData.price <= 100000 && (
                    <p className="text-sm text-muted-foreground">
                      You will receive: <span className="font-semibold">{formatPrice(fees?.sellerNet || 0)}</span> (85%
                      after fees)
                    </p>
                  )}
                </div>

                {formData.price > 0 && formData.price <= 100000 && <DonationBreakdown price={formData.price} />}
              </>
            )}

            {/* DoWear: Physical Donation */}
            {formData.mode === "dowear" && (
              <>
                <div className="space-y-3">
                  <Label>Donation Partner / Destination</Label>
                  <RadioGroup
                    value={formData.donationDestination}
                    onValueChange={(value) => updateFormData({ donationDestination: value })}
                    className="space-y-3"
                  >
                    {donationPartners.map((partner) => (
                      <Label
                        key={partner.id}
                        htmlFor={partner.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.donationDestination === partner.id ? "border-dowear bg-dowear/5" : "border-border hover:border-muted-foreground"}`}
                      >
                        <RadioGroupItem value={partner.id} id={partner.id} />
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">{partner.focus}</p>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium mb-2">Shipping Responsibility</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    As a physical donation, you will be responsible for shipping the item to our warehouse. We will
                    provide a shipping label after your donation is approved.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shipping"
                      checked={formData.shippingAcknowledged}
                      onCheckedChange={(checked) => updateFormData({ shippingAcknowledged: checked as boolean })}
                    />
                    <label htmlFor="shipping" className="text-sm cursor-pointer">
                      I understand and agree to pay for shipping
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* DoWear+: Donate to Sell */}
            {formData.mode === "dowear-plus" && (
              <>
                <div className="p-4 rounded-lg bg-dowear-plus/10 border border-dowear-plus/30">
                  <h4 className="font-medium mb-2 text-dowear-plus-foreground">How DoWear+ Works</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-dowear-plus-foreground shrink-0 mt-0.5" />
                      You donate your item to the platform
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-dowear-plus-foreground shrink-0 mt-0.5" />
                      Platform sets a fixed price (max Rp100,000) based on condition
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-dowear-plus-foreground shrink-0 mt-0.5" />
                      100% of sale proceeds go to the Donation Fund
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Label>Fund Destination</Label>
                  <RadioGroup
                    value={formData.fundDestination}
                    onValueChange={(value: FundDestination) => updateFormData({ fundDestination: value })}
                    className="space-y-3"
                  >
                    <Label
                      htmlFor="disaster"
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.fundDestination === "disaster" ? "border-dowear-plus bg-dowear-plus/5" : "border-border hover:border-muted-foreground"}`}
                    >
                      <RadioGroupItem value="disaster" id="disaster" />
                      <div>
                        <p className="font-medium">Disaster Response Fund</p>
                        <p className="text-sm text-muted-foreground">Emergency relief for natural disasters</p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="education"
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.fundDestination === "education" ? "border-dowear-plus bg-dowear-plus/5" : "border-border hover:border-muted-foreground"}`}
                    >
                      <RadioGroupItem value="education" id="education" />
                      <div>
                        <p className="font-medium">Education Fund</p>
                        <p className="text-sm text-muted-foreground">School uniforms and supplies for students</p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="general"
                      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${formData.fundDestination === "general" ? "border-dowear-plus bg-dowear-plus/5" : "border-border hover:border-muted-foreground"}`}
                    >
                      <RadioGroupItem value="general" id="general" />
                      <div>
                        <p className="font-medium">General Aid Fund</p>
                        <p className="text-sm text-muted-foreground">Clothing distribution to those in need</p>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="platform-price"
                    checked={formData.platformPriceAcknowledged}
                    onCheckedChange={(checked) => updateFormData({ platformPriceAcknowledged: checked as boolean })}
                  />
                  <label htmlFor="platform-price" className="text-sm cursor-pointer">
                    I agree that the platform will set the final price for my donated item
                  </label>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Confirm Your Listing
            </CardTitle>
            <CardDescription>Please review the details before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-start py-3 border-b">
                <span className="text-muted-foreground">Mode</span>
                <ModeBadge mode={formData.mode} />
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium text-right">{formData.title}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">{formData.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium">{formData.size}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium capitalize">
                  {formData.condition === "like-new" ? "Like New" : formData.condition}
                </span>
              </div>

              {formData.mode === "rewear" && (
                <>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{formatPrice(formData.price)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">You Receive (85%)</span>
                    <span className="font-medium">{formatPrice(fees?.sellerNet || 0)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground text-primary">Auto Donation (7%)</span>
                    <span className="font-medium text-primary">{formatPrice(fees?.donationFee || 0)}</span>
                  </div>
                </>
              )}

              {formData.mode === "dowear" && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Donation Partner</span>
                  <span className="font-medium">
                    {donationPartners.find((p) => p.id === formData.donationDestination)?.name}
                  </span>
                </div>
              )}

              {formData.mode === "dowear-plus" && (
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Fund Destination</span>
                  <span className="font-medium capitalize">{formData.fundDestination}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm">
                {formData.mode === "rewear" &&
                  "Your listing will be reviewed and published within 24 hours. 7% of your sale will automatically support our community fund."}
                {formData.mode === "dowear" &&
                  "Thank you for your generosity! After approval, you'll receive shipping instructions to send your item to our warehouse."}
                {formData.mode === "dowear-plus" &&
                  "Thank you for donating! Your item will be priced by our team and listed for sale. 100% of proceeds support the community."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-primary">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Submit Listing
          </Button>
        )}
      </div>
    </div>
  )
}
