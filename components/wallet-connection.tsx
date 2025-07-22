"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Coins, Users } from "lucide-react"

interface WalletConnectionProps {
  onConnect: () => void
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate wallet connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onConnect()
    setIsConnecting(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <Wallet className="h-6 w-6" />
          Connect Your Wallet
        </CardTitle>
        <CardDescription className="text-gray-300">
          Connect your wallet to start earning tokens through meaningful conversations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 p-3 bg-purple-800/50 rounded-lg">
            <Coins className="h-5 w-5 text-yellow-400" />
            <div>
              <div className="font-medium text-white">Engagement Mining</div>
              <div className="text-sm text-gray-300">Earn tokens by participating in chats</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-800/50 rounded-lg">
            <Shield className="h-5 w-5 text-green-400" />
            <div>
              <div className="font-medium text-white">Staked Access</div>
              <div className="text-sm text-gray-300">Stake tokens to prevent spam</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-indigo-800/50 rounded-lg">
            <Users className="h-5 w-5 text-blue-400" />
            <div>
              <div className="font-medium text-white">Premium Channels</div>
              <div className="text-sm text-gray-300">Create and monetize exclusive communities</div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="lg"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </CardContent>
    </Card>
  )
}
