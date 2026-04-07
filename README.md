
# Bala Hissar - Production Ready Restaurant System

This project is a high-performance, modern restaurant website and booking system designed for scalability and SEO.

## Responsibility Matrix

- **/app**: Next.js App Router for all routes (public, admin) and API handlers.
- **/components**: React components categorized by scope (UI, Layout, Booking, Admin).
- **/lib**: Business logic including database access and capacity algorithms.
- **/prisma**: Data models and migration configurations.
- **/types**: Shared TypeScript interfaces to ensure type-safety across client/server.

## Core Features Implemented

1. **Intelligent Booking Engine**: Server-side logic to prevent overbooking based on configurable time slots and guest limits.
2. **SEO Mastery**: Automated JSON-LD generation for restaurant schemas and Metadata API integration.
3. **Admin Dashboard**: Real-time management of reservations with status tracking.
4. **Resilient UI**: Mobile-first design using Tailwind CSS with a focus on high-end luxury aesthetics.

## Setup Instructions

1. **Environment Variables**:
   Create a `.env` file with:
   ```
   DATABASE_URL="postgresql://user:pass@localhost:5432/balahissar"
   NEXTAUTH_SECRET="your-secret"
   RESEND_API_KEY="re_..."
   ```

2. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

## Design Language
- **Typography**: Playfair Display (Serif) for character, Plus Jakarta Sans (Sans) for clarity.
- **Palette**: Deep Navy (#0B1C2C) & Gold (#C5A059) inspired by traditional Pakistani aesthetics.
