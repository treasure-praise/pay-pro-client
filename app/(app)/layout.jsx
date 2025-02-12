"use client"

import { Button } from "@/components/ui/button"
import { Home, PiggyBankIcon, Save,Clock, User } from "lucide-react"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { Home, PiggyBank, Clock, User } from "lucide-react"

export default function AppLayout({
  children,
}) {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/savings", icon: PiggyBankIcon, label: "Save" },
    { href: "/transactions", icon: Clock, label: "History" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

    return <div className="min-h-screen bg-gray-50">
          {children}
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
      </div>
}



{/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex justify-around py-4">
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="flex flex-col items-center gap-1" as="a">
                <Home className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">Home</span>
              </Button>
            </Link>
            <Link href="/savings" passHref>
              <Button variant="ghost" className="flex flex-col items-center gap-1" as="a">
                <Save className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-purple-600">Save</span>
              </Button>
            </Link>
            <Link href="/profile" passHref>
              <Button variant="ghost" className="flex flex-col items-center gap-1" as="a">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-400">Profile</span>
              </Button>
            </Link>
          </div>
        </div> */}