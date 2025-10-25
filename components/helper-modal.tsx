"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface HelperData {
  name: string
  age: number
  type: string
  medicalInfo: string
  strengths: string
  weaknesses: string
  fayda_id: string
  kebele_id: string
  picture?: string
}

interface HelperModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: HelperData) => void
  initialData?: (HelperData & { id: number; verified: boolean }) | null
}

export function HelperModal({ isOpen, onClose, onSubmit, initialData }: HelperModalProps) {
  const [formData, setFormData] = useState<HelperData>({
    name: "",
    age: 0,
    type: "Live-in",
    medicalInfo: "",
    strengths: "",
    weaknesses: "",
    fayda_id: "",
    kebele_id: "",
    picture: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        age: initialData.age,
        type: initialData.type,
        medicalInfo: initialData.medicalInfo,
        strengths: initialData.strengths,
        weaknesses: initialData.weaknesses,
        fayda_id: initialData.fayda_id,
        kebele_id: initialData.kebele_id,
        picture: initialData.picture,
      })
    } else {
      setFormData({
        name: "",
        age: 0,
        type: "Live-in",
        medicalInfo: "",
        strengths: "",
        weaknesses: "",
        fayda_id: "",
        kebele_id: "",
        picture: "",
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{initialData ? "Edit Helper" : "Add New Helper"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Profile Picture</label>
            <div className="flex items-center gap-3">
              {formData.picture && (
                <img
                  src={formData.picture || "/placeholder.svg"}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <input
                  type="text"
                  name="picture"
                  value={formData.picture || ""}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option>Live-in</option>
                <option>Nanny</option>
                <option>On-demand</option>
                <option>Part-time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Medical Info</label>
            <input
              type="text"
              name="medicalInfo"
              value={formData.medicalInfo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Strengths</label>
            <textarea
              name="strengths"
              value={formData.strengths}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Weaknesses</label>
            <textarea
              name="weaknesses"
              value={formData.weaknesses}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Fayda ID</label>
              <input
                type="text"
                name="fayda_id"
                value={formData.fayda_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Kebele ID</label>
              <input
                type="text"
                name="kebele_id"
                value={formData.kebele_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              {initialData ? "Update" : "Add"} Helper
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
