"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PiggyBank, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNav() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/savings", icon: PiggyBank, label: "Save" },
    { href: "/transactions", icon: Clock, label: "History" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-4">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Button key={link.href} variant="ghost" className="flex flex-col items-center gap-1" asChild>
              <Link href={link.href}>
                <link.icon className={`h-5 w-5 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
                <span className={`text-sm ${isActive ? "text-purple-600" : "text-gray-400"}`}>{link.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

