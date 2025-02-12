"use client"

import React, { useState } from "react";
import { Building2, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import API from "@/api";

// You should store this in an environment variable
const PAYSTACK_SECRET_KEY = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = process.env.NEXT_PUBLIC_PAYSTACK_BASE_URL;
const data = process.env.NEXT_PUBLIC_API_URL
console.log(data);


const WithdrawalForm = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Fetch banks using React Query
  const { data: banks, isLoading: isBanksLoading } = useQuery({
    queryKey: ['banks'],
    queryFn: async () => {
      const response = await axios.get(`${PAYSTACK_BASE_URL}/bank`, {
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.data;
    },
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });

  // Verify account number using React Query
  const { data: accountData, isLoading: isVerifying, error: verificationError, refetch: verifyAccount } = useQuery({
    queryKey: ['verify-account', selectedBank, accountNumber],
    queryFn: async () => {
      if (!selectedBank || accountNumber.length !== 10) return null;
      
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
        {
          headers: {
            'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data;
    },
    enabled: false, // Don't run automatically
    retry: false, // Don't retry on failure
  });

  // Withdrawal mutation
  const { mutate: handleWithdraw, isLoading: isWithdrawing,isSuccess,isError } = useMutation({
    mutationFn: async (withdrawalData) => {
      return await API.post("/withdraw", withdrawalData);
    },
    onSuccess: () => {
      // Reset form
      setAmount("");
      setDescription("");
      setAccountNumber("");
      setSelectedBank("");
    },
    onError: (error) => {
      console.error("Withdrawal failed:", error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleWithdraw({
      amount: Number(amount),
      accountNumber,
      bankCode: selectedBank,
      description,
      accountName: accountData?.account_name
    });
  };

  return (
    <div className="max-w-md mx-auto container max-w-md mx-auto p-4 space-y-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Withdraw to Bank
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount (₦)</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              required
              className="w-full"
            />
          </div>

          {/* Bank Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Bank</label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {banks?.map((bank) => (
                  <SelectItem key={bank.code} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isBanksLoading && (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Loading banks...
              </div>
            )}
          </div>

          {/* Account Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Account Number</label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength={10}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => verifyAccount()}
                disabled={accountNumber.length !== 10 || !selectedBank || isVerifying}
              >
                {isVerifying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
          </div>

          {/* Account Name Display */}
          {accountData?.account_name && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Account Name:</p>
              <p className="font-medium">{accountData.account_name}</p>
            </div>
          )}

          {/* Verification Error */}
          {verificationError && (
            <div className="text-red-500 text-sm">
              Could not verify account. Please check the details.
            </div>
          )}

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description (Optional)</label>
            <Input
              type="text"
              placeholder="What's this withdrawal for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isWithdrawing || !amount || !accountData?.account_name}
          >
            {isWithdrawing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              'Withdraw Funds'
            )}
          </Button>

          
          {/* Error Message */}
          {isError && (
            <div className="text-red-500 text-sm text-center">
              {mutation.error?.response?.data?.message || "Withdrawal failed. Try again."}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="text-green-500 text-sm text-center">
              Withdrawal Initiated
            </div>
          )}
        </form>
      </CardContent>
    </div>
  );
};

export default WithdrawalForm;