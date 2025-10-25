"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, DollarSign, CheckCircle, X, Eye } from "lucide-react"

interface Contract {
  id: number
  helper: string
  household: string
  serviceType: string
  startDate: string
  endDate: string
  monthlyRate: number
  status: "Active" | "Completed" | "Pending"
  terms: string
  paymentSchedule: string
}

const mockContracts: Contract[] = [
  {
    id: 1,
    helper: "Amara Hassan",
    household: "Ahmed Family",
    serviceType: "Childcare",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    monthlyRate: 3000,
    status: "Active",
    terms: "Full-time childcare, 5 days a week, 8 hours per day",
    paymentSchedule: "Monthly, due on the 1st of each month",
  },
  {
    id: 2,
    helper: "Fatima Ali",
    household: "Mohamed Family",
    serviceType: "Cleaning",
    startDate: "2025-01-10",
    endDate: "2025-12-31",
    monthlyRate: 1500,
    status: "Active",
    terms: "Weekly cleaning service, 3 hours per session",
    paymentSchedule: "Monthly, due on the 5th of each month",
  },
  {
    id: 3,
    helper: "Zainab Ibrahim",
    household: "Noor Family",
    serviceType: "Cooking",
    startDate: "2024-12-01",
    endDate: "2025-01-31",
    monthlyRate: 2000,
    status: "Completed",
    terms: "Daily meal preparation, lunch and dinner",
    paymentSchedule: "Monthly, due on the 10th of each month",
  },
  {
    id: 4,
    helper: "Leila Ahmed",
    household: "Hassan Family",
    serviceType: "Nanny",
    startDate: "2025-02-01",
    endDate: "2025-08-01",
    monthlyRate: 4000,
    status: "Pending",
    terms: "Full-time nanny, 6 days a week, includes meal preparation",
    paymentSchedule: "Monthly, due on the 1st of each month",
  },
]

export function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Completed" | "Pending">("All")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      case "Pending":
        return <Calendar className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const filteredContracts = filterStatus === "All" ? contracts : contracts.filter((c) => c.status === filterStatus)

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
    return `${months} months`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contract Management</h1>
          <p className="text-muted-foreground mt-1">Manage contracts between helpers and households</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Contract
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Active", "Completed", "Pending"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? "bg-primary text-primary-foreground"
                : "bg-white text-foreground border border-border hover:bg-secondary"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-foreground text-lg">{contract.serviceType}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{contract.helper}</p>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}
                >
                  {getStatusIcon(contract.status)}
                  {contract.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Household</p>
                  <p className="font-semibold text-foreground">{contract.household}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold text-foreground">
                    {calculateDuration(contract.startDate, contract.endDate)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium text-foreground">{contract.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium text-foreground">{contract.endDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-secondary p-3 rounded-lg">
                <DollarSign className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Rate</p>
                  <p className="text-lg font-bold text-foreground">{contract.monthlyRate} ETB</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Terms</p>
                <p className="text-sm text-foreground line-clamp-2">{contract.terms}</p>
              </div>

              <Button
                onClick={() => setSelectedContract(contract)}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-secondary"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border sticky top-0 bg-white">
              <CardTitle className="text-foreground">Contract Details</CardTitle>
              <button onClick={() => setSelectedContract(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Parties */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">HELPER</p>
                  <p className="text-lg font-bold text-foreground">{selectedContract.helper}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">HOUSEHOLD</p>
                  <p className="text-lg font-bold text-foreground">{selectedContract.household}</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2 font-semibold">SERVICE TYPE</p>
                <p className="text-lg font-bold text-foreground mb-4">{selectedContract.serviceType}</p>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">TERMS</p>
                <p className="text-foreground">{selectedContract.terms}</p>
              </div>

              <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">
                    🧾 CONTRACT 1: ADMIN–HELPER AGREEMENT
                  </p>
                  <div className="text-xs text-foreground space-y-2 bg-white p-3 rounded">
                    <p>
                      <strong>Parties:</strong> HomeHelp Admin ("the Company") and {selectedContract.helper} ("the
                      Helper")
                    </p>
                    <p>
                      <strong>Purpose:</strong> The Helper agrees to provide household services to clients assigned
                      through the HomeHelp platform.
                    </p>
                    <p>
                      <strong>Terms:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-2">
                      <li>The Helper must perform duties responsibly, respectfully, and on time.</li>
                      <li>The Admin will connect the Helper with households seeking services.</li>
                      <li>
                        The Helper agrees to send their monthly salary and commission share to the Admin account as per
                        platform policy before receiving final payment.
                      </li>
                      <li>The Admin ensures fair distribution of payments and transparent communication.</li>
                      <li>Either party may terminate this agreement with written notice.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">
                    🏠 CONTRACT 2: ADMIN–HOUSEHOLD AGREEMENT
                  </p>
                  <div className="text-xs text-foreground space-y-2 bg-white p-3 rounded">
                    <p>
                      <strong>Parties:</strong> HomeHelp Admin ("the Company") and {selectedContract.household} ("the
                      Client")
                    </p>
                    <p>
                      <strong>Purpose:</strong> The Admin agrees to provide access to verified helpers through the
                      HomeHelp platform.
                    </p>
                    <p>
                      <strong>Terms:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-2">
                      <li>The Household agrees to treat helpers fairly and provide a safe work environment.</li>
                      <li>The Admin facilitates matching, communication, and contract management.</li>
                      <li>Payments must be made through the platform for transparency and record-keeping.</li>
                      <li>The Admin is not liable for damages caused by misuse of the service.</li>
                      <li>Either party may terminate this agreement upon notice.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contract Period */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">START DATE</p>
                  <p className="text-lg font-bold text-foreground">{selectedContract.startDate}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">END DATE</p>
                  <p className="text-lg font-bold text-foreground">{selectedContract.endDate}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-xs text-muted-foreground mb-2 font-semibold">DURATION</p>
                  <p className="text-lg font-bold text-foreground">
                    {calculateDuration(selectedContract.startDate, selectedContract.endDate)}
                  </p>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-xs text-muted-foreground mb-2 font-semibold">PAYMENT SUMMARY</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground">Monthly Rate:</span>
                    <span className="font-bold text-foreground">{selectedContract.monthlyRate} ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Duration:</span>
                    <span className="font-bold text-foreground">
                      {calculateDuration(selectedContract.startDate, selectedContract.endDate)}
                    </span>
                  </div>
                  <div className="border-t border-green-200 pt-2 flex justify-between">
                    <span className="text-foreground font-semibold">Total Contract Value:</span>
                    <span className="font-bold text-lg text-green-700">
                      {selectedContract.monthlyRate *
                        Math.round(
                          (new Date(selectedContract.endDate).getTime() -
                            new Date(selectedContract.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 30),
                        )}{" "}
                      ETB
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold">PAYMENT SCHEDULE</p>
                <p className="text-foreground bg-secondary p-3 rounded-lg">{selectedContract.paymentSchedule}</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 bg-secondary p-4 rounded-lg">
                {getStatusIcon(selectedContract.status)}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CONTRACT STATUS</p>
                  <p className="text-lg font-bold text-foreground">{selectedContract.status}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedContract(null)}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Close
                </Button>
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* New Contract Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">Create New Contract</CardTitle>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Helper</label>
                  <input
                    type="text"
                    placeholder="Select helper"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Household</label>
                  <input
                    type="text"
                    placeholder="Select household"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Service Type</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    <option>Childcare</option>
                    <option>Cleaning</option>
                    <option>Cooking</option>
                    <option>Laundry</option>
                    <option>Nanny</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Monthly Rate (ETB)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border-border text-foreground hover:bg-secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Create Contract
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
