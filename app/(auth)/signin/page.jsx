"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // API call function
  const loginUser = async (userData) => {
    const response = await axios.post("http://localhost:5002/api/login", userData)
    return response.data
  }

  // Mutation hook for handling login
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Successful:", data)
      // Save token in localStorage or context if needed
      localStorage.setItem("token", data.token) 
      localStorage.setItem("email", data.email) 
      localStorage.setItem("name", data.name) 
      localStorage.setItem("userId", data.userId) 
      router.push("/dashboard")
    },
    onError: (error) => {
      console.error("Login Failed:", error)
      setError(error.response?.data?.message || "Login failed. Please try again.")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("") // Clear previous errors

    // Basic input validation
    if (!email || !password) {
      setError("Email and password are required.")
      return
    }

    mutation.mutate({ email, password })
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="mb-6">
        <Button variant="ghost" size="icon" asChild className="mb-6">
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-500">Enter your details to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center">
          <Link href="/auth/forgot-password" className="text-purple-600 hover:text-purple-700">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  )
}