"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp, Eye } from "lucide-react"

interface Transaction {
  id: number
  type: "Income" | "Payout"
  from: string
  amount: number
  commission: number
  date: string
  status: "Completed" | "Pending" | "Failed"
  description: string
}

interface HelperAccount {
  id: number
  name: string
  totalEarnings: number
  totalCommission: number
  pendingPayout: number
  lastPayout: string
  bankAccount: string
  status: "Active" | "Inactive"
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "Income",
    from: "Amara Hassan",
    amount: 5000,
    commission: 500,
    date: "2025-01-15",
    status: "Completed",
    description: "Childcare service payment",
  },
  {
    id: 2,
    type: "Payout",
    from: "Amara Hassan",
    amount: 4500,
    commission: 0,
    date: "2025-01-14",
    status: "Completed",
    description: "Monthly payout to helper",
  },
  {
    id: 3,
    type: "Income",
    from: "Fatima Ali",
    amount: 3000,
    commission: 300,
    date: "2025-01-13",
    status: "Completed",
    description: "Cleaning service payment",
  },
  {
    id: 4,
    type: "Payout",
    from: "Fatima Ali",
    amount: 2700,
    commission: 0,
    date: "2025-01-12",
    status: "Completed",
    description: "Monthly payout to helper",
  },
  {
    id: 5,
    type: "Income",
    from: "Zainab Ibrahim",
    amount: 2500,
    commission: 250,
    date: "2025-01-11",
    status: "Pending",
    description: "Cooking service payment",
  },
]

const mockHelperAccounts: HelperAccount[] = [
  {
    id: 1,
    name: "Amara Hassan",
    totalEarnings: 45000,
    totalCommission: 4500,
    pendingPayout: 5000,
    lastPayout: "2025-01-14",
    bankAccount: "****1234",
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Ali",
    totalEarnings: 32000,
    totalCommission: 3200,
    pendingPayout: 3000,
    lastPayout: "2025-01-12",
    bankAccount: "****5678",
    status: "Active",
  },
  {
    id: 3,
    name: "Zainab Ibrahim",
    totalEarnings: 18000,
    totalCommission: 1800,
    pendingPayout: 2500,
    lastPayout: "2025-01-10",
    bankAccount: "****9012",
    status: "Active",
  },
  {
    id: 4,
    name: "Leila Ahmed",
    totalEarnings: 52000,
    totalCommission: 5200,
    pendingPayout: 0,
    lastPayout: "2025-01-15",
    bankAccount: "****3456",
    status: "Active",
  },
]

export function AccountManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [helperAccounts, setHelperAccounts] = useState<HelperAccount[]>(mockHelperAccounts)
  const [selectedHelper, setSelectedHelper] = useState<HelperAccount | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "helpers">("overview")

  const totalIncome = transactions
    .filter((t) => t.type === "Income" && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalCommission = transactions
    .filter((t) => t.type === "Income" && t.status === "Completed")
    .reduce((sum, t) => sum + t.commission, 0)

  const totalPayouts = transactions
    .filter((t) => t.type === "Payout" && t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const platformBalance = totalIncome - totalPayouts

  const handlePayout = (helperId: number) => {
    setHelperAccounts(
      helperAccounts.map((h) =>
        h.id === helperId
          ? {
              ...h,
              pendingPayout: 0,
              lastPayout: new Date().toISOString().split("T")[0],
            }
          : h,
      ),
    )
    alert("Payout processed successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
        <p className="text-muted-foreground mt-1">Manage payments, commissions, and helper accounts</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(["overview", "transactions", "helpers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Platform Balance</CardTitle>
                <DollarSign className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{platformBalance.toLocaleString()} ETB</div>
                <p className="text-xs text-muted-foreground mt-1">Available funds</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Total Income</CardTitle>
                <ArrowDownLeft className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalIncome.toLocaleString()} ETB</div>
                <p className="text-xs text-muted-foreground mt-1">From all services</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Commission Earned</CardTitle>
                <TrendingUp className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalCommission.toLocaleString()} ETB</div>
                <p className="text-xs text-muted-foreground mt-1">10% from services</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">Total Payouts</CardTitle>
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalPayouts.toLocaleString()} ETB</div>
                <p className="text-xs text-muted-foreground mt-1">To helpers</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${transaction.type === "Income" ? "bg-green-100" : "bg-orange-100"}`}
                      >
                        {transaction.type === "Income" ? (
                          <ArrowDownLeft
                            className={`w-4 h-4 ${transaction.type === "Income" ? "text-green-600" : "text-orange-600"}`}
                          />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.from}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${transaction.type === "Income" ? "text-green-600" : "text-orange-600"}`}
                      >
                        {transaction.type === "Income" ? "+" : "-"}
                        {transaction.amount.toLocaleString()} ETB
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">From/To</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Commission</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "Income"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-foreground">{transaction.from}</td>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        {transaction.amount.toLocaleString()} ETB
                      </td>
                      <td className="py-3 px-4 text-foreground">{transaction.commission.toLocaleString()} ETB</td>
                      <td className="py-3 px-4 text-foreground text-xs">{transaction.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Helpers Tab */}
      {activeTab === "helpers" && (
        <div className="space-y-4">
          {helperAccounts.map((helper) => (
            <Card key={helper.id} className="bg-white shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">{helper.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {helper.status}
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedHelper(helper)}
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Earnings</p>
                    <p className="text-lg font-semibold text-foreground">{helper.totalEarnings.toLocaleString()} ETB</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Commission</p>
                    <p className="text-lg font-semibold text-foreground">
                      {helper.totalCommission.toLocaleString()} ETB
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Pending Payout</p>
                    <p className="text-lg font-semibold text-orange-600">{helper.pendingPayout.toLocaleString()} ETB</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Last Payout</p>
                    <p className="text-sm font-medium text-foreground">{helper.lastPayout}</p>
                  </div>
                </div>
                {helper.pendingPayout > 0 && (
                  <Button
                    onClick={() => handlePayout(helper.id)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Process Payout: {helper.pendingPayout.toLocaleString()} ETB
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Helper Details Modal */}
      {selectedHelper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white max-w-md w-full mx-4 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">{selectedHelper.name} - Account Details</CardTitle>
              <button
                onClick={() => setSelectedHelper(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">
                  {selectedHelper.totalEarnings.toLocaleString()} ETB
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Commission</p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedHelper.totalCommission.toLocaleString()} ETB
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pending Payout</p>
                <p className="text-lg font-semibold text-orange-600">
                  {selectedHelper.pendingPayout.toLocaleString()} ETB
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bank Account</p>
                <p className="text-sm font-mono text-foreground">{selectedHelper.bankAccount}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Payout Date</p>
                <p className="text-sm text-foreground">{selectedHelper.lastPayout}</p>
              </div>
              <div className="pt-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedHelper(null)}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Close
                </Button>
                {selectedHelper.pendingPayout > 0 && (
                  <Button
                    onClick={() => {
                      handlePayout(selectedHelper.id)
                      setSelectedHelper(null)
                    }}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Process Payout
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
