"use client"
import { WalletConnection } from "@/components/wallet-connection"
import { ChatInterface } from "@/components/chat-interface"
import { TokenDashboard } from "@/components/token-dashboard"
import { ChannelManager } from "@/components/channel-manager"
import { StakingInterface } from "@/components/staking-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/hooks/use-wallet"
import { useTokens } from "@/hooks/use-tokens"

export default function HyperChainChat() {
  const { isConnected, address, connect, disconnect } = useWallet()
  const { balance, stakedAmount, earnings } = useTokens()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">HyperChain Chat</h1>
            <p className="text-gray-300">Decentralized chat platform with token incentives</p>
          </div>
          <WalletConnection onConnect={connect} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">HyperChain Chat</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            <button
              onClick={disconnect}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <TokenDashboard balance={balance} stakedAmount={stakedAmount} earnings={earnings} />
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <StakingInterface />
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <ChannelManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
