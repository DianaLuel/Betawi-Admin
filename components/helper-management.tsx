"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, CheckCircle, Trash2 } from "lucide-react"
import { HelperModal } from "./helper-modal"

interface Helper {
  id: number
  name: string
  age: number
  type: string
  medicalInfo: string
  strengths: string
  weaknesses: string
  fayda_id: string
  kebele_id: string
  verified: boolean
  picture?: string
}

const mockHelpers: Helper[] = [
  {
    id: 1,
    name: "Amara Hassan",
    age: 28,
    type: "Live-in",
    medicalInfo: "No allergies",
    strengths: "Cooking, Childcare",
    weaknesses: "Limited English",
    fayda_id: "FY001",
    kebele_id: "KB001",
    verified: true,
    picture: "/ethiopian-woman-helper-smiling.jpg",
  },
  {
    id: 2,
    name: "Fatima Ali",
    age: 32,
    type: "Part-time",
    medicalInfo: "Asthma",
    strengths: "Cleaning, Laundry",
    weaknesses: "Heavy lifting",
    fayda_id: "FY002",
    kebele_id: "KB002",
    verified: true,
    picture: "/ethiopian-woman-professional-portrait.jpg",
  },
  {
    id: 3,
    name: "Zainab Ibrahim",
    age: 25,
    type: "On-demand",
    medicalInfo: "None",
    strengths: "Childcare, Teaching",
    weaknesses: "Cooking",
    fayda_id: "FY003",
    kebele_id: "KB001",
    verified: false,
    picture: "/young-ethiopian-woman-caregiver.jpg",
  },
  {
    id: 4,
    name: "Leila Ahmed",
    age: 35,
    type: "Nanny",
    medicalInfo: "None",
    strengths: "Childcare, Cooking",
    weaknesses: "None",
    fayda_id: "FY004",
    kebele_id: "KB003",
    verified: true,
    picture: "/ethiopian-woman-nanny-experienced.jpg",
  },
]

export function HelperManagement() {
  const [helpers, setHelpers] = useState<Helper[]>(mockHelpers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHelper, setEditingHelper] = useState<Helper | null>(null)

  const handleAddHelper = (data: Omit<Helper, "id" | "verified">) => {
    const newHelper: Helper = {
      ...data,
      id: Math.max(...helpers.map((h) => h.id), 0) + 1,
      verified: false,
    }
    setHelpers([...helpers, newHelper])
    setIsModalOpen(false)
  }

  const handleEditHelper = (data: Omit<Helper, "id" | "verified">) => {
    if (editingHelper) {
      setHelpers(helpers.map((h) => (h.id === editingHelper.id ? { ...editingHelper, ...data } : h)))
      setEditingHelper(null)
      setIsModalOpen(false)
    }
  }

  const handleVerify = (id: number) => {
    setHelpers(helpers.map((h) => (h.id === id ? { ...h, verified: true } : h)))
  }

  const handleDelete = (id: number) => {
    setHelpers(helpers.filter((h) => h.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Helper Management</h1>
          <p className="text-muted-foreground mt-1">Manage and verify household helpers</p>
        </div>
        <Button
          onClick={() => {
            setEditingHelper(null)
            setIsModalOpen(true)
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Helper
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">All Helpers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Picture</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Age</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Medical Info</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Fayda ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {helpers.map((helper) => (
                  <tr key={helper.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={helper.picture || `/placeholder.svg?height=40&width=40&query=ethiopian+woman+helper`}
                        alt={helper.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">{helper.name}</td>
                    <td className="py-3 px-4 text-foreground">{helper.age}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                        {helper.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground text-xs">{helper.medicalInfo}</td>
                    <td className="py-3 px-4 text-foreground font-mono text-xs">{helper.fayda_id}</td>
                    <td className="py-3 px-4">
                      {helper.verified ? (
                        <span className="flex items-center gap-1 text-primary text-xs font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingHelper(helper)
                            setIsModalOpen(true)
                          }}
                          className="text-primary hover:bg-secondary"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        {!helper.verified && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerify(helper.id)}
                            className="text-primary hover:bg-secondary"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(helper.id)}
                          className="text-destructive hover:bg-secondary"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal */}
      <HelperModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHelper(null)
        }}
        onSubmit={editingHelper ? handleEditHelper : handleAddHelper}
        initialData={editingHelper}
      />
    </div>
  )
}
