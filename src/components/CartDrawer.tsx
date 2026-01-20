'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 500 ? 0 : 25;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-950/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-100 z-50 
                       flex flex-col shadow-elegant-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cream-400">
              <h2 className="font-display text-xl">Shopping Bag</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:text-accent-600 transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-primary-300 mb-4" />
                  <p className="text-primary-600 mb-4">Your bag is empty</p>
                  <button onClick={closeCart} className="btn-primary">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-32 bg-cream-200 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-primary-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-primary-500 mt-1">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' | '}
                          {item.selectedColor && `Color: ${item.selectedColor.name}`}
                        </p>
                        <p className="text-sm font-medium text-primary-900 mt-2">
                          {formatCurrency(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-primary-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-cream-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-cream-200 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-sm text-primary-500 hover:text-error-500 
                                     transition-colors underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cream-400 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-xs text-primary-500">
                      Add {formatCurrency(500 - subtotal)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal + shipping)}</span>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-primary w-full text-center"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn-secondary w-full text-center"
                  >
                    View Bag
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
