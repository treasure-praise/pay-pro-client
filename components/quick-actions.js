import { Building2, PiggyBank, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function QuickActions() {
  const actions = [
    
    {
      icon: Send,
      label: "Send money",
      href: "/send",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: PiggyBank,
      label: "Save",
      href: "/savings",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    
    {
      icon: Building2,
      label: "Withdraw to Bank",
      href: "/withdraw",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
  ]

  return (
    <div className="space-y-2">
      {actions.map((action) => (
        <Button key={action.label} variant="outline" className="w-full justify-between h-auto py-4" asChild>
          <Link href={action.href}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${action.bgColor}`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span>{action.label}</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      ))}
    </div>
  )
}

