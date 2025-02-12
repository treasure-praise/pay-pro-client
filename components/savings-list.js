"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Calendar, Target, Percent, MoreVertical } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import API from "@/api";
import CountUp from "react-countup";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const SavingsList = ({ setTotalSavings }) => {
  const router = useRouter()
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const fetchSavingsPlans = async () => {
    if (!userId) throw new Error("User ID not found");
    const { data } = await API.get(`/savings/user/${userId}`);
    return data.data;
  };
  
 

  const { data: savingsPlansData, isLoading, isError } = useQuery({
    queryKey: ["Active savings plans", userId],
    queryFn: fetchSavingsPlans,
    enabled: !!userId,
  });

  const handleDeposit = (e, savingsId) => {
    e.preventDefault();
    router.push(`/savings/deposit/${savingsId}`);
  };

  const handleWithdraw = (e, savingsId) => {
    e.preventDefault();
    router.push(`/savings/withdraw/${savingsId}`);
  };

  

  const handleDeleteSavingsPlan = (e, savingsId) => {
    e.preventDefault();
    // Add your delete logic here
    console.log('Delete savings', savingsId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateProgress = (current, target) => {
    return (parseFloat(current) / parseFloat(target)) * 100;
  };

  useEffect(() => {
    if (savingsPlansData) {
      const total = savingsPlansData.reduce((sum, savings) => sum + parseFloat(savings.currentBalance), 0);
      setTotalSavings(total);
    }
  }, [savingsPlansData, setTotalSavings]);

  if (isLoading) return (
    <SavingsListSkeleton/>
  );

  if (isError) return (
    <div className="p-8 text-center">
      <p className="text-red-500">Error fetching savings plans. Please try again later.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Savings</h2>
      <div className="space-y-4">
        {savingsPlansData?.length > 0 ? (
          savingsPlansData.map((savings) => (
            <Link href={`/savings/${savings.id}`} key={savings.id} className="block">
              <Button
                variant="outline"
                className="w-full justify-between h-auto p-4 hover:bg-gray-50"
              >
                <div className="flex flex-col w-full gap-3">
                  {/* Header section */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-50">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{savings.name}</div>
                        <div className="text-xs text-gray-500">
                          {savings.type} SAVINGS
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-purple-600">
                          <CountUp
                            start={0}
                            end={parseFloat(savings.currentBalance)}
                            duration={2}
                            separator=","
                            decimals={2}
                            prefix="₦ "
                          />
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: ₦ {parseInt(savings.targetAmount).toLocaleString()}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={(e) => handleDeposit(e, savings.id)}>
      Deposit to Savings
    </DropdownMenuItem>
    <DropdownMenuItem onClick={(e) => handleWithdraw(e, savings.id)}>
      Withdraw from Savings
    </DropdownMenuItem>
  </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          calculateProgress(savings.currentBalance, savings.targetAmount),
                          100
                        )}%`
                      }}
                    />
                  </div>

                  {/* Details section */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Start: {formatDate(savings.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Matures: {formatDate(savings.maturityDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Percent className="h-3 w-3" />
                      <span>{savings.interestRate}% Interest</span>
                    </div>
                  </div>

                  {/* Auto-save information */}
                  {savings.autoSave && (
                    <div className="text-xs text-gray-500 mt-1">
                      Auto-save: ₦ {parseInt(savings.autoSaveAmount).toLocaleString()} {savings.frequencyType.toLowerCase()}
                    </div>
                  )}
                </div>
              </Button>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No active savings plans found.</p>
        )}
      </div>
    </div>
  );
};

export default SavingsList;


const SavingsListSkeleton = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Savings</h2>
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="block w-full">
            <Button
              variant="outline"
              className="w-full justify-between h-auto p-4 hover:bg-gray-50"
            >
              <div className="flex flex-col w-full gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="text-left">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24 mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-3 w-28 mt-1" />
                    </div>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <Skeleton className="w-full h-2 rounded-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
