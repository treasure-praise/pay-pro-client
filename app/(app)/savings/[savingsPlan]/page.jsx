"use client"

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { ArrowLeftIcon, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import API from "@/api";
import Link from "next/link";

const SavingsTransactions = () => {
    const params = useParams()
    const { savingsPlan } = params 

    console.log(savingsPlan);
    

  const fetchTransactions = async () => {
    const { data } = await API.get(`/savings/${savingsPlan}/transactions`);
    console.log(data);
    
    return data.data;
  };

  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ["savings-transactions", savingsPlan],
    queryFn: fetchTransactions,
    enabled: !!savingsPlan,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount, type) => {
    const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${type === 'CREDIT' ? '+' : '-'}₦ ${formattedAmount}`;
  };

  if (isLoading) {
    return (
    <SkeletonLoader/>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading transactions. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className=" container max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <Link href="/savings">
          <Button variant="ghost" className="mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Savings
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>

    
      <div className="space-y-4">
        {transactions?.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'CREDIT' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {transaction.type === 'CREDIT' ? (
                      <ArrowUpCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.description.length > 30
                        ? `${transaction.description.substring(0, 30)}...`
                        : transaction.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatAmount(transaction.amount, transaction.type)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transactions found for this savings plan.
          </div>
        )}
      </div>
      {transactions?.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500 mb-2">Summary</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Total Credits</div>
              <div className="font-semibold text-green-600">
                ₦ {transactions
                  .filter(t => t.type === 'CREDIT')
                  .reduce((sum, t) => sum + parseFloat(t.amount), 0)
                  .toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Transactions</div>
              <div className="font-semibold">{transactions.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsTransactions;


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