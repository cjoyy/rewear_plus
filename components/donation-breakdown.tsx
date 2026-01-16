import { calculateFees, formatPrice } from "@/lib/mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface DonationBreakdownProps {
  price: number
  showSellerNet?: boolean
}

export function DonationBreakdown({ price, showSellerNet = false }: DonationBreakdownProps) {
  const { adminFee, donationFee, sellerNet } = calculateFees(price)

  return (
    <div className="space-y-2 p-4 rounded-lg bg-muted/50 border">
      <div className="flex justify-between text-sm">
        <span>Item Price</span>
        <span className="font-medium">{formatPrice(price)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-1">
          Admin Fee (8%)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Platform operational costs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <span className="text-muted-foreground">{formatPrice(adminFee)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="flex items-center gap-1 text-primary">
          Donation (7%)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-3.5 w-3.5 text-primary" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Auto-donated to community fund</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <span className="text-primary font-medium">{formatPrice(donationFee)}</span>
      </div>
      {showSellerNet && (
        <>
          <hr className="border-border" />
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              Seller Receives (85%)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Net amount after fees</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className="font-semibold">{formatPrice(sellerNet)}</span>
          </div>
        </>
      )}
    </div>
  )
}
