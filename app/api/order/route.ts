import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatOrderEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      customerName,
      phoneNumber,
      email,
      notes,
      customConfiguration,
      frameConfiguration,
    } = body;

    // Validate required fields
    if (!productId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: productId and phoneNumber are required' },
        { status: 400 },
      );
    }

    // Validate phone number (basic validation)
    if (phoneNumber.length < 8) {
      return NextResponse.json(
        { error: 'Phone number must be at least 8 characters long' },
        { status: 400 },
      );
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
      }
    }

    // Create order data object
    const orderData = {
      productId,
      customerName: customerName || '',
      phoneNumber,
      email: email || '',
      notes: notes || '',
      customConfiguration: customConfiguration || null,
      frameConfiguration: frameConfiguration || null,
      timestamp: new Date().toISOString(),
      orderId: `VIP-${Date.now()}`,
    };

    console.log('Order data received:', orderData);

    // Send email to duncasworks@gmail.com
    const emailData = formatOrderEmail(orderData);
    const emailSent = await sendEmail(emailData);

    if (!emailSent) {
      console.warn('Email sending failed, but continuing with success response');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Заказ успешно отправлен',
      orderId: orderData.orderId,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
