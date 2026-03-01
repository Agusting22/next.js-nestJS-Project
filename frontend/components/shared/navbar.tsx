'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products/searched?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="navbar">
        <div className="navbar-container">
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={130}
              height={35}
            />
          </Link>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="navbar-search">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nunca dejes de buscar"
                className="navbar-search-input"
              />
              <button
                type="submit"
                className="navbar-search-button"
                aria-label="Buscar"
              >
                <Search className="navbar-search-icon" />
              </button>
            </div>
          </form>
          <Image
            src="/meli.webp"
            alt="Profile"
            width={320}
            height={40}
            className="imagen-meli"
          />
        </div>
    </nav>
  )
}