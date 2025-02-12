"use client"

import { useState } from 'react';
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import API from '@/api';


export default function DepositToSavings() {
    const router = useRouter();
 const params = useParams()
  const { id } = params
  const [amount, setAmount] = useState('');
  const queryClient = useQueryClient();

  const depositMutation = useMutation({
    mutationFn: (data) => {
      return API.post('/savings/deposit', {
        userId: localStorage.getItem('userId'),
        savingsId: id,
        amount: parseFloat(data.amount)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Active savings plans']);
      router.push('/savings');
    },
    onError:(error)=>{
        console.log(error)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    depositMutation.mutate({ amount });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Deposit to Savings</h2>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₦)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                min="1"
                step="0.01"
              />
            </div>
          </CardContent>

                {/* Error Message */}
          {depositMutation.isError && (
            <div className="text-red-500 text-sm text-center">
              {depositMutation.error?.response?.data?.message || "Funding your savings plan failed. Try again."}
            </div>
          )}

          {/* Success Message */}
          {depositMutation.isSuccess && (
            <div className="text-green-500 text-sm text-center">
              Deposit to Savings Plan Completed successfully!
            </div>
          )}

          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={depositMutation.isPending}
            >
              {depositMutation.isPending ? 'Processing...' : 'Deposit'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}