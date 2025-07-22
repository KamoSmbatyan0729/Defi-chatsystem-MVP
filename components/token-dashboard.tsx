"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Lock, Gift } from "lucide-react"

interface TokenDashboardProps {
  balance: number
  stakedAmount: number
  earnings: number
}

export function TokenDashboard({ balance, stakedAmount, earnings }: TokenDashboardProps) {
  const totalValue = balance + stakedAmount
  const stakingRatio = totalValue > 0 ? (stakedAmount / totalValue) * 100 : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{balance.toFixed(2)} HYP</div>
          <p className="text-xs text-muted-foreground">Ready to stake or tip</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Staked Amount</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stakedAmount.toFixed(2)} HYP</div>
          <p className="text-xs text-muted-foreground">Locked for chat access</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">+{earnings.toFixed(2)} HYP</div>
          <p className="text-xs text-muted-foreground">From engagement mining</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <Gift className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue.toFixed(2)} HYP</div>
          <p className="text-xs text-muted-foreground">Combined portfolio value</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Staking Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Staking Ratio</span>
              <span>{stakingRatio.toFixed(1)}%</span>
            </div>
            <Progress value={stakingRatio} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Minimum Stake</div>
              <div className="font-medium">10.0 HYP</div>
            </div>
            <div>
              <div className="text-muted-foreground">Your Status</div>
              <Badge variant={stakedAmount >= 10 ? "default" : "destructive"}>
                {stakedAmount >= 10 ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Earning Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Today's Earnings</div>
              <div className="font-medium text-green-600">+{(earnings * 0.3).toFixed(2)} HYP</div>
            </div>
            <div>
              <div className="text-muted-foreground">This Week</div>
              <div className="font-medium text-green-600">+{(earnings * 0.7).toFixed(2)} HYP</div>
            </div>
            <div>
              <div className="text-muted-foreground">Average per Message</div>
              <div className="font-medium">2.1 HYP</div>
            </div>
            <div>
              <div className="text-muted-foreground">Tips Received</div>
              <div className="font-medium">12.5 HYP</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
