import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID; // Optional: for signature verification
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';

const PAYPAL_API_URL = PAYPAL_MODE === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

// Verify webhook signature (optional but recommended)
async function verifyWebhookSignature(
  headers: Headers,
  body: string
): Promise<boolean> {
  if (!PAYPAL_WEBHOOK_ID) {
    console.warn('PayPal webhook ID not configured, skipping signature verification');
    return true;
  }

  try {
    const accessToken = await getAccessToken();

    const verificationData = {
      auth_algo: headers.get('paypal-auth-algo'),
      cert_url: headers.get('paypal-cert-url'),
      transmission_id: headers.get('paypal-transmission-id'),
      transmission_sig: headers.get('paypal-transmission-sig'),
      transmission_time: headers.get('paypal-transmission-time'),
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(body),
    };

    const response = await fetch(
      `${PAYPAL_API_URL}/v1/notifications/verify-webhook-signature`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();

  // Verify webhook signature (if webhook ID is configured)
  const isValid = await verifyWebhookSignature(request.headers, body);
  if (!isValid) {
    console.error('Invalid PayPal webhook signature');
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch (error) {
    console.error('Invalid webhook body:', error);
    return NextResponse.json(
      { error: 'Invalid body' },
      { status: 400 }
    );
  }

  const eventType = event.event_type;
  const resource = event.resource;

  console.log('PayPal webhook received:', eventType);

  // Handle different event types
  switch (eventType) {
    case 'CHECKOUT.ORDER.APPROVED':
      await handleOrderApproved(resource);
      break;

    case 'PAYMENT.CAPTURE.COMPLETED':
      await handlePaymentCaptureCompleted(resource);
      break;

    case 'PAYMENT.CAPTURE.DENIED':
      await handlePaymentCaptureDenied(resource);
      break;

    case 'PAYMENT.CAPTURE.REFUNDED':
      await handlePaymentCaptureRefunded(resource);
      break;

    case 'CHECKOUT.ORDER.COMPLETED':
      await handleOrderCompleted(resource);
      break;

    default:
      console.log(`Unhandled PayPal event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}

async function handleOrderApproved(resource: any) {
  console.log('Order approved:', resource.id);
  
  // The order has been approved by the buyer
  // You can now capture the payment
  // This is typically handled on the frontend after approval
  
  console.log('Order approval details:', {
    orderId: resource.id,
    status: resource.status,
    payer: resource.payer,
  });
}

async function handlePaymentCaptureCompleted(resource: any) {
  console.log('Payment capture completed:', resource.id);
  
  // Payment has been successfully captured
  // Update your order status, send confirmation email, etc.
  
  const captureDetails = {
    captureId: resource.id,
    status: resource.status,
    amount: resource.amount,
    customId: resource.custom_id,
    invoiceId: resource.invoice_id,
  };
  
  console.log('Capture details:', captureDetails);
  
  // TODO: Implement your fulfillment logic here
  // await updateOrderStatus(resource.custom_id, 'paid');
  // await sendOrderConfirmationEmail(resource);
  // await updateInventory(resource);
}

async function handlePaymentCaptureDenied(resource: any) {
  console.log('Payment capture denied:', resource.id);
  
  // Payment capture was denied
  // Update order status and notify customer
  
  console.log('Denied capture details:', {
    captureId: resource.id,
    status: resource.status,
    statusDetails: resource.status_details,
  });
  
  // TODO: Implement your denial handling logic
  // await updateOrderStatus(resource.custom_id, 'payment_failed');
  // await notifyCustomerOfFailure(resource);
}

async function handlePaymentCaptureRefunded(resource: any) {
  console.log('Payment capture refunded:', resource.id);
  
  // Payment has been refunded
  // Update order status and inventory
  
  console.log('Refund details:', {
    captureId: resource.id,
    status: resource.status,
    amount: resource.amount,
  });
  
  // TODO: Implement your refund handling logic
  // await updateOrderStatus(resource.custom_id, 'refunded');
  // await restoreInventory(resource);
}

async function handleOrderCompleted(resource: any) {
  console.log('Order completed:', resource.id);
  
  // Full order completed including all captures
  
  console.log('Completed order details:', {
    orderId: resource.id,
    status: resource.status,
    purchaseUnits: resource.purchase_units,
  });
}
