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
    const { items, shippingCost = 0 } = body;

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    // Calculate totals
    const itemsTotal = items.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity),
      0
    );
    const total = itemsTotal + shippingCost;

    // Get access token
    const accessToken = await getAccessToken();

    // Create PayPal order
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: `luxe-order-${Date.now()}`,
          description: 'LUXE Commerce Order',
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: itemsTotal.toFixed(2),
              },
              shipping: {
                currency_code: 'USD',
                value: shippingCost.toFixed(2),
              },
            },
          },
          items: items.map((item: any) => ({
            name: item.name.substring(0, 127), // PayPal has 127 char limit
            description: item.description?.substring(0, 127) || undefined,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            category: 'PHYSICAL_GOODS',
          })),
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'LUXE Commerce',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'GET_FROM_FILE',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
          },
        },
      },
    };

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': `luxe-${Date.now()}`, // Idempotency key
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PayPal order creation failed:', errorData);
      throw new Error(errorData.message || 'Failed to create PayPal order');
    }

    const data = await response.json();

    return NextResponse.json({
      orderId: data.id,
      status: data.status,
      links: data.links,
    });
  } catch (error: any) {
    console.error('PayPal order error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
