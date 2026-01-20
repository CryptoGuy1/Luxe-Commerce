'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Package, Truck, Mail, ArrowRight } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'LX-XXXXXX';

  const steps = [
    { icon: Check, label: 'Order Confirmed', completed: true },
    { icon: Package, label: 'Processing', completed: false },
    { icon: Truck, label: 'Shipped', completed: false },
    { icon: Mail, label: 'Delivered', completed: false },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom section-padding">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-8 bg-success-500 rounded-full flex items-center justify-center"
          >
            <Check size={40} className="text-white" />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-display-md text-primary-950 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-primary-600 mb-2">
              Your order has been confirmed
            </p>
            <p className="text-sm text-primary-500">
              Order number: <span className="font-mono font-medium">{orderNumber}</span>
            </p>
          </motion.div>

          {/* Order Status Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="my-12"
          >
            <div className="flex justify-between items-center relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-cream-400">
                <div className="h-full bg-success-500 w-[12.5%]" />
              </div>

              {steps.map((step, index) => (
                <div key={step.label} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-success-500 text-white'
                        : 'bg-cream-300 text-primary-400'
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span className="mt-2 text-xs text-primary-600">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <div className="card p-6 text-left">
              <h3 className="font-medium text-primary-950 mb-2">
                Confirmation Email Sent
              </h3>
              <p className="text-sm text-primary-600">
                We&apos;ve sent a confirmation email with your order details and tracking
                information.
              </p>
            </div>
            <div className="card p-6 text-left">
              <h3 className="font-medium text-primary-950 mb-2">
                Estimated Delivery
              </h3>
              <p className="text-sm text-primary-600">
                Your order will arrive within 5-7 business days. You&apos;ll receive
                updates via email.
              </p>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-cream-300/50 p-8 mb-12"
          >
            <h2 className="font-display text-xl text-primary-950 mb-4">
              What Happens Next?
            </h2>
            <div className="text-sm text-primary-600 space-y-3 text-left max-w-md mx-auto">
              <p>
                <span className="font-medium">1.</span> Our team is carefully preparing
                your order with premium packaging.
              </p>
              <p>
                <span className="font-medium">2.</span> You&apos;ll receive a shipping
                confirmation email with tracking details.
              </p>
              <p>
                <span className="font-medium">3.</span> Your items will be delivered to
                your doorstep.
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/account/orders" className="btn-primary group">
              Track Your Order
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link href="/shop" className="btn-secondary">
              Continue Shopping
            </Link>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 pt-8 border-t border-cream-400"
          >
            <p className="text-sm text-primary-500">
              Questions about your order?{' '}
              <Link href="/contact" className="text-accent-600 hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 text-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}