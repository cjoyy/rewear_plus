"use client"

import { useState, useMemo, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { EmptyState } from "@/components/empty-state"
import {
  mockProducts,
  categories,
  conditions,
  sizes,
  formatPrice,
  type Mode,
  type Category,
  type Condition,
  type Size,
} from "@/lib/mock-data"
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react"

const modes: { value: Mode; label: string }[] = [
  { value: "rewear", label: "ReWear" },
  { value: "dowear", label: "DoWear" },
  { value: "dowear-plus", label: "DoWear+" },
]

const ITEMS_PER_PAGE = 9

function ListingsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [selectedModes, setSelectedModes] = useState<Mode[]>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter((p) => p.status === "approved")

    if (searchQuery) {
      result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedConditions.length > 0) {
      result = result.filter((p) => selectedConditions.includes(p.condition))
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size))
    }

    if (selectedModes.length > 0) {
      result = result.filter((p) => selectedModes.includes(p.mode))
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [searchQuery, selectedCategories, selectedConditions, selectedSizes, selectedModes, priceRange, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedConditions([])
    setSelectedSizes([])
    setSelectedModes([])
    setPriceRange([0, 100000])
    setSearchQuery("")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedConditions.length > 0 ||
    selectedSizes.length > 0 ||
    selectedModes.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Category</Label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat.value}`}
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, cat.value])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== cat.value))
                  }
                  setCurrentPage(1)
                }}
              />
              <label htmlFor={`cat-${cat.value}`} className="text-sm cursor-pointer">
                {cat.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Size</Label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter((s) => s !== size))
                } else {
                  setSelectedSizes([...selectedSizes, size])
                }
                setCurrentPage(1)
              }}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Condition</Label>
        <div className="space-y-2">
          {conditions.map((cond) => (
            <div key={cond.value} className="flex items-center space-x-2">
              <Checkbox
                id={`cond-${cond.value}`}
                checked={selectedConditions.includes(cond.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedConditions([...selectedConditions, cond.value])
                  } else {
                    setSelectedConditions(selectedConditions.filter((c) => c !== cond.value))
                  }
                  setCurrentPage(1)
                }}
              />
              <label htmlFor={`cond-${cond.value}`} className="text-sm cursor-pointer">
                {cond.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Mode</Label>
        <div className="space-y-2">
          {modes.map((mode) => (
            <div key={mode.value} className="flex items-center space-x-2">
              <Checkbox
                id={`mode-${mode.value}`}
                checked={selectedModes.includes(mode.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedModes([...selectedModes, mode.value])
                  } else {
                    setSelectedModes(selectedModes.filter((m) => m !== mode.value))
                  }
                  setCurrentPage(1)
                }}
              />
              <label htmlFor={`mode-${mode.value}`} className="text-sm cursor-pointer">
                {mode.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value)
            setCurrentPage(1)
          }}
          max={100000}
          step={5000}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Listings</h1>
        <p className="text-muted-foreground">Find your next sustainable fashion piece</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={(value: "newest" | "price-low" | "price-high") => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {selectedCategories.length +
                          selectedConditions.length +
                          selectedSizes.length +
                          selectedModes.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-4">{filteredProducts.length} items found</p>

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-9"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={PackageSearch}
              title="No items found"
              description="Try adjusting your filters or search query to find what you're looking for."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense fallback={null}>
      <ListingsContent />
    </Suspense>
  )
}
