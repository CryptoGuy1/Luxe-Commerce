'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { categories } from '@/data/products';
import CartDrawer from './CartDrawer';

const navLinks = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  {
    label: 'Shop',
    href: '/shop',
    children: categories.map((cat) => ({
      label: cat.name,
      href: `/shop/${cat.slug}`,
    })),
  },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { items: cartItems, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-elegant'
            : 'bg-transparent'
        )}
      >
        {/* Announcement Bar */}
        <div className="bg-primary-950 text-cream-100 text-center py-2 text-sm">
          <p>Complimentary shipping on orders over $500 | <Link href="/shop" className="underline hover:text-accent-400 transition-colors">Shop Now</Link></p>
        </div>

        <nav className="section-padding">
          <div className="container-custom flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 -ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl tracking-tight"
            >
              LUXE
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 py-2 text-sm font-medium tracking-wide
                             text-primary-900 hover:text-accent-600 transition-colors"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-cream-100 border border-cream-400/50 shadow-elegant-lg min-w-[200px] py-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-primary-700
                                       hover:bg-cream-200 hover:text-accent-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 hover:text-accent-600 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/account"
                className="hidden md:block p-2 hover:text-accent-600 transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2 hover:text-accent-600 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-primary-950 
                                 text-xs font-medium rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleCart}
                className="relative p-2 hover:text-accent-600 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-950 text-cream-100 
                                 text-xs font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-primary-950/50"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-[300px] bg-cream-100 shadow-elegant-lg"
            >
              <div className="p-6 pt-24">
                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block py-2 text-lg font-medium text-primary-900
                                 hover:text-accent-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-2 space-y-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block py-1 text-sm text-primary-600
                                       hover:text-accent-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-cream-400">
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 py-2 text-primary-900
                             hover:text-accent-600 transition-colors"
                  >
                    <User size={20} />
                    <span>Account</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="block py-2 text-primary-900
                             hover:text-accent-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/faq"
                    onClick={closeMobileMenu}
                    className="block py-2 text-primary-900
                             hover:text-accent-600 transition-colors"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
