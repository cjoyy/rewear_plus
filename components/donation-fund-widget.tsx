import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatPrice, type DonationFund } from "@/lib/mock-data"
import { Heart, TrendingUp, Calendar } from "lucide-react"

interface DonationFundWidgetProps {
  fund: DonationFund
  compact?: boolean
}

export function DonationFundWidget({ fund, compact = false }: DonationFundWidgetProps) {
  const progress = (fund.total / fund.goal) * 100

  if (compact) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium">Donation Fund</span>
          </div>
          <p className="text-2xl font-bold text-primary">{formatPrice(fund.total)}</p>
          <Progress value={progress} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(progress)}% of {formatPrice(fund.goal)} goal
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          Donation Fund
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-primary">{formatPrice(fund.total)}</p>
          <Progress value={progress} className="h-3 mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {Math.round(progress)}% of {formatPrice(fund.goal)} goal
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{formatPrice(fund.thisMonth)}</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{fund.activeEvents}</p>
              <p className="text-xs text-muted-foreground">Active events</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
