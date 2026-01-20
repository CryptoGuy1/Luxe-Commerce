import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    // Validate order ID
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Capture the PayPal order
    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal capture failed:', errorData);
      
      // Handle specific error cases
      if (errorData.details?.[0]?.issue === 'ORDER_NOT_APPROVED') {
        return NextResponse.json(
          { error: 'Order has not been approved by the buyer' },
          { status: 400 }
        );
      }
      
      throw new Error(errorData.message || 'Failed to capture PayPal order');
    }

    const data = await response.json();

    // Extract payment details
    const captureId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id;
    const captureStatus = data.purchase_units?.[0]?.payments?.captures?.[0]?.status;
    const payerEmail = data.payer?.email_address;
    const payerName = `${data.payer?.name?.given_name || ''} ${data.payer?.name?.surname || ''}`.trim();

    // Log successful capture
    console.log('PayPal payment captured:', {
      orderId: data.id,
      captureId,
      status: captureStatus,
      payerEmail,
      payerName,
    });

    // In a real implementation, you would:
    // 1. Update order status in your database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Trigger fulfillment

    return NextResponse.json({
      orderId: data.id,
      captureId,
      status: data.status,
      payerEmail,
      payerName,
      purchaseUnits: data.purchase_units,
    });
  } catch (error: any) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}

// Get order details
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get PayPal order details');
    }

    const data = await response.json();

    return NextResponse.json({
      orderId: data.id,
      status: data.status,
      intent: data.intent,
      purchaseUnits: data.purchase_units,
      payer: data.payer,
    });
  } catch (error: any) {
    console.error('PayPal order details error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get order details' },
      { status: 500 }
    );
  }
}
