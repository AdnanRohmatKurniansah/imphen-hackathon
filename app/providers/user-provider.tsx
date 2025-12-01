"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "@/app/service/authService"
import type { User } from "@supabase/supabase-js"

interface UserContextType {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { user } = await getCurrentUser()
      setUser(user)
      setLoading(false)
    }

    load()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
