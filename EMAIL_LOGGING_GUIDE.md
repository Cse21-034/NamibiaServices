# Email Logging Guide

## What to Look For in Your Server Console

When a user creates a business account, you should see the following logs in your terminal where `pnpm run dev` is running:

### 1. **Signup Request Initiated**
```
========== BUSINESS SIGNUP REQUEST ==========
Request body received: {
  businessName: "Example Business",
  name: "John Doe",
  email: "john@example.com",
  phone: "+267...",
  password: "[REDACTED]"
}
```

### 2. **Database Operations**
```
Hashing password for new user...
Starting database transaction to create user and business...
✅ User and business created successfully: { userId: 'clxxx...', businessId: 'clyyy...' }
```

### 3. **Welcome Email Attempt**
```
--- Attempting to send welcome email ---
Email will be sent to: john@example.com
Using API endpoint: http://localhost:3000/api/emails/send
```

Then you'll see the email API logs:
```
========== EMAIL SEND API REQUEST ==========
Email request body: {
  type: "welcome",
  businessName: "Example Business",
  businessOwnerEmail: "john@example.com",
  businessCategory: "General"
}

--- Sending WELCOME email ---
To: john@example.com
From: noreply@botswanaservices.com
Subject: Welcome to Botswana Services - Example Business
✅ Resend API response: { id: 're_xxx...', ... }
```

### 4. **Marketing Email Attempt**
```
--- Attempting to send marketing notification ---
Email will be sent to: marketing@botswanaservices.com
```

Then:
```
========== EMAIL SEND API REQUEST ==========
Email request body: {
  type: "marketing",
  businessName: "Example Business",
  ...
}

--- Sending MARKETING notification ---
To: marketing@botswanaservices.com
From: noreply@botswanaservices.com
Subject: New Business Registration: Example Business
✅ Resend API response: { id: 're_yyy...', ... }
```

### 5. **Signup Completion**
```
✅ SIGNUP COMPLETED SUCCESSFULLY
========================================
```

## Error Scenarios

### If Email Sending Fails

You'll see:
```
❌ Welcome email API returned error status: 400
Welcome email API error: { error: "...", details: "..." }
```

OR

```
❌ Failed to send welcome email - Exception caught:
Error: fetch failed
    at ...
```

### Common Error Messages

1. **Domain Not Verified**
```
Error: Domain not verified in Resend
```
**Fix:** Verify `botswanaservices.com` in Resend dashboard

2. **Invalid API Key**
```
Error: Invalid API key
```
**Fix:** Check `RESEND_API_KEY` in `.env`

3. **Rate Limit**
```
Error: Rate limit exceeded
```
**Fix:** You're on free tier (100 emails/day limit)

4. **Network Error**
```
❌ Failed to send welcome email - Exception caught:
TypeError: fetch failed
```
**Fix:** Check if the email API endpoint is accessible

## How to Test

1. **Start your dev server** (if not already running):
   ```bash
   pnpm run dev
   ```

2. **Create a new business account** through your signup form

3. **Watch the terminal** for the logs above

4. **Check your email inbox** (and spam folder)

5. **Check Resend dashboard**: https://resend.com/emails

## Success Indicators

✅ You should see:
- "User and business created successfully"
- "Welcome email sent successfully"
- "Marketing notification sent successfully"
- "SIGNUP COMPLETED SUCCESSFULLY"

✅ In Resend dashboard, you should see:
- 2 new emails (welcome + marketing)
- Status: "Delivered" or "Sent"

✅ In your inbox:
- Welcome email from noreply@botswanaservices.com
