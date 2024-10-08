"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

const categories = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "healthcare", label: "Healthcare" },
  { value: "shopping", label: "Shopping" },
  { value: "housing", label: "Housing" },
  { value: "income", label: "Income" },
  { value: "other", label: "Other" },
];

export default function TransactionsPage() {
  const { toast } = useToast();
  const { user, isLoaded, isSignedIn } = useUser();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAddTransaction = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      setError("You must be logged in to add a transaction.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!category) {
      setError("Please select a category.");
      setLoading(false);
      return;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    if (!description) {
      setError("Please enter a description.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          amount: parseFloat(amount),
          description,
          type,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      // const newTransaction = await response.json();

      setSuccess(true);
      toast({
        title: "Success",
        description: "Transaction added successfully!",
      });

      setAmount("");
      setDescription("");
      setType("expense");
      setCategory("");
      router.refresh(); // Refresh the page to update any server components
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    amount,
    category,
    description,
    isLoaded,
    isSignedIn,
    router,
    toast,
    type,
    user,
  ]);

  const MotionCard = useMemo(() => motion(Card), []);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add Transaction
      </motion.h1>

      <MotionCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900"
      >
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>
            Enter the details of your new transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert variant="destructive">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert>
                  <CheckCircledIcon className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Transaction added successfully! Check the dashboard to see
                    your updated financial summary.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Type</Label>
              <RadioGroup
                defaultValue="expense"
                onValueChange={(value) =>
                  setType(value as "income" | "expense")
                }
                className="flex space-x-4 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense">Expense</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income">Income</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddTransaction}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Adding..." : "Add Transaction"}
            </Button>
          </div>
        </CardContent>
      </MotionCard>
    </div>
  );
}
