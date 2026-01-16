import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Mode } from "@/lib/mock-data"

interface ModeBadgeProps {
  mode: Mode
  size?: "sm" | "default"
  className?: string
}

const modeConfig: Record<Mode, { label: string; className: string }> = {
  rewear: {
    label: "ReWear",
    className: "bg-rewear text-rewear-foreground hover:bg-rewear/90",
  },
  dowear: {
    label: "DoWear",
    className: "bg-dowear text-dowear-foreground hover:bg-dowear/90",
  },
  "dowear-plus": {
    label: "DoWear+",
    className: "bg-dowear-plus text-dowear-plus-foreground hover:bg-dowear-plus/90",
  },
}

export function ModeBadge({ mode, size = "default", className }: ModeBadgeProps) {
  const config = modeConfig[mode]

  return (
    <Badge className={cn(config.className, size === "sm" && "text-xs px-2 py-0.5", className)}>{config.label}</Badge>
  )
}
