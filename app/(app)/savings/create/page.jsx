"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import API from '@/api';

export default function CreateSavings() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    type: 'FIXED',
    targetAmount: '',
    maturityDate: '',
    autoSave: false,
    autoSaveAmount: '0',
    frequencyType: 'DAILY',
    categoryId: '4004d40f-3549-4b4e-801d-99087014025c' // make sure to make this dynamic later on
  });

  const createSavingsMutation = useMutation({
    mutationFn: (data) => {
      return API.post('/savings/create', {
        userId: localStorage.getItem('userId'),
        ...data,
        targetAmount: parseFloat(data.targetAmount),
        autoSaveAmount: parseFloat(data.autoSaveAmount)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Active savings plans']);
      router.push('/savings');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createSavingsMutation.mutate(formData);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate minimum date (today) and format it
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Savings Plan</CardTitle>
          <CardDescription>
            Set up a new savings goal with optional auto-save features
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Savings Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., New Laptop"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Savings Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed</SelectItem>
                    <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount (₦)</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="Enter target amount"
                  value={formData.targetAmount}
                  onChange={(e) => handleChange('targetAmount', e.target.value)}
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maturityDate">Maturity Date</Label>
                <Input
                  id="maturityDate"
                  type="date"
                  value={formData.maturityDate}
                  onChange={(e) => handleChange('maturityDate', e.target.value)}
                  required
                  min={today}
                />
              </div>
            </div>

            {/* Auto-Save Settings */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSave">Enable Auto-Save</Label>
                <Switch
                  id="autoSave"
                  checked={formData.autoSave}
                  onCheckedChange={(checked) => handleChange('autoSave', checked)}
                />
              </div>

              {formData.autoSave && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="autoSaveAmount">Auto-Save Amount (₦)</Label>
                    <Input
                      id="autoSaveAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.autoSaveAmount}
                      onChange={(e) => handleChange('autoSaveAmount', e.target.value)}
                      min="0"
                      required={formData.autoSave}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequencyType">Frequency</Label>
                    <Select
                      value={formData.frequencyType}
                      onValueChange={(value) => handleChange('frequencyType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAILY">Daily</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </CardContent>
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
              disabled={createSavingsMutation.isPending}
            >
              {createSavingsMutation.isPending ? 'Creating...' : 'Create Savings Plan'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}