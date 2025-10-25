"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { DashboardOverview } from "./dashboard-overview"
import { HelperManagement } from "./helper-management"
import { HouseholdManagement } from "./household-management"
import { BookingManagement } from "./booking-management"
import { CommunicationMonitoring } from "./communication-monitoring"
import { FeedbackRatings } from "./feedback-ratings"
import { ReportsAnalytics } from "./reports-analytics"
import { ContactManagement } from "./contact-management"
import { AccountManagement } from "./account-management"
import { ContractManagement } from "./contract-management"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6 md:p-8">
            {currentPage === "dashboard" && <DashboardOverview />}
            {currentPage === "helpers" && <HelperManagement />}
            {currentPage === "households" && <HouseholdManagement />}
            {currentPage === "bookings" && <BookingManagement />}
            {currentPage === "communication" && <CommunicationMonitoring />}
            {currentPage === "contacts" && <ContactManagement />}
            {currentPage === "contracts" && <ContractManagement />}
            {currentPage === "feedback" && <FeedbackRatings />}
            {currentPage === "reports" && <ReportsAnalytics />}
            {currentPage === "accounts" && <AccountManagement />}
          </div>
        </main>
      </div>
    </div>
  )
}
