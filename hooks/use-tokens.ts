"use client"

import { useState } from "react"

export function useTokens() {
  const [balance, setBalance] = useState(100) // Starting balance
  const [stakedAmount, setStakedAmount] = useState(15) // Pre-staked amount
  const [earnings, setEarnings] = useState(23.7) // Total earnings

  const stake = (amount: number) => {
    setBalance((prev) => prev - amount)
    setStakedAmount((prev) => prev + amount)
  }

  const unstake = (amount: number) => {
    setStakedAmount((prev) => prev - amount)
    setBalance((prev) => prev + amount)
  }

  const addEarnings = (amount: number) => {
    setEarnings((prev) => prev + amount)
    setBalance((prev) => prev + amount)
  }

  const spendTokens = (amount: number) => {
    setBalance((prev) => prev - amount)
  }

  return {
    balance,
    stakedAmount,
    earnings,
    stake,
    unstake,
    addEarnings,
    spendTokens,
  }
}
