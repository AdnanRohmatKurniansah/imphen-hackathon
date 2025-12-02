import React from 'react'
import { UserProvider } from '../providers/user-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <UserProvider>
        <main className="flex-1">{children}</main>
      </UserProvider>
    </div>
  )
}