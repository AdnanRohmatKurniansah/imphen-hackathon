import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  )
}