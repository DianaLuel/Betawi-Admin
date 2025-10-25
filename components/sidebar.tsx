"use client"

import {
  Home,
  Users,
  Building2,
  Calendar,
  MessageSquare,
  Star,
  BarChart3,
  Phone,
  CreditCard,
  FileText,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ isOpen, currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "helpers", label: "Helpers", icon: Users },
    { id: "households", label: "Households", icon: Building2 },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "contacts", label: "Contacts", icon: Phone },
    { id: "contracts", label: "Contracts", icon: FileText },
    { id: "accounts", label: "Accounts", icon: CreditCard },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ]

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-border transition-all duration-300 flex flex-col shadow-sm`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center justify-center">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="/logo.webp" alt="Betawi Logo" className="w-full h-full object-contain" />
        </div>
        {isOpen && <span className="ml-3 font-bold text-lg text-primary">Betawi</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border text-center text-xs text-muted-foreground">
        {isOpen && <p>© 2025 Betawi</p>}
      </div>
    </aside>
  )
}
