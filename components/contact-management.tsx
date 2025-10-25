"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Phone, Mail, MapPin } from "lucide-react"

interface Contact {
  id: number
  name: string
  type: "Helper" | "Household"
  phone: string
  email: string
  address: string
  city: string
  emergencyContact?: string
  emergencyPhone?: string
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Amara Hassan",
    type: "Helper",
    phone: "+251911234567",
    email: "amara@betawi.com",
    address: "Bole, Addis Ababa",
    city: "Addis Ababa",
    emergencyContact: "Fatima Hassan",
    emergencyPhone: "+251911234568",
  },
  {
    id: 2,
    name: "Ahmed Family",
    type: "Household",
    phone: "+251922345678",
    email: "ahmed.family@email.com",
    address: "Kazanchis, Addis Ababa",
    city: "Addis Ababa",
  },
  {
    id: 3,
    name: "Fatima Ali",
    type: "Helper",
    phone: "+251933456789",
    email: "fatima@betawi.com",
    address: "Nifas Silk, Addis Ababa",
    city: "Addis Ababa",
    emergencyContact: "Ali Ahmed",
    emergencyPhone: "+251933456790",
  },
  {
    id: 4,
    name: "Mohamed Family",
    type: "Household",
    phone: "+251944567890",
    email: "mohamed.family@email.com",
    address: "Bole Medhanealem, Addis Ababa",
    city: "Addis Ababa",
  },
]

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [filterType, setFilterType] = useState<"All" | "Helper" | "Household">("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "Helper" as "Helper" | "Household",
    phone: "",
    email: "",
    address: "",
    city: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in required fields")
      return
    }

    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? {
                ...editingContact,
                ...formData,
              }
            : c,
        ),
      )
      setEditingContact(null)
    } else {
      const newContact: Contact = {
        ...formData,
        id: Math.max(...contacts.map((c) => c.id), 0) + 1,
      }
      setContacts([...contacts, newContact])
    }

    setFormData({
      name: "",
      type: "Helper",
      phone: "",
      email: "",
      address: "",
      city: "",
      emergencyContact: "",
      emergencyPhone: "",
    })
    setIsModalOpen(false)
  }

  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const filteredContacts = filterType === "All" ? contacts : contacts.filter((c) => c.type === filterType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground mt-1">Manage contacts for helpers and households</p>
        </div>
        <Button
          onClick={() => {
            setEditingContact(null)
            setFormData({
              name: "",
              type: "Helper",
              phone: "",
              email: "",
              address: "",
              city: "",
              emergencyContact: "",
              emergencyPhone: "",
            })
            setIsModalOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Helper", "Household"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === type
                ? "bg-primary text-primary-foreground"
                : "bg-white text-foreground border border-border hover:bg-secondary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-foreground">{contact.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        contact.type === "Helper"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {contact.type}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingContact(contact)
                      setFormData({
                        name: contact.name,
                        type: contact.type,
                        phone: contact.phone,
                        email: contact.email,
                        address: contact.address,
                        city: contact.city,
                        emergencyContact: contact.emergencyContact || "",
                        emergencyPhone: contact.emergencyPhone || "",
                      })
                      setIsModalOpen(true)
                    }}
                    className="text-primary hover:bg-secondary"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="text-destructive hover:bg-secondary"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-foreground">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-foreground truncate">{contact.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-foreground">
                  <p>{contact.address}</p>
                  <p className="text-xs text-muted-foreground">{contact.city}</p>
                </div>
              </div>

              {contact.emergencyContact && (
                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">Emergency Contact</p>
                  <p className="text-sm text-foreground">{contact.emergencyContact}</p>
                  <p className="text-sm text-foreground">{contact.emergencyPhone}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-white max-w-md w-full mx-4 shadow-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">{editingContact ? "Edit Contact" : "Add New Contact"}</CardTitle>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "Helper" | "Household" })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option>Helper</option>
                    <option>Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>

                {formData.type === "Helper" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Emergency Contact Phone</label>
                      <input
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      />
                    </div>
                  </>
                )}

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
                    {editingContact ? "Update" : "Add"} Contact
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
