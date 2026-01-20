'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  Lock,
  Check,
  ChevronDown,
  Apple,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/lib/store';
import { formatCurrency, calculateShipping, calculateTax, generateOrderNumber, cn } from '@/lib/utils';

type PaymentMethod = 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'klarna';
type CheckoutStep = 'information' | 'shipping' | 'payment';

const paymentMethods = [
  {
    id: 'card' as const,
    name: 'Credit Card',
    description: 'Visa, Mastercard, Amex',
    icon: CreditCard,
  },
  {
    id: 'paypal' as const,
    name: 'PayPal',
    description: 'Fast & secure',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.629h6.868c2.275 0 3.899.527 4.829 1.567.408.457.687.979.831 1.553.151.598.151 1.311-.002 2.18l-.012.071v.626l.488.283c.412.218.738.467.98.752.403.475.66 1.066.764 1.758.107.715.063 1.565-.127 2.527-.218 1.102-.571 2.063-1.048 2.855a5.695 5.695 0 0 1-1.602 1.752c-.627.445-1.363.778-2.188.989-.799.206-1.698.31-2.673.31H11.1a.947.947 0 0 0-.936.79l-.038.201-.648 4.109-.03.156a.947.947 0 0 1-.935.79H7.076z"/>
      </svg>
    ),
  },
  {
    id: 'apple_pay' as const,
    name: 'Apple Pay',
    description: 'Quick checkout',
    icon: Apple,
  },
  {
    id: 'google_pay' as const,
    name: 'Google Pay',
    description: 'Pay with Google',
    icon: Smartphone,
  },
  {
    id: 'klarna' as const,
    name: 'Klarna',
    description: 'Buy now, pay later',
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M4.592 2C2.054 2 0 4.054 0 6.592v10.816C0 19.946 2.054 22 4.592 22h14.816C21.946 22 24 19.946 24 17.408V6.592C24 4.054 21.946 2 19.408 2H4.592zm4.282 5.508h2.599c0 1.913-.791 3.674-2.134 4.947l3.063 4.461h-3.146l-2.628-3.834-.614.559v3.275H3.777V7.508h2.137v4.235l.027-.025c1.224-1.119 1.933-2.727 1.933-4.21zm5.817 0h2.137v9.408h-2.137V7.508zm3.574 7.112a1.296 1.296 0 1 1 0 2.592 1.296 1.296 0 0 1 0-2.592z"/>
      </svg>
    ),
  },
];

const shippingMethods = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 25,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 45,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 75,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '',
    saveInfo: true,
    // Card details (in real app, use Stripe Elements)
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 500 ? 0 : shippingMethods.find(s => s.id === selectedShipping)?.price || 25;
  const tax = calculateTax(subtotal);
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'information') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else {
      // Process payment
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderNumber = generateOrderNumber();
      clearCart();
      
      toast.success('Order placed successfully!');
      router.push(`/order-confirmation?order=${orderNumber}`);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-custom section-padding text-center">
          <h1 className="font-display text-display-md text-primary-950 mb-4">
            Your cart is empty
          </h1>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'information', label: 'Information' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="pt-32 pb-20 bg-cream-100">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            {/* Logo & Back */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="font-display text-2xl">
                LUXE
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-sm text-primary-600 hover:text-accent-600 transition-colors"
              >
                <ChevronLeft size={18} />
                Return to cart
              </Link>
            </div>

            {/* Breadcrumb Steps */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => index < currentStepIndex && setCurrentStep(step.id as CheckoutStep)}
                    className={cn(
                      'transition-colors',
                      index < currentStepIndex && 'text-accent-600 hover:underline cursor-pointer',
                      index === currentStepIndex && 'text-primary-950 font-medium',
                      index > currentStepIndex && 'text-primary-400'
                    )}
                    disabled={index > currentStepIndex}
                  >
                    {step.label}
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronLeft size={14} className="text-primary-300 rotate-180" />
                  )}
                </React.Fragment>
              ))}
            </nav>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Contact & Shipping Information */}
                {currentStep === 'information' && (
                  <motion.div
                    key="information"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Contact */}
                    <div>
                      <h2 className="font-display text-xl text-primary-950 mb-4">
                        Contact Information
                      </h2>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="input-field"
                        required
                      />
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h2 className="font-display text-xl text-primary-950 mb-4">
                        Shipping Address
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className="input-field"
                            required
                          />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            className="input-field"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Address"
                          className="input-field"
                          required
                        />
                        <input
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          placeholder="Apartment, suite, etc. (optional)"
                          className="input-field"
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="input-field"
                            required
                          />
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            className="input-field"
                            required
                          />
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="ZIP code"
                            className="input-field"
                            required
                          />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone (for delivery updates)"
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="w-5 h-5 border-2 border-primary-300 rounded 
                                 text-accent-500 focus:ring-accent-500"
                      />
                      <span className="text-sm text-primary-600">
                        Save this information for next time
                      </span>
                    </label>

                    <button type="submit" className="btn-primary w-full">
                      Continue to Shipping
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Shipping Method */}
                {currentStep === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Contact Summary */}
                    <div className="p-4 bg-cream-200/50 border border-cream-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-primary-500">Contact</p>
                          <p className="text-primary-900">{formData.email}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep('information')}
                          className="text-sm text-accent-600 hover:underline"
                        >
                          Change
                        </button>
                      </div>
                      <div className="pt-2 border-t border-cream-400">
                        <p className="text-sm text-primary-500">Ship to</p>
                        <p className="text-primary-900">
                          {formData.address}, {formData.city}, {formData.state} {formData.postalCode}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Methods */}
                    <div>
                      <h2 className="font-display text-xl text-primary-950 mb-4">
                        Shipping Method
                      </h2>
                      <div className="space-y-3">
                        {shippingMethods.map((method) => {
                          const isFree = subtotal >= 500 && method.id === 'standard';
                          return (
                            <label
                              key={method.id}
                              className={cn(
                                'flex items-center justify-between p-4 border cursor-pointer transition-all',
                                selectedShipping === method.id
                                  ? 'border-primary-950 bg-cream-200/50'
                                  : 'border-cream-400 hover:border-primary-400'
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={cn(
                                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                                    selectedShipping === method.id
                                      ? 'border-primary-950'
                                      : 'border-primary-300'
                                  )}
                                >
                                  {selectedShipping === method.id && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary-950" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-primary-900">{method.name}</p>
                                  <p className="text-sm text-primary-500">{method.description}</p>
                                </div>
                              </div>
                              <span className="font-medium">
                                {isFree ? (
                                  <span className="text-success-600">Free</span>
                                ) : (
                                  formatCurrency(method.price)
                                )}
                              </span>
                              <input
                                type="radio"
                                name="shipping"
                                value={method.id}
                                checked={selectedShipping === method.id}
                                onChange={(e) => setSelectedShipping(e.target.value)}
                                className="sr-only"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      Continue to Payment
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Summary */}
                    <div className="p-4 bg-cream-200/50 border border-cream-400 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="text-primary-500">Contact</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-primary-500">Ship to</span>
                        <span>{formData.city}, {formData.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-500">Method</span>
                        <span>{shippingMethods.find(s => s.id === selectedShipping)?.name}</span>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h2 className="font-display text-xl text-primary-950 mb-4">
                        Payment Method
                      </h2>
                      
                      {/* Express Checkout */}
                      <div className="mb-6">
                        <p className="text-sm text-primary-500 text-center mb-3">Express checkout</p>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedPayment('apple_pay')}
                            className={cn(
                              'p-4 border flex items-center justify-center gap-2 transition-all',
                              selectedPayment === 'apple_pay'
                                ? 'border-primary-950 bg-primary-950 text-cream-100'
                                : 'border-cream-400 hover:border-primary-400'
                            )}
                          >
                            <Apple size={20} />
                            <span className="text-sm font-medium">Pay</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedPayment('google_pay')}
                            className={cn(
                              'p-4 border flex items-center justify-center gap-2 transition-all',
                              selectedPayment === 'google_pay'
                                ? 'border-primary-950 bg-primary-950 text-cream-100'
                                : 'border-cream-400 hover:border-primary-400'
                            )}
                          >
                            <span className="text-sm font-medium">G Pay</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedPayment('paypal')}
                            className={cn(
                              'p-4 border flex items-center justify-center transition-all',
                              selectedPayment === 'paypal'
                                ? 'border-primary-950 bg-[#0070ba] text-white'
                                : 'border-cream-400 hover:border-primary-400 bg-[#ffc439] text-[#003087]'
                            )}
                          >
                            <span className="text-sm font-bold">PayPal</span>
                          </button>
                        </div>
                      </div>

                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-cream-400" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-cream-100 text-sm text-primary-500">
                            Or pay with card
                          </span>
                        </div>
                      </div>

                      {/* Card Form */}
                      <div
                        className={cn(
                          'border p-4 transition-all',
                          selectedPayment === 'card'
                            ? 'border-primary-950'
                            : 'border-cream-400'
                        )}
                        onClick={() => setSelectedPayment('card')}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                              selectedPayment === 'card'
                                ? 'border-primary-950'
                                : 'border-primary-300'
                            )}
                          >
                            {selectedPayment === 'card' && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-950" />
                            )}
                          </div>
                          <CreditCard size={20} />
                          <span className="font-medium">Credit Card</span>
                          <div className="ml-auto flex gap-2">
                            <span className="text-xs bg-cream-200 px-2 py-1">Visa</span>
                            <span className="text-xs bg-cream-200 px-2 py-1">MC</span>
                            <span className="text-xs bg-cream-200 px-2 py-1">Amex</span>
                          </div>
                        </div>

                        {selectedPayment === 'card' && (
                          <div className="space-y-4">
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="Card number"
                              className="input-field"
                              required={selectedPayment === 'card'}
                            />
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              placeholder="Name on card"
                              className="input-field"
                              required={selectedPayment === 'card'}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM / YY"
                                className="input-field"
                                required={selectedPayment === 'card'}
                              />
                              <input
                                type="text"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="CVC"
                                className="input-field"
                                required={selectedPayment === 'card'}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Klarna */}
                      <button
                        type="button"
                        onClick={() => setSelectedPayment('klarna')}
                        className={cn(
                          'w-full mt-3 p-4 border flex items-center gap-3 transition-all',
                          selectedPayment === 'klarna'
                            ? 'border-primary-950 bg-[#ffb3c7]'
                            : 'border-cream-400 hover:border-primary-400'
                        )}
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                            selectedPayment === 'klarna'
                              ? 'border-primary-950'
                              : 'border-primary-300'
                          )}
                        >
                          {selectedPayment === 'klarna' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-950" />
                          )}
                        </div>
                        <span className="font-bold text-[#0a0a0a]">Klarna</span>
                        <span className="text-sm text-primary-600">Buy now, pay later</span>
                      </button>
                    </div>

                    {/* Security Note */}
                    <div className="flex items-center gap-2 text-sm text-primary-500">
                      <Lock size={16} />
                      <span>Your payment information is encrypted and secure</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary w-full disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay ${formatCurrency(total)}`
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:pl-12 lg:border-l border-cream-400">
            {/* Mobile Toggle */}
            <button
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className="lg:hidden w-full flex items-center justify-between p-4 bg-cream-200/50 border border-cream-400 mb-6"
            >
              <span className="flex items-center gap-2">
                <span className="text-accent-600">
                  {showOrderSummary ? 'Hide' : 'Show'} order summary
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'transition-transform',
                    showOrderSummary && 'rotate-180'
                  )}
                />
              </span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </button>

            <div className={cn('lg:block', showOrderSummary ? 'block' : 'hidden')}>
              <h2 className="font-display text-xl text-primary-950 mb-6 hidden lg:block">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-20 bg-cream-200 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-950 text-cream-100 
                                     text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-xs text-primary-500">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && ` / ${item.selectedColor.name}`}
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="input-field flex-1"
                />
                <button className="btn-secondary px-6">Apply</button>
              </div>

              {/* Totals */}
              <div className="space-y-3 py-6 border-t border-cream-400">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-success-600">Free</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-600">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-cream-400">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
