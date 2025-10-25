"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle, Users, Edit2 } from "lucide-react"

const bookingTrendsData = [
  { month: "Jan", bookings: 40, completed: 35, pending: 5 },
  { month: "Feb", bookings: 65, completed: 58, pending: 7 },
  { month: "Mar", bookings: 55, completed: 50, pending: 5 },
  { month: "Apr", bookings: 85, completed: 78, pending: 7 },
  { month: "May", bookings: 95, completed: 88, pending: 7 },
  { month: "Jun", bookings: 110, completed: 102, pending: 8 },
]

const topHelpersData = [
  { name: "Amara Hassan", bookings: 24 },
  { name: "Fatima Ali", bookings: 21 },
  { name: "Zainab Ibrahim", bookings: 18 },
  { name: "Leila Ahmed", bookings: 16 },
  { name: "Others", bookings: 21 },
]

const safetyMetricsData = [
  { name: "Resolved", value: 45, color: "#009688" },
  { name: "Pending", value: 12, color: "#FFECE0" },
  { name: "Escalated", value: 3, color: "#ef4444" },
]

const serviceTypeData = [
  { name: "Childcare", value: 35 },
  { name: "Cleaning", value: 25 },
  { name: "Cooking", value: 20 },
  { name: "Nanny", value: 15 },
  { name: "Other", value: 5 },
]

export function ReportsAnalytics() {
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          variant={isEditMode ? "default" : "outline"}
          className={isEditMode ? "bg-primary text-primary-foreground" : ""}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          {isEditMode ? "Done Editing" : "Edit Reports"}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Bookings</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">450</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Completion Rate</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">411 completed bookings</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Helpers</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">248</div>
            <p className="text-xs text-muted-foreground mt-1">+18 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Complaints</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1">3 pending resolution</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="bookings" stroke="#009688" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Type Distribution */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Service Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#009688" />
                  <Cell fill="#FFECE0" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Helpers */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Top Helpers by Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topHelpersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="bookings" fill="#009688" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Safety Metrics */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Safety Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={safetyMetricsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {safetyMetricsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Month</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Total Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Pending</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {bookingTrendsData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-foreground font-medium">{row.month}</td>
                    <td className="py-3 px-4 text-foreground">{row.bookings}</td>
                    <td className="py-3 px-4 text-foreground">{row.completed}</td>
                    <td className="py-3 px-4 text-foreground">{row.pending}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {((row.completed / row.bookings) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
