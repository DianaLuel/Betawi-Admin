"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, AlertCircle, CheckCircle, X, Send } from "lucide-react"

interface Message {
  id: number
  sender: string
  recipient: string
  message: string
  timestamp: string
  read: boolean
}

interface Notification {
  id: number
  type: "alert" | "info" | "success"
  title: string
  message: string
  timestamp: string
}

interface ChatMessage {
  id: number
  sender: string
  text: string
  timestamp: string
}

interface Conversation {
  id: number
  household: string
  helper: string
  lastMessage: string
  lastMessageTime: string
  unread: number
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    household: "Ahmed Family",
    helper: "Amara Hassan",
    lastMessage: "I will arrive at 9 AM tomorrow",
    lastMessageTime: "14:30",
    unread: 0,
  },
  {
    id: 2,
    household: "Mohamed Family",
    helper: "Fatima Ali",
    lastMessage: "The cleaning is complete",
    lastMessageTime: "13:45",
    unread: 0,
  },
  {
    id: 3,
    household: "Noor Family",
    helper: "Zainab Ibrahim",
    lastMessage: "Can we reschedule the cooking service?",
    lastMessageTime: "12:20",
    unread: 2,
  },
  {
    id: 4,
    household: "Hassan Family",
    helper: "Leila Ahmed",
    lastMessage: "The children are doing great!",
    lastMessageTime: "11:00",
    unread: 0,
  },
]

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Amara Hassan",
    recipient: "Ahmed Family",
    message: "I will arrive at 9 AM tomorrow for the childcare service.",
    timestamp: "2025-01-15 14:30",
    read: true,
  },
  {
    id: 2,
    sender: "Fatima Ali",
    recipient: "Mohamed Family",
    message: "The cleaning is complete. Everything is ready for your arrival.",
    timestamp: "2025-01-15 13:45",
    read: true,
  },
  {
    id: 3,
    sender: "Zainab Ibrahim",
    recipient: "Noor Family",
    message: "Can we reschedule the cooking service to next week?",
    timestamp: "2025-01-15 12:20",
    read: false,
  },
  {
    id: 4,
    sender: "Leila Ahmed",
    recipient: "Hassan Family",
    message: "The children are doing great! They had a wonderful day.",
    timestamp: "2025-01-15 11:00",
    read: true,
  },
]

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "alert",
    title: "Booking Cancellation",
    message: "Booking #3 has been cancelled by the household.",
    timestamp: "2025-01-15 15:00",
  },
  {
    id: 2,
    type: "info",
    title: "New Helper Registration",
    message: "A new helper has registered and is pending verification.",
    timestamp: "2025-01-15 14:15",
  },
  {
    id: 3,
    type: "success",
    title: "Booking Completed",
    message: "Booking #5 has been marked as completed successfully.",
    timestamp: "2025-01-15 13:30",
  },
  {
    id: 4,
    type: "alert",
    title: "Payment Overdue",
    message: "Hassan Family has an overdue payment of 500 ETB.",
    timestamp: "2025-01-15 12:00",
  },
]

export function CommunicationMonitoring() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [filterUser, setFilterUser] = useState<string>("")
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "Ahmed Family", text: "Hello, we need help with childcare this weekend", timestamp: "10:30 AM" },
    { id: 2, sender: "Admin", text: "We have available helpers. Let me check their schedules.", timestamp: "10:35 AM" },
    { id: 3, sender: "Ahmed Family", text: "Great! Please let us know the options.", timestamp: "10:40 AM" },
    { id: 4, sender: "Admin", text: "Amara Hassan is available. Would you like to book her?", timestamp: "10:45 AM" },
  ])

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "Admin",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  const filteredMessages = filterUser
    ? messages.filter((m) => m.sender.toLowerCase().includes(filterUser.toLowerCase()))
    : messages

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <MessageSquare className="w-4 h-4 text-primary" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-50 border-l-4 border-red-500"
      case "success":
        return "bg-green-50 border-l-4 border-green-500"
      default:
        return "bg-blue-50 border-l-4 border-primary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Communication Monitoring</h1>
        <p className="text-muted-foreground mt-1">Monitor messages and manage conversations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-3 rounded-lg transition-colors border ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white border-border hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-sm">{conv.household}</p>
                    {conv.unread > 0 && (
                      <span className="bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-75 mb-1">{conv.helper}</p>
                  <p className="text-xs opacity-75 line-clamp-1">{conv.lastMessage}</p>
                  <p className="text-xs opacity-60 mt-1">{conv.lastMessageTime}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {selectedConversation && (
            <Card className="bg-white shadow-sm h-full flex flex-col">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-foreground text-sm">
                  {selectedConversation.household} & {selectedConversation.helper}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto py-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs ${
                        msg.sender === "Admin"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${msg.sender === "Admin" ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t border-border p-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
                <Button onClick={handleSendMessage} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Notifications */}
        <div>
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${getNotificationColor(notification.type)}`}>
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messages Section */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by sender..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>

          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message)
                  handleMarkAsRead(message.id)
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  message.read
                    ? "bg-white border-border hover:bg-secondary"
                    : "bg-secondary border-primary hover:bg-secondary/80"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{message.sender}</p>
                    <p className="text-xs text-muted-foreground">{message.recipient}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="text-sm text-foreground line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-md w-full shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
              <CardTitle className="text-foreground">Message Details</CardTitle>
              <button onClick={() => setSelectedMessage(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From</p>
                  <p className="font-semibold text-foreground">{selectedMessage.sender}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To</p>
                  <p className="font-semibold text-foreground">{selectedMessage.recipient}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Time</p>
                  <p className="text-sm text-foreground">{selectedMessage.timestamp}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="text-foreground bg-secondary p-3 rounded-lg">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
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
