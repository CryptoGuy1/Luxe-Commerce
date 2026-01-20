import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Fulfill the order
      await handleCheckoutSessionCompleted(session);
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Handle successful payment
      await handlePaymentIntentSucceeded(paymentIntent);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Handle failed payment
      await handlePaymentIntentFailed(paymentIntent);
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      
      // Handle refund
      await handleChargeRefunded(charge);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id);
  
  // In a real implementation, you would:
  // 1. Retrieve the order from your database using session.metadata
  // 2. Update the order status to 'paid'
  // 3. Send confirmation email to customer
  // 4. Update inventory
  // 5. Trigger fulfillment process
  
  const customerEmail = session.customer_details?.email;
  const shippingAddress = session.shipping_details?.address;
  const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
  
  console.log('Order details:', {
    email: customerEmail,
    total: amountTotal,
    shipping: shippingAddress,
    metadata: session.metadata,
  });
  
  // TODO: Implement your order fulfillment logic here
  // await sendOrderConfirmationEmail(customerEmail, session);
  // await updateOrderStatus(session.metadata?.orderId, 'paid');
  // await updateInventory(session.line_items);
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  // Handle the successful payment
  // This is useful for payment intents created directly (not through Checkout)
  
  const metadata = paymentIntent.metadata;
  const amount = paymentIntent.amount / 100;
  
  console.log('Payment details:', {
    amount,
    currency: paymentIntent.currency,
    metadata,
  });
  
  // TODO: Implement your payment success logic here
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  
  const lastPaymentError = paymentIntent.last_payment_error;
  
  console.log('Payment failure details:', {
    error: lastPaymentError?.message,
    code: lastPaymentError?.code,
    declineCode: lastPaymentError?.decline_code,
  });
  
  // TODO: Implement your payment failure logic here
  // - Send failure notification to customer
  // - Log for analytics
  // - Update order status if applicable
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('Charge refunded:', charge.id);
  
  const refundAmount = charge.amount_refunded / 100;
  
  console.log('Refund details:', {
    amount: refundAmount,
    currency: charge.currency,
    paymentIntent: charge.payment_intent,
  });
  
  // TODO: Implement your refund logic here
  // - Update order status
  // - Send refund confirmation email
  // - Restore inventory if applicable
}

// Disable body parsing for webhook routes
export const config = {
  api: {
    bodyParser: false,
  },
};
