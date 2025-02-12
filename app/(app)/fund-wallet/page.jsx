"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import API from "@/api"

export default function FundWallet() {
  const [amount, setAmount] = useState("")
  const router = useRouter()
  const { toast } = useToast()


const initializePayment = async(amount)=>{
  const {data} = await API.post("/fund",amount)
  return data
}

  const mutation = useMutation({
    mutationFn: initializePayment,
    onSuccess:(data)=>{
      console.log("yayyyyy");
      console.log(data);
      
      // Redirect to Paystack checkout link
      window.location.href = data.checkoutUrl;
    },
    onError:(error)=>{
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Payment failed",
        variant: "destructive",
      });
    }
  })



  const handleFundWallet = () => {
    if (!amount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    mutation.mutate({ amount });
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_c907a89cef665d5e9be1dd67a5cdc8f5b885bb9f',
  };

  const handleSuccess = () => {
    toast({
      title: "Payment Successful",
      description: "Your wallet has been funded successfully",
    })
    router.push("/dashboard")
  }

  const handleClose = () => {
    toast({
      title: "Payment Cancelled",
      description: "Your payment was cancelled",
      variant: "destructive",
    })
  }

  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Fund Wallet</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (₦)
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

    

<Button
            onClick={handleFundWallet}
            disabled={mutation.isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            {mutation.isLoading ? "Processing..." : "Pay Now"}
          </Button>

        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {[1000, 2000, 5000, 10000, 20000, 50000].map((quickAmount) => (
          <Button
            key={quickAmount}
            variant="outline"
            onClick={() => setAmount(quickAmount.toString())}
            className="py-6"
          >
            ₦{quickAmount.toLocaleString()}
          </Button>
        ))}
      </div>
    </div>
  )
}

