"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Save,
  User,
  ChevronRight,
  Shield,
  Building2,
  Eye,
  KeyRound,
  Fingerprint,
  Headphones,
  Camera,
} from "lucide-react"

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-3 mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile-p3DpStIWuATXdHN5Sanhzx5IGuXa0s.png"
                alt="Profile picture"
              />
              <AvatarFallback>AO</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full bg-purple-600 text-white hover:bg-purple-700"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h1 className="text-2xl font-semibold">Abdurahman Opoola</h1>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-gray-500">IDENTIFICATION & KYC UPDATES</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Update KYC Information</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Verify BVN</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-gray-500">FINANCE & REWARDS</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <span>Bank accounts</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span>Hide Cash balance</span>
                </div>
                <Switch />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium text-gray-500">SECURITY</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between h-auto py-4">
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-purple-600" />
                  <span>Change PIN</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Fingerprint className="h-5 w-5 text-purple-600" />
                  <span>Touch ID</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </section>

          <Button variant="outline" className="w-full justify-between h-auto py-4">
            <div className="flex items-center gap-3">
              <Headphones className="h-5 w-5 text-purple-600" />
              <span>Help & support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Button>

          <Separator />

          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            Log out
          </Button>
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex justify-around py-4">
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <Save className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Save</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center gap-1">
              <User className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-purple-600">Profile</span>
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

