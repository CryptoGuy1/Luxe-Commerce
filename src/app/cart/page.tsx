'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatCurrency, calculateShipping, calculateTax } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom section-padding">
          <div className="max-w-lg mx-auto text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-primary-300 mb-6" />
            <h1 className="font-display text-display-sm text-primary-950 mb-4">
              Your Bag is Empty
            </h1>
            <p className="text-primary-600 mb-8">
              Looks like you haven&apos;t added anything to your bag yet.
              Start shopping to fill it up!
            </p>
            <Link href="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-display-md text-primary-950"
          >
            Shopping Bag
          </motion.h1>
          <button
            onClick={clearCart}
            className="text-sm text-primary-500 hover:text-error-500 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-4 bg-cream-300/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Truck size={20} className="text-accent-600" />
              <p className="text-sm">
                Add <span className="font-medium">{formatCurrency(remainingForFreeShipping)}</span> more for free shipping
              </p>
            </div>
            <div className="h-1 bg-cream-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-500 transition-all duration-500"
                style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
              />
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-cream-400"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-32 h-40 bg-cream-200 flex-shrink-0 overflow-hidden group"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium text-primary-900 hover:text-accent-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-primary-500 mt-1">
                          {item.product.category.name}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-primary-400 hover:text-error-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Variants */}
                    <div className="mt-2 space-y-1">
                      {item.selectedSize && (
                        <p className="text-sm text-primary-600">
                          Size: <span className="font-medium">{item.selectedSize}</span>
                        </p>
                      )}
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 text-sm text-primary-600">
                          Color:
                          <span
                            className="w-4 h-4 rounded-full border border-cream-400"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="font-medium">{item.selectedColor.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-primary-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-cream-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-cream-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-medium text-primary-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 sticky top-32"
            >
              <h2 className="font-display text-xl text-primary-950 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success-600">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-600">Estimated Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>

                <div className="pt-4 border-t border-cream-400">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="input-label">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="input-field flex-1"
                  />
                  <button className="btn-secondary px-4">Apply</button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="btn-primary w-full mt-6 justify-center group"
              >
                Proceed to Checkout
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>

              {/* Payment Icons */}
              <div className="mt-6 pt-6 border-t border-cream-400">
                <p className="text-xs text-primary-500 text-center mb-3">
                  Secure checkout powered by
                </p>
                <div className="flex justify-center gap-4">
                  <span className="text-xs font-medium text-primary-400">Stripe</span>
                  <span className="text-xs font-medium text-primary-400">PayPal</span>
                  <span className="text-xs font-medium text-primary-400">Apple Pay</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
