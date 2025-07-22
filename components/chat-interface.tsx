"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Coins, Heart, MessageCircle } from "lucide-react"
import { useTokens } from "@/hooks/use-tokens"
import { TipModal } from "@/components/tip-modal"

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  bytes: number
  reward: number
  tips: number
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "0x1234...5678",
      content: "Welcome to HyperChain Chat! This is where meaningful conversations are rewarded.",
      timestamp: new Date(Date.now() - 300000),
      bytes: 85,
      reward: 2.3,
      tips: 5.2,
    },
    {
      id: "2",
      user: "0x9876...4321",
      content: "Love the concept of chat-to-earn! Finally, a platform that values quality discussions.",
      timestamp: new Date(Date.now() - 180000),
      bytes: 92,
      reward: 2.5,
      tips: 8.7,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [selectedMessageForTip, setSelectedMessageForTip] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { addEarnings } = useTokens()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const calculateReward = (bytes: number): number => {
    // Logarithmic formula for engagement mining
    return Math.log(bytes + 1) * 0.5
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const bytes = new TextEncoder().encode(newMessage).length
    const reward = calculateReward(bytes)

    const message: Message = {
      id: Date.now().toString(),
      user: "0xYour...Wallet",
      content: newMessage,
      timestamp: new Date(),
      bytes,
      reward,
      tips: 0,
    }

    setMessages((prev) => [...prev, message])
    addEarnings(reward)
    setNewMessage("")
  }

  const handleTip = (message: Message, amount: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, tips: msg.tips + amount } : msg)))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            General Chat
            <Badge variant="secondary">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{message.user.slice(2, 4).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{message.user}</span>
                    <span className="text-gray-500">{message.timestamp.toLocaleTimeString()}</span>
                    <Badge variant="outline" className="text-xs">
                      +{message.reward.toFixed(2)} HYP
                    </Badge>
                  </div>
                  <p className="text-gray-900">{message.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{message.bytes} bytes</span>
                    {message.tips > 0 && (
                      <span className="flex items-center gap-1">
                        <Coins className="h-3 w-3" />
                        {message.tips.toFixed(1)} tips
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessageForTip(message)}
                      className="h-6 px-2 text-xs"
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      Tip
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chat Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Messages sent:</span>
              <span className="font-medium">{messages.filter((m) => m.user === "0xYour...Wallet").length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total bytes:</span>
              <span className="font-medium">
                {messages.filter((m) => m.user === "0xYour...Wallet").reduce((sum, m) => sum + m.bytes, 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Session earnings:</span>
              <span className="font-medium text-green-600">
                +
                {messages
                  .filter((m) => m.user === "0xYour...Wallet")
                  .reduce((sum, m) => sum + m.reward, 0)
                  .toFixed(2)}{" "}
                HYP
              </span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Reward Formula</h4>
            <p className="text-xs text-gray-600">Reward = log(bytes + 1) × 0.5</p>
            <p className="text-xs text-gray-500 mt-1">
              Logarithmic scaling prevents spam while rewarding meaningful content
            </p>
          </div>
        </CardContent>
      </Card>

      {selectedMessageForTip && (
        <TipModal message={selectedMessageForTip} onTip={handleTip} onClose={() => setSelectedMessageForTip(null)} />
      )}
    </div>
  )
}
