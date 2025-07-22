"use client"

import { useState, useEffect } from "react"

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    // Check if wallet was previously connected
    const savedConnection = localStorage.getItem("wallet-connected")
    if (savedConnection === "true") {
      setIsConnected(true)
      setAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e")
    }
  }, [])

  const connect = () => {
    setIsConnected(true)
    setAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5c8e")
    localStorage.setItem("wallet-connected", "true")
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    localStorage.removeItem("wallet-connected")
  }

  return {
    isConnected,
    address,
    connect,
    disconnect,
  }
}
