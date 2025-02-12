"use client"

import { useRouter,useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import API from "@/api"

const TransactionDetails = () => {
  const params = useParams()
  const router = useRouter()
  
  const { transaction } = params 

  const [transactiona, setTransaction] = useState(null)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data } = await API.get(`/wallet-transaction/${transaction}`)
        setTransaction(data) // Set transaction details
      } catch (error) {
        console.error("Error fetching transaction:", error)
      }
    }

    fetchTransaction()
  }, [transaction])

  if (!transactiona) return <SkeletonLoader/>

  return (
    
    <div className="min-h-screen bg-white container max-w-md mx-auto p-4 space-y-2">
      {/* Back Button */}
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      {/* Transaction Summary */}
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Transaction Summary</h1>
          <div className="text-purple-600 text-3xl font-bold mb-1">
            ₦ {parseFloat(transactiona.amount).toLocaleString()}.00
          </div>
          <div className="text-gray-500">
            {new Date(transactiona.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Payment Destination</span>
            <span>{transactiona.description}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Status</span>
            <span className="">{transactiona.status}</span>
          </div>

          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Type</span>
            <span className="text-green-600">{transactiona.type}</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b">
            <span className="text-gray-500">Reference ID</span>
            <span className="text-xs">{transactiona.id}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-gray-500">Email</span>
            <span className="text-purple-600">{transactiona.email}</span> 
          </div>
        </div>

        
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Copy Reference</Button>
      </div>
    </div>
  )
}

export default TransactionDetails



const SkeletonLoader = () => (
  <div className="min-h-screen bg-white  mt-11 container max-w-md mx-auto p-4 space-y-6">
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
    </div>
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between py-4 border-b">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between py-4 border-b">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between py-4 border-b">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between py-4 border-b">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between py-4 border-b">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
    <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
  </div>
)

