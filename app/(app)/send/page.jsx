"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import API from "@/api";
import { useToast } from "@/components/ui/use-toast"

const fetchRecipients = async () => {
  const { data } = await API.get("/recipients");
  return data;
};

const transferMoney = async ({ senderId, receiverId, amount, description }) => {
  const { data } = await API.post("/wallet-transfer", {
    senderId,
    receiverId,
    amount: Number(amount),
    description,
  });
  return data;
};

const WalletTransfer = () => {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [receiverId, setReceiverId] = useState(""); // Selected recipient
  const { toast } = useToast()

  // Fetch recipients list
  const { data: recipients, isLoading: loadingRecipients, error: recipientsError } = useQuery({
    queryKey: ["recipients"],
    queryFn: fetchRecipients,
  });

  // Mutation for wallet transfer
  const mutation = useMutation({
    mutationFn: transferMoney,
    onSuccess: () => {
        toast({
            title: "Transfer Successful",
            description: "Your transfer was successfull",
          })
      queryClient.invalidateQueries(["transactions"]); // Invalidate transactions list after transfer
      setAmount("");
      setDescription("");
      setReceiverId("");
      
    },
    onError:(error)=>{
        console.log(error);
        
    }
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    mutation.mutate({
      senderId: localStorage.getItem("userId"), // Get from auth context
      receiverId,
      amount,
      description,
    });
  };

  return (
    <div className="max-w-md mx-auto container p-4 space-y-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Transfer Money
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTransfer} className="space-y-4">
          {/* Recipient Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient</label>
            {loadingRecipients ? (
              <p>Loading recipients...</p>
            ) : recipientsError ? (
              <p className="text-red-500">Error loading recipients</p>
            ) : (
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Recipient</option>
                {recipients?.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name} 
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (₦)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              required
              className="w-full"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              type="text"
              placeholder="What's this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Transfer Preview */}
          {amount && receiverId && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">Your Wallet</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="text-gray-500">Recipient's Wallet</div>
              </div>
              <div className="mt-2 text-center font-semibold">
                ₦ {Number(amount).toLocaleString()}
              </div>
            </div>
          )}

          {/* Error Message */}
          {mutation.isError && (
            <div className="text-red-500 text-sm text-center">
              {mutation.error?.response?.data?.message || "Transfer failed. Try again."}
            </div>
          )}

          {/* Success Message */}
          {mutation.isSuccess && (
            <div className="text-green-500 text-sm text-center">
              Transfer completed successfully!
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending || !amount || !description || !receiverId}
          >
            {mutation.isPending ? "Processing..." : "Send Money"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default WalletTransfer;