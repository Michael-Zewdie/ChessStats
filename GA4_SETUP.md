# Google Analytics 4 Setup Guide

Your ChessStats application now has Google Analytics 4 tracking fully integrated! Here's how to complete the setup:

## 1. Create Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create an account if you don't have one
3. Create a new GA4 property for your ChessStats website
4. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder:
   ```
   VITE_GA4_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
   ```

## 3. Deploy to Vercel

Since you're using Vercel, add the environment variable there too:

1. Go to your Vercel dashboard
2. Select your ChessStats project
3. Go to Settings → Environment Variables
4. Add: `VITE_GA4_MEASUREMENT_ID` with your GA4 measurement ID
5. Redeploy your application

## 4. What's Being Tracked

Your analytics implementation automatically tracks:

### Page Views
- Home page visits (`/`)
- Profile page views (`/profile/:username`)
- Error page views (`/error`)

### User Events
- **Username searches**: When users search for Chess.com usernames
- **Profile views**: When valid user profiles are successfully loaded
- **Chart interactions**: When users switch between rating time classes (rapid, blitz, bullet, daily)
- **Errors**: User not found, insufficient games, and other errors

### Data Available in GA4
- **Unique visitors** and total sessions
- **Page engagement** (time on site, bounce rate)
- **Popular usernames** searched
- **Most viewed chess profiles**
- **Chart interaction patterns**
- **Error occurrence tracking**

## 5. Viewing Your Data

After deployment with the measurement ID:
1. Go to your GA4 property
2. Check **Reports → Real-time** to see live traffic
3. Use **Reports → Engagement → Events** to see custom chess events
4. Set up custom audiences based on chess-specific behaviors

## 6. Development Testing

The analytics automatically enables debug mode in development. Check your browser console for analytics event logs when testing locally.

Your ChessStats app now provides comprehensive user analytics while maintaining user privacy and following modern GA4 best practices!