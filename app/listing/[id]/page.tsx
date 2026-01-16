import { notFound } from "next/navigation"
import { mockProducts } from "@/lib/mock-data"
import { ListingContent } from "./listing-content"

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ListingContent product={product} />
}
