'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { name: 'Beauty', slug: 'beauty' },
    { name: 'Health Food', slug: 'health-food' },
    { name: 'Bath & Body', slug: 'bath-body' },
    { name: 'Cosmetics', slug: 'cosmetics' },
    { name: 'Supplements', slug: 'supplements' },
    { name: 'Pharmaceuticals', slug: 'pharmaceuticals' },
    { name: 'Self Help', slug: 'self-help' },
    { name: 'Vision Care', slug: 'vision-care' },
    { name: 'Wellness', slug: 'wellness' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top navigation bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-sm font-bold">
              HH
            </div>
            <span className="hidden sm:inline">HealthHub Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              Home
            </Link>
            <Link href="/calculators" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/calculators') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              Calculators
            </Link>
            <Link href="/about" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/about' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-2">
              <Link href="/" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
                Home
              </Link>
              <Link href="/calculators" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
                Calculators
              </Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
                About
              </Link>
              <div className="pt-2 border-t border-border">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block px-3 py-2 rounded-md text-sm hover:bg-muted"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Categories Bar */}
        <div className="hidden lg:block border-t border-border">
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  pathname === `/categories/${cat.slug}`
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
