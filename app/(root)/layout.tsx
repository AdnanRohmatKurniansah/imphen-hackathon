import React from 'react'
import Navbar from '../components/shared/navbar'
import { Footer } from '../components/shared/footer'
import { UserProvider } from '../providers/user-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </UserProvider>
  )
}