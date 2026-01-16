import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ModeBadge } from "@/components/mode-badge"
import { formatPrice, type Product } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const conditionColors = {
    "like-new": "bg-green-100 text-green-800",
    good: "bg-yellow-100 text-yellow-800",
    fair: "bg-orange-100 text-orange-800",
  }

  return (
    <Link href={`/listing/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <ModeBadge mode={product.mode} size="sm" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-1 mb-2">{product.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <Badge variant="secondary" className="text-xs">
              {product.size}
            </Badge>
            <Badge variant="secondary" className={conditionColors[product.condition] + " text-xs"}>
              {product.condition === "like-new"
                ? "Like New"
                : product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
            </Badge>
          </div>
          {product.mode === "dowear" ? (
            <p className="text-sm font-medium text-dowear">Donate Physical</p>
          ) : (
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
