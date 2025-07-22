"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, Coins } from "lucide-react"
import { useTokens } from "@/hooks/use-tokens"

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  bytes: number
  reward: number
  tips: number
}

interface TipModalProps {
  message: Message
  onTip: (message: Message, amount: number) => void
  onClose: () => void
}

export function TipModal({ message, onTip, onClose }: TipModalProps) {
  const [tipAmount, setTipAmount] = useState("")
  const [isTipping, setIsTipping] = useState(false)
  const { balance, spendTokens } = useTokens()

  const quickAmounts = [1, 5, 10, 25]

  const handleTip = async () => {
    const amount = Number.parseFloat(tipAmount)
    if (amount <= 0 || amount > balance) return

    setIsTipping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate transaction

    spendTokens(amount)
    onTip(message, amount)
    setIsTipping(false)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Tip User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{message.user.slice(2, 4).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-sm">{message.user}</div>
              <p className="text-sm text-gray-600 mt-1">{message.content}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setTipAmount(amount.toString())}
                  className="flex-1"
                >
                  {amount} HYP
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Amount</label>
              <Input
                type="number"
                placeholder="Enter tip amount"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                max={balance}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Available: {balance.toFixed(2)} HYP</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setTipAmount(Math.min(balance, 50).toString())}
                  className="h-auto p-0 text-xs"
                >
                  Max
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleTip}
              disabled={
                isTipping || !tipAmount || Number.parseFloat(tipAmount) <= 0 || Number.parseFloat(tipAmount) > balance
              }
              className="flex-1 flex items-center gap-2"
            >
              {isTipping ? (
                "Sending..."
              ) : (
                <>
                  <Coins className="h-4 w-4" />
                  Tip {tipAmount} HYP
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
