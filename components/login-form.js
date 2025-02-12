"use client"

import { useState } from "react"
import { Eye, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-gray-500">Enter your details to continue your financial goals</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Input type="email" placeholder="Enter your email" className="w-full" />
              </div>

              <div className="space-y-2 relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Eye className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">Login</Button>
            </form>

            <div className="text-center">
              <a href="#" className="text-purple-600 hover:text-purple-700">
                Forget password
              </a>
            </div>

            <div className="flex justify-center pt-4">
              <Fingerprint className="h-12 w-12 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

