"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Unlock, AlertCircle, CheckCircle } from "lucide-react"
import { useTokens } from "@/hooks/use-tokens"

export function StakingInterface() {
  const { balance, stakedAmount, stake, unstake } = useTokens()
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const minStakeAmount = 10
  const isEligible = stakedAmount >= minStakeAmount

  const handleStake = async () => {
    const amount = Number.parseFloat(stakeAmount)
    if (amount <= 0 || amount > balance) return

    setIsStaking(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate transaction
    stake(amount)
    setStakeAmount("")
    setIsStaking(false)
  }

  const handleUnstake = async () => {
    const amount = Number.parseFloat(unstakeAmount)
    if (amount <= 0 || amount > stakedAmount) return

    setIsUnstaking(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate transaction
    unstake(amount)
    setUnstakeAmount("")
    setIsUnstaking(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Stake Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Stake</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              max={balance}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Available: {balance.toFixed(2)} HYP</span>
              <Button
                variant="link"
                size="sm"
                onClick={() => setStakeAmount(balance.toString())}
                className="h-auto p-0"
              >
                Max
              </Button>
            </div>
          </div>

          <Button
            onClick={handleStake}
            disabled={
              isStaking ||
              !stakeAmount ||
              Number.parseFloat(stakeAmount) <= 0 ||
              Number.parseFloat(stakeAmount) > balance
            }
            className="w-full"
          >
            {isStaking ? "Staking..." : "Stake Tokens"}
          </Button>

          {Number.parseFloat(stakeAmount) > 0 && Number.parseFloat(stakeAmount) <= balance && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>You will stake {stakeAmount} HYP tokens to gain chat access.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5" />
            Unstake Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Unstake</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              max={stakedAmount}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Staked: {stakedAmount.toFixed(2)} HYP</span>
              <Button
                variant="link"
                size="sm"
                onClick={() => setUnstakeAmount(stakedAmount.toString())}
                className="h-auto p-0"
              >
                Max
              </Button>
            </div>
          </div>

          <Button
            onClick={handleUnstake}
            disabled={
              isUnstaking ||
              !unstakeAmount ||
              Number.parseFloat(unstakeAmount) <= 0 ||
              Number.parseFloat(unstakeAmount) > stakedAmount
            }
            variant="outline"
            className="w-full"
          >
            {isUnstaking ? "Unstaking..." : "Unstake Tokens"}
          </Button>

          {Number.parseFloat(unstakeAmount) > 0 && Number.parseFloat(unstakeAmount) <= stakedAmount && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unstaking will reduce your chat access privileges if you go below the minimum.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Staking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{minStakeAmount} HYP</div>
              <div className="text-sm text-muted-foreground">Minimum Stake</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">{stakedAmount.toFixed(2)} HYP</div>
              <div className="text-sm text-muted-foreground">Your Stake</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Badge variant={isEligible ? "default" : "destructive"} className="text-lg px-4 py-2">
                {isEligible ? "Eligible" : "Not Eligible"}
              </Badge>
              <div className="text-sm text-muted-foreground mt-2">Chat Access</div>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Anti-Spam Mechanism:</strong> Staking tokens creates an economic barrier against spam and ensures
              only genuine users participate in chats. Your staked amount demonstrates your commitment to the community.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h4 className="font-medium">Benefits of Staking:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Access to all public chat channels</li>
              <li>• Ability to create premium channels</li>
              <li>• Higher trust score in the community</li>
              <li>• Protection against spam and low-quality content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
