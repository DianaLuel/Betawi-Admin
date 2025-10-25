"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Flag, CheckCircle, MessageSquare } from "lucide-react"

interface Review {
  id: number
  household: string
  helper: string
  rating: number
  comment: string
  date: string
  status: "pending" | "resolved" | "flagged"
}

const mockReviews: Review[] = [
  {
    id: 1,
    household: "Ahmed Family",
    helper: "Amara Hassan",
    rating: 5,
    comment: "Excellent service! Very professional and caring with the children.",
    date: "2025-01-15",
    status: "resolved",
  },
  {
    id: 2,
    household: "Mohamed Family",
    helper: "Fatima Ali",
    rating: 4,
    comment: "Good cleaning service, but arrived 15 minutes late.",
    date: "2025-01-14",
    status: "pending",
  },
  {
    id: 3,
    household: "Noor Family",
    helper: "Zainab Ibrahim",
    rating: 3,
    comment: "Service was okay, but communication could be better.",
    date: "2025-01-13",
    status: "flagged",
  },
  {
    id: 4,
    household: "Hassan Family",
    helper: "Leila Ahmed",
    rating: 5,
    comment: "Outstanding nanny! The children love her and she's very responsible.",
    date: "2025-01-12",
    status: "resolved",
  },
  {
    id: 5,
    household: "Ahmed Family",
    helper: "Fatima Ali",
    rating: 2,
    comment: "Not satisfied with the laundry service. Some items were damaged.",
    date: "2025-01-11",
    status: "flagged",
  },
]

export function FeedbackRatings() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved" | "flagged">("all")

  const handleResolve = (id: number) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "resolved" as const } : r)))
  }

  const handleFlag = (id: number) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "flagged" as const } : r)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredReviews = filterStatus === "all" ? reviews : reviews.filter((r) => r.status === filterStatus)

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    )
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Feedback & Ratings</h1>
        <p className="text-muted-foreground mt-1">Review and manage customer feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Average Rating</CardTitle>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{averageRating}</div>
            <p className="text-xs text-muted-foreground mt-1">out of 5.0</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Reviews</CardTitle>
            <MessageSquare className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{reviews.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pending</CardTitle>
            <Flag className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {reviews.filter((r) => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Flagged</CardTitle>
            <Flag className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {reviews.filter((r) => r.status === "flagged").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "resolved", "flagged"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              filterStatus === status
                ? "bg-primary text-primary-foreground"
                : "bg-white text-foreground border border-border hover:bg-secondary"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-foreground">{review.household}</p>
                  <p className="text-sm text-muted-foreground">Helper: {review.helper}</p>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(review.status)}`}
                >
                  {review.status}
                </span>
              </div>

              <div className="mb-3">{renderStars(review.rating)}</div>

              <p className="text-foreground mb-4">{review.comment}</p>

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{review.date}</p>
                <div className="flex gap-2">
                  {review.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResolve(review.id)}
                        className="text-primary hover:bg-secondary text-xs"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFlag(review.id)}
                        className="text-destructive hover:bg-secondary text-xs"
                      >
                        <Flag className="w-4 h-4 mr-1" />
                        Flag
                      </Button>
                    </>
                  )}
                  {review.status === "flagged" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResolve(review.id)}
                      className="text-primary hover:bg-secondary text-xs"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
