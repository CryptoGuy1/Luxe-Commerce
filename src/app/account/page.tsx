'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register';

export default function AccountPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setIsAuthenticated(true);
  };

  // If not authenticated, show login/register form
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom section-padding">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="font-display text-display-md text-primary-950 mb-4">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-primary-600">
                {authMode === 'login'
                  ? 'Sign in to access your account'
                  : 'Join LUXE for exclusive benefits'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {authMode === 'register' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="input-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="input-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="input-label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input-field pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {authMode === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-accent-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-cream-400" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-cream-100 text-sm text-primary-500">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="btn-secondary justify-center text-sm">
                  Google
                </button>
                <button className="btn-secondary justify-center text-sm">
                  Apple
                </button>
              </div>

              <p className="text-center mt-8 text-sm text-primary-600">
                {authMode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setAuthMode('register')}
                      className="text-accent-600 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-accent-600 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated dashboard
  const menuItems = [
    { icon: User, label: 'Profile', href: '/account/profile' },
    { icon: Package, label: 'Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: CreditCard, label: 'Payment Methods', href: '/account/payment' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 sticky top-32">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-accent-500/20 rounded-full flex items-center justify-center mb-4">
                  <User size={32} className="text-accent-600" />
                </div>
                <h2 className="font-medium text-primary-950">John Doe</h2>
                <p className="text-sm text-primary-500">john@example.com</p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-primary-600 
                             hover:bg-cream-200 hover:text-accent-600 transition-colors"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-3 px-4 py-3 text-error-500 
                           hover:bg-error-500/10 transition-colors w-full"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h1 className="font-display text-display-md text-primary-950 mb-8">
              My Account
            </h1>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="card p-6">
                <Package size={24} className="text-accent-600 mb-3" />
                <p className="text-2xl font-display text-primary-950">3</p>
                <p className="text-sm text-primary-500">Active Orders</p>
              </div>
              <div className="card p-6">
                <Heart size={24} className="text-accent-600 mb-3" />
                <p className="text-2xl font-display text-primary-950">12</p>
                <p className="text-sm text-primary-500">Wishlist Items</p>
              </div>
              <div className="card p-6">
                <CreditCard size={24} className="text-accent-600 mb-3" />
                <p className="text-2xl font-display text-primary-950">2</p>
                <p className="text-sm text-primary-500">Saved Cards</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-primary-950">
                  Recent Orders
                </h2>
                <Link
                  href="/account/orders"
                  className="text-sm text-accent-600 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'LX-ABC123', date: 'Jan 15, 2024', status: 'Delivered', total: 2450 },
                  { id: 'LX-DEF456', date: 'Jan 10, 2024', status: 'Shipped', total: 895 },
                  { id: 'LX-GHI789', date: 'Jan 5, 2024', status: 'Processing', total: 1650 },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-4 border-b border-cream-400 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-primary-900">{order.id}</p>
                      <p className="text-sm text-primary-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={cn(
                          'text-xs px-2 py-1',
                          order.status === 'Delivered' && 'bg-success-500/10 text-success-600',
                          order.status === 'Shipped' && 'bg-accent-500/10 text-accent-600',
                          order.status === 'Processing' && 'bg-primary-200 text-primary-600'
                        )}
                      >
                        {order.status}
                      </span>
                      <p className="text-sm text-primary-900 mt-1">
                        ${order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-primary-950">
                  Saved Addresses
                </h2>
                <button className="text-sm text-accent-600 hover:underline">
                  Add New
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-cream-400 relative">
                  <span className="absolute top-2 right-2 text-xs bg-primary-950 text-cream-100 px-2 py-0.5">
                    Default
                  </span>
                  <p className="font-medium text-primary-900 mb-1">Home</p>
                  <p className="text-sm text-primary-600">
                    John Doe<br />
                    123 Main Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                <div className="p-4 border border-cream-400">
                  <p className="font-medium text-primary-900 mb-1">Office</p>
                  <p className="text-sm text-primary-600">
                    John Doe<br />
                    456 Business Ave, Suite 100<br />
                    New York, NY 10002<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
