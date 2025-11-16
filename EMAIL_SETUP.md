# Email Configuration Setup

The contact and order forms are now set up to send emails, but you need to configure an email service to actually send the emails to `duncasworks@gmail.com`.

## Current Status

✅ **API Routes Created**: `/api/contact` and `/api/order` are ready
✅ **Forms Updated**: Both forms now call the API endpoints
⚠️ **Email Service**: Not configured (emails are currently logged to console)

## Next Steps to Enable Email Sending

### Option 1: Gmail SMTP (Recommended for testing)

1. Create environment variables in `.env.local`:

```bash
EMAIL_SERVICE=gmail
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-gmail@gmail.com
EMAIL_TO=duncasworks@gmail.com
```

2. Enable 2-factor authentication on your Gmail account
3. Generate an App Password: Google Account → Security → App passwords
4. Install nodemailer: `npm install nodemailer @types/nodemailer`

### Option 2: SendGrid (Professional solution)

1. Sign up at sendgrid.com
2. Create API key
3. Environment variables:

```bash
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-api-key
EMAIL_FROM=verified-sender@yourdomain.com
EMAIL_TO=duncasworks@gmail.com
```

### Option 3: Resend (Modern API)

1. Sign up at resend.com
2. Add your domain and verify
3. Environment variables:

```bash
EMAIL_SERVICE=resend
RESEND_API_KEY=your-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=duncasworks@gmail.com
```

## Implementation

Once you choose an email service, the API routes in `/app/api/contact/route.ts` and `/app/api/order/route.ts` need to be updated to include the actual email sending logic instead of just logging to console.

## Testing

After configuration:

1. Fill out the contact form
2. Check the server console logs
3. Check the duncasworks@gmail.com inbox
4. Test the order form as well

## Current Form Data Being Sent

### Contact Form

- Name, Email, Phone, Subject, Message
- Timestamp and unique ID

### Order Form

- Product selection
- Customer details (name, phone, email)
- Custom frame configuration
- Order notes
- Timestamp and unique order ID

All this data is currently being logged to console and would be included in the emails once email service is configured.

