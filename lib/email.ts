// Email utility for VIP-RAMKA.MD
// Note: Run `npm install nodemailer @types/nodemailer` to install dependencies

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  timestamp: string;
  id: string;
}

interface OrderFormData {
  productId: string;
  customerName?: string;
  phoneNumber: string;
  email?: string;
  notes?: string;
  customConfiguration?: any;
  frameConfiguration?: any;
  timestamp: string;
  orderId: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    // Check if email is enabled
    const emailEnabled = process.env.EMAIL_SERVICE && process.env.EMAIL_PASSWORD;

    if (!emailEnabled) {
      console.log('Email service not configured. Email data:', emailData);
      return false;
    }

    // Dynamic import to handle missing nodemailer gracefully
    let nodemailer;
    try {
      nodemailer = require('nodemailer');
    } catch (error) {
      console.error('Nodemailer not installed. Run: npm install nodemailer @types/nodemailer');
      console.log('Email that would be sent:', emailData);
      return false;
    }

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App password: ufse vzot fmhu khtp
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function formatContactEmail(data: ContactFormData): EmailData {
  return {
    to: process.env.EMAIL_TO || 'duncasworks@gmail.com',
    subject: `Новое сообщение с сайта: ${data.subject || 'Контактное сообщение'}`,
    html: `
      <h2>Новое сообщение с сайта VIP-RAMKA.MD</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Телефон:</strong> ${data.phone}</p>` : ''}
      <p><strong>Тема:</strong> ${data.subject || 'Контактное сообщение'}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Отправлено: ${new Date(data.timestamp).toLocaleString('ru-RU')}</small></p>
      <p><small>ID: ${data.id}</small></p>
    `,
  };
}

export function formatOrderEmail(data: OrderFormData): EmailData {
  const productNames = {
    '1': 'VIP Classic Black (450 лей)',
    '2': 'VIP Sport Red (520 лей)',
    '3': 'VIP Elegant Silver (680 лей)',
    '4': 'VIP Custom Logo (750 лей)',
    '5': 'VIP Business Gold (890 лей)',
    '6': 'VIP Carbon Fiber (950 лей)',
    custom: 'Индивидуальная рамка (от 600 лей)',
  };

  const productName =
    productNames[data.productId as keyof typeof productNames] || 'Неизвестный товар';

  let configurationDetails = '';
  if (data.frameConfiguration) {
    configurationDetails = `
      <h3>Конфигурация рамки:</h3>
      <p><strong>Материал:</strong> ${data.frameConfiguration.material || 'Не указан'}</p>
      <p><strong>Цвет:</strong> ${data.frameConfiguration.color || 'Не указан'}</p>
      <p><strong>Размер:</strong> ${data.frameConfiguration.size || 'Не указан'}</p>
      ${data.frameConfiguration.hasLogo ? '<p><strong>Логотип:</strong> Да</p>' : ''}
      ${data.frameConfiguration.hasImages ? '<p><strong>Изображения:</strong> Да</p>' : ''}
      ${data.frameConfiguration.text ? `<p><strong>Текст:</strong> ${data.frameConfiguration.text}</p>` : ''}
    `;
  }

  if (data.customConfiguration) {
    configurationDetails += `
      <h3>Дополнительная конфигурация:</h3>
      <pre>${JSON.stringify(data.customConfiguration, null, 2)}</pre>
    `;
  }

  return {
    to: process.env.EMAIL_TO || 'duncasworks@gmail.com',
    subject: `Новый заказ #${data.orderId}`,
    html: `
      <h2>Новый заказ с сайта VIP-RAMKA.MD</h2>
      <h3>Информация о заказе:</h3>
      <p><strong>Номер заказа:</strong> ${data.orderId}</p>
      <p><strong>Товар:</strong> ${productName}</p>
      
      <h3>Информация о клиенте:</h3>
      ${data.customerName ? `<p><strong>Имя:</strong> ${data.customerName}</p>` : ''}
      <p><strong>Телефон:</strong> ${data.phoneNumber}</p>
      ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
      
      ${configurationDetails}
      
      ${
        data.notes
          ? `
        <h3>Дополнительные заметки:</h3>
        <p>${data.notes.replace(/\n/g, '<br>')}</p>
      `
          : ''
      }
      
      <hr>
      <p><small>Дата заказа: ${new Date(data.timestamp).toLocaleString('ru-RU')}</small></p>
    `,
  };
}

