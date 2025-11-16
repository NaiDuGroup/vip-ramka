import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Create contact data object
    const contactData = {
      name,
      email,
      phone: phone || '',
      subject: subject || 'Контактное сообщение',
      message,
      timestamp: new Date().toISOString(),
      id: `CONTACT-${Date.now()}`,
    };

    console.log('Contact form data received:', contactData);

    // Send email to duncasworks@gmail.com
    const emailData = formatContactEmail(contactData);
    const emailSent = await sendEmail(emailData);

    if (!emailSent) {
      console.warn('Email sending failed, but continuing with success response');
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Сообщение успешно отправлено',
      contactId: contactData.id,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
