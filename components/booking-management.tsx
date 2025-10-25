"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, Clock, MapPin, MessageSquare, X } from "lucide-react"

interface Booking {
  id: number
  household: string
  helper: string
  serviceType: string
  startDate: string
  endDate: string
  status: "Pending" | "Approved" | "Completed"
  location: string
}

const mockBookings: Booking[] = [
  {
    id: 1,
    household: "Ahmed Family",
    helper: "Amara Hassan",
    serviceType: "Childcare",
    startDate: "2025-01-15",
    endDate: "2025-01-20",
    status: "Approved",
    location: "Addis Ababa",
  },
  {
    id: 2,
    household: "Mohamed Family",
    helper: "Fatima Ali",
    serviceType: "Cleaning",
    startDate: "2025-01-10",
    endDate: "2025-01-10",
    status: "Completed",
    location: "Addis Ababa",
  },
  {
    id: 3,
    household: "Noor Family",
    helper: "Zainab Ibrahim",
    serviceType: "Cooking",
    startDate: "2025-01-18",
    endDate: "2025-01-25",
    status: "Pending",
    location: "Addis Ababa",
  },
  {
    id: 4,
    household: "Hassan Family",
    helper: "Leila Ahmed",
    serviceType: "Nanny",
    startDate: "2025-01-20",
    endDate: "2025-02-20",
    status: "Approved",
    location: "Addis Ababa",
  },
  {
    id: 5,
    household: "Ahmed Family",
    helper: "Fatima Ali",
    serviceType: "Laundry",
    startDate: "2025-01-12",
    endDate: "2025-01-12",
    status: "Completed",
    location: "Addis Ababa",
  },
]

export function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Approved" | "Completed">("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [formData, setFormData] = useState({
    household: "",
    helper: "",
    serviceType: "Childcare",
    startDate: "",
    endDate: "",
    location: "",
  })

  const handleApprove = (id: number) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: "Approved" as const } : b)))
  }

  const handleComplete = (id: number) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: "Completed" as const } : b)))
  }

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.household || !formData.helper || !formData.startDate || !formData.endDate) {
      alert("Please fill in all fields")
      return
    }

    const newBooking: Booking = {
      id: Math.max(...bookings.map((b) => b.id), 0) + 1,
      household: formData.household,
      helper: formData.helper,
      serviceType: formData.serviceType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "Pending",
      location: formData.location,
    }

    setBookings([...bookings, newBooking])
    setFormData({
      household: "",
      helper: "",
      serviceType: "Childcare",
      startDate: "",
      endDate: "",
      location: "",
    })
    setIsModalOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = filterStatus === "All" ? bookings : bookings.filter((b) => b.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage all service bookings</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Pending", "Approved", "Completed"] as const).map((status) => (
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

      {/* Bookings Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">
            {filterStatus === "All" ? "All Bookings" : `${filterStatus} Bookings`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Household</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Helper</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Service Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Dates</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{booking.household}</td>
                    <td className="py-3 px-4 text-foreground">{booking.helper}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground text-xs">
                      <div>{booking.startDate}</div>
                      <div className="text-muted-foreground">to {booking.endDate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-foreground text-xs">
                        <MapPin className="w-3 h-3" />
                        {booking.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {booking.status === "Pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(booking.id)}
                            className="text-primary hover:bg-secondary text-xs"
                          >
                            Approve
                          </Button>
                        )}
                        {booking.status === "Approved" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleComplete(booking.id)}
                            className="text-primary hover:bg-secondary text-xs"
                          >
                            Complete
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking)
                            setIsChatOpen(true)
                          }}
                          className="text-primary hover:bg-secondary text-xs"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pending Bookings</CardTitle>
            <Clock className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {bookings.filter((b) => b.status === "Pending").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Approved Bookings</CardTitle>
            <CheckCircle className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {bookings.filter((b) => b.status === "Approved").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Completed Bookings</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {bookings.filter((b) => b.status === "Completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">Create New Booking</CardTitle>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Household</label>
                  <input
                    type="text"
                    value={formData.household}
                    onChange={(e) => setFormData({ ...formData, household: e.target.value })}
                    placeholder="Select household"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Helper</label>
                  <input
                    type="text"
                    value={formData.helper}
                    onChange={(e) => setFormData({ ...formData, helper: e.target.value })}
                    placeholder="Select helper"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Service Type</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
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
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Addis Ababa"
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
                    Create Booking
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-lg h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground text-sm">
                Chat: {selectedBooking.household} & {selectedBooking.helper}
              </CardTitle>
              <button
                onClick={() => {
                  setIsChatOpen(false)
                  setSelectedBooking(null)
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto py-4 space-y-3">
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg max-w-xs">
                  <p className="text-sm">
                    {selectedBooking.helper}: I'm ready for the booking on {selectedBooking.startDate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-xs">
                  <p className="text-sm">{selectedBooking.household}: Great! See you then.</p>
                  <p className="text-xs text-primary-foreground/80 mt-1">10:35 AM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg max-w-xs">
                  <p className="text-sm">{selectedBooking.helper}: What should I bring?</p>
                  <p className="text-xs text-muted-foreground mt-1">10:40 AM</p>
                </div>
              </div>
            </CardContent>
            <div className="border-t border-border p-4 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Send</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
