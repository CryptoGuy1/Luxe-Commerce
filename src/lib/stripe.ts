import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

export interface CreateCheckoutSessionParams {
  items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        images?: string[];
        description?: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

// Payment method types for display
export const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, Amex, Discover',
    icon: 'credit-card',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: 'paypal',
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    description: 'Fast, secure checkout',
    icon: 'apple',
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    description: 'Pay with Google',
    icon: 'chrome',
  },
];
