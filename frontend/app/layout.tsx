import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./sass/main.scss"
import Navbar from "../components/shared/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Mercado Libre",
  description: "Busca y compra productos",
  icons: {
    icon: "/meli.logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
