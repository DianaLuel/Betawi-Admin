"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye, CheckCircle, AlertCircle, X } from "lucide-react"

interface Household {
  id: number
  name: string
  children: number
  childrenAges: string
  totalResidents: number
  maleCount: number
  femaleCount: number
  houseType: string
  roomSize: string
  numberOfRooms: number
  houseSize: "Small" | "Medium" | "Large"
  paymentStatus: string
  verified: boolean
}

const mockHouseholds: Household[] = [
  {
    id: 1,
    name: "Ahmed Family",
    children: 2,
    childrenAges: "5, 8",
    totalResidents: 5,
    maleCount: 2,
    femaleCount: 3,
    houseType: "Condominium",
    roomSize: "3 Bedroom",
    numberOfRooms: 3,
    houseSize: "Medium",
    paymentStatus: "Paid",
    verified: true,
  },
  {
    id: 2,
    name: "Mohamed Family",
    children: 1,
    childrenAges: "3",
    totalResidents: 4,
    maleCount: 2,
    femaleCount: 2,
    houseType: "Villa",
    roomSize: "4 Bedroom",
    numberOfRooms: 4,
    houseSize: "Large",
    paymentStatus: "Pending",
    verified: true,
  },
  {
    id: 3,
    name: "Noor Family",
    children: 3,
    childrenAges: "2, 6, 10",
    totalResidents: 6,
    maleCount: 3,
    femaleCount: 3,
    houseType: "Condominium",
    roomSize: "2 Bedroom",
    numberOfRooms: 2,
    houseSize: "Small",
    paymentStatus: "Paid",
    verified: false,
  },
  {
    id: 4,
    name: "Hassan Family",
    children: 0,
    childrenAges: "N/A",
    totalResidents: 2,
    maleCount: 1,
    femaleCount: 1,
    houseType: "Villa",
    roomSize: "5 Bedroom",
    numberOfRooms: 5,
    houseSize: "Large",
    paymentStatus: "Paid",
    verified: true,
  },
]

export function HouseholdManagement() {
  const [households, setHouseholds] = useState<Household[]>(mockHouseholds)
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    children: 0,
    childrenAges: "",
    totalResidents: 0,
    maleCount: 0,
    femaleCount: 0,
    houseType: "Condominium",
    numberOfRooms: 0,
    houseSize: "Medium" as "Small" | "Medium" | "Large",
    paymentStatus: "Pending",
  })

  const handleVerify = (id: number) => {
    setHouseholds(households.map((h) => (h.id === id ? { ...h, verified: true } : h)))
  }

  const handleAddHousehold = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || formData.totalResidents === 0 || formData.numberOfRooms === 0) {
      alert("Please fill in all required fields")
      return
    }

    const newHousehold: Household = {
      id: Math.max(...households.map((h) => h.id), 0) + 1,
      name: formData.name,
      children: formData.children,
      childrenAges: formData.childrenAges,
      totalResidents: formData.totalResidents,
      maleCount: formData.maleCount,
      femaleCount: formData.femaleCount,
      houseType: formData.houseType,
      roomSize: `${formData.numberOfRooms} Bedroom`,
      numberOfRooms: formData.numberOfRooms,
      houseSize: formData.houseSize,
      paymentStatus: formData.paymentStatus,
      verified: false,
    }

    setHouseholds([...households, newHousehold])
    setFormData({
      name: "",
      children: 0,
      childrenAges: "",
      totalResidents: 0,
      maleCount: 0,
      femaleCount: 0,
      houseType: "Condominium",
      numberOfRooms: 0,
      houseSize: "Medium",
      paymentStatus: "Pending",
    })
    setIsModalOpen(false)
  }

  const getPaymentStatusColor = (status: string) => {
    return status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Household Management</h1>
          <p className="text-muted-foreground mt-1">Manage and verify household information</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Household
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">All Households</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Household Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Children</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Total Residents</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">House Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Rooms</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Payment</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {households.map((household) => (
                  <tr key={household.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{household.name}</td>
                    <td className="py-3 px-4 text-foreground">
                      {household.children > 0 ? `${household.children} (${household.childrenAges})` : "None"}
                    </td>
                    <td className="py-3 px-4 text-foreground">
                      <div className="text-xs">
                        <div>{household.totalResidents} total</div>
                        <div className="text-muted-foreground">
                          M: {household.maleCount}, F: {household.femaleCount}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                        {household.houseType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground text-xs font-medium">{household.numberOfRooms}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {household.houseSize}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(household.paymentStatus)}`}
                      >
                        {household.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {household.verified ? (
                        <span className="flex items-center gap-1 text-primary text-xs font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium">
                          <AlertCircle className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedHousehold(household)}
                          className="text-primary hover:bg-secondary"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!household.verified && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerify(household.id)}
                            className="text-primary hover:bg-secondary"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Household Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border sticky top-0 bg-white">
              <CardTitle className="text-foreground">Add New Household</CardTitle>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddHousehold} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Household Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Ahmed Family"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Children</label>
                    <input
                      type="number"
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: Number.parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Children Ages</label>
                    <input
                      type="text"
                      value={formData.childrenAges}
                      onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                      placeholder="e.g., 5, 8"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Total Residents *</label>
                    <input
                      type="number"
                      value={formData.totalResidents}
                      onChange={(e) =>
                        setFormData({ ...formData, totalResidents: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Male Count</label>
                    <input
                      type="number"
                      value={formData.maleCount}
                      onChange={(e) => setFormData({ ...formData, maleCount: Number.parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Female Count</label>
                  <input
                    type="number"
                    value={formData.femaleCount}
                    onChange={(e) => setFormData({ ...formData, femaleCount: Number.parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">House Type</label>
                  <select
                    value={formData.houseType}
                    onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option>Condominium</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>House</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Number of Rooms *</label>
                    <input
                      type="number"
                      value={formData.numberOfRooms}
                      onChange={(e) =>
                        setFormData({ ...formData, numberOfRooms: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">House Size *</label>
                    <select
                      value={formData.houseSize}
                      onChange={(e) =>
                        setFormData({ ...formData, houseSize: e.target.value as "Small" | "Medium" | "Large" })
                      }
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    >
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Payment Status</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                  </select>
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
                    Add Household
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Details Modal */}
      {selectedHousehold && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-2xl w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">{selectedHousehold.name} - Details</CardTitle>
              <button
                onClick={() => setSelectedHousehold(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Family Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Children</p>
                      <p className="text-foreground font-medium">
                        {selectedHousehold.children > 0
                          ? `${selectedHousehold.children} (Ages: ${selectedHousehold.childrenAges})`
                          : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Residents</p>
                      <p className="text-foreground font-medium">{selectedHousehold.totalResidents}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gender Distribution</p>
                      <p className="text-foreground font-medium">
                        Male: {selectedHousehold.maleCount}, Female: {selectedHousehold.femaleCount}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">House Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">House Type</p>
                      <p className="text-foreground font-medium">{selectedHousehold.houseType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Room Size</p>
                      <p className="text-foreground font-medium">{selectedHousehold.roomSize}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Number of Rooms</p>
                      <p className="text-foreground font-medium">{selectedHousehold.numberOfRooms}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">House Size</p>
                      <p className="text-foreground font-medium">{selectedHousehold.houseSize}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Status</p>
                      <p
                        className={`font-medium ${selectedHousehold.paymentStatus === "Paid" ? "text-green-600" : "text-yellow-600"}`}
                      >
                        {selectedHousehold.paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedHousehold(null)}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
