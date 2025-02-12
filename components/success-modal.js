"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SuccessModal() {
  return (
    <div className="fixed inset-0 bg-purple-600 flex flex-col items-center justify-center p-4">
      <div className="space-y-8 text-center text-white">
        <div className="flex justify-center">
          <Image src="/placeholder.svg" alt="Success" width={100} height={100} className="animate-bounce" />
        </div>
        <h2 className="text-2xl font-semibold">Money saved Successfully</h2>
        <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-white/90">
          Done
        </Button>
      </div>
    </div>
  )
}

