"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Users, Lock, Crown, Coins } from "lucide-react"

interface Channel {
  id: string
  name: string
  description: string
  price: number
  members: number
  creator: string
  isOwned: boolean
  isJoined: boolean
}

export function ChannelManager() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "1",
      name: "Crypto Trading Signals",
      description: "Premium trading signals and market analysis",
      price: 25,
      members: 142,
      creator: "0x1234...5678",
      isOwned: false,
      isJoined: false,
    },
    {
      id: "2",
      name: "DeFi Alpha Group",
      description: "Early access to DeFi opportunities and strategies",
      price: 50,
      members: 89,
      creator: "0x9876...4321",
      isOwned: false,
      isJoined: true,
    },
    {
      id: "3",
      name: "My Premium Channel",
      description: "Exclusive content and discussions",
      price: 15,
      members: 23,
      creator: "0xYour...Wallet",
      isOwned: true,
      isJoined: true,
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newChannel, setNewChannel] = useState({
    name: "",
    description: "",
    price: "",
  })

  const createChannel = () => {
    const channel: Channel = {
      id: Date.now().toString(),
      name: newChannel.name,
      description: newChannel.description,
      price: Number.parseFloat(newChannel.price),
      members: 1,
      creator: "0xYour...Wallet",
      isOwned: true,
      isJoined: true,
    }

    setChannels((prev) => [...prev, channel])
    setNewChannel({ name: "", description: "", price: "" })
    setIsCreateModalOpen(false)
  }

  const joinChannel = (channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId ? { ...channel, isJoined: true, members: channel.members + 1 } : channel,
      ),
    )
  }

  const creationFee = 5 // HYP tokens

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Premium Channels</h2>
          <p className="text-muted-foreground">Create and join exclusive monetized communities</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Premium Channel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Channel Name</Label>
                <Input
                  id="name"
                  value={newChannel.name}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter channel name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newChannel.description}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your channel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Join Price (HYP)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newChannel.price}
                  onChange={(e) => setNewChannel((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Set join price"
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span>Creation fee: {creationFee} HYP</span>
                </div>
              </div>

              <Button
                onClick={createChannel}
                disabled={!newChannel.name || !newChannel.description || !newChannel.price}
                className="w-full"
              >
                Create Channel ({creationFee} HYP)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <Card key={channel.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2">
                  {channel.isOwned && <Crown className="h-4 w-4 text-yellow-500" />}
                  <Lock className="h-4 w-4" />
                  {channel.name}
                </CardTitle>
                <Badge variant="secondary">{channel.price} HYP</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{channel.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {channel.members} members
                </div>
                <div className="text-muted-foreground">
                  by {channel.creator === "0xYour...Wallet" ? "You" : channel.creator}
                </div>
              </div>

              {channel.isOwned ? (
                <div className="space-y-2">
                  <Badge className="w-full justify-center">Your Channel</Badge>
                  <div className="text-xs text-center text-muted-foreground">
                    Revenue: {(channel.members - 1) * channel.price} HYP
                  </div>
                </div>
              ) : channel.isJoined ? (
                <Badge variant="outline" className="w-full justify-center">
                  Joined
                </Badge>
              ) : (
                <Button onClick={() => joinChannel(channel.id)} className="w-full" variant="outline">
                  Join for {channel.price} HYP
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Channel Economics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{creationFee} HYP</div>
              <div className="text-sm text-muted-foreground">Creation Fee</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {channels.filter((c) => c.isOwned).reduce((sum, c) => sum + (c.members - 1) * c.price, 0)} HYP
              </div>
              <div className="text-sm text-muted-foreground">Your Revenue</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {channels.filter((c) => c.isJoined && !c.isOwned).reduce((sum, c) => sum + c.price, 0)} HYP
              </div>
              <div className="text-sm text-muted-foreground">Spent on Channels</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">How Premium Channels Work:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Pay a creation fee to launch your channel</li>
              <li>• Set a join price for exclusive access</li>
              <li>• Earn revenue from each new member</li>
              <li>• Build communities around your expertise</li>
              <li>• Smart contracts handle all payments automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
