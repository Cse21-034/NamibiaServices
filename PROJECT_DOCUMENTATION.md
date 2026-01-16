# Namibia Services Platform - Complete Project Documentation

## 📋 Project Overview

**Namibia Services Platform** (based on Chisfis template) is a comprehensive Next.js web application designed to connect service providers and customers in Namibia. It functions as a multi-role booking and listing platform with support for businesses, real estate listings, accommodations, car rentals, travel experiences, and more.

**Technology Stack:**
- **Framework:** Next.js 13.4.x (with App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v3.x with Namibia brand colors
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js
- **Frontend Libraries:** React 18.x, HeadlessUI, Framer Motion, React Leaflet (maps)
- **Package Manager:** pnpm 8.15.4

**Theme Colors:**
- Primary Red: #B32929
- Brand Green: #15352C
- Dark Green: #112922
- Brand Brown: #684B3B
- Brand Maroon: #612C30
- Text Primary: #000304
- Background: #FFFFFF

---

## 🎯 Core Features

### 1. **Multi-Role User System**
- **Regular Users (USER):** Browse, search, book services, leave reviews, manage bookings
- **Business Owners (BUSINESS):** Create and manage business profiles, listings, promotions, handle bookings
- **Administrators (ADMIN):** System-wide management via `/namibiaservices` dashboard
- **Authentication:** Email/password and OAuth providers via NextAuth.js

### 2. **Business Management**
- **Multi-branch Support:** Parent businesses can have multiple branch locations across Namibia
- **Business Profiles:** Company information, photos, hours, social media links, ratings
- **Verification System:** Draft → Pending → Published workflow
- **Featured Listings:** Boost business visibility
- **Services & Categories:** Hierarchical categorization with sub-categories
- **Statistics:** View counts, review counts, average ratings
- **Namibia Government Directory:** Integration with official Namibian government agencies and parastatals

### 3. **Listings & Promotions**
- **Listings:** Detailed property/service listings with descriptions
- **Promotions:** Time-limited promotional campaigns with discounts and custom images
- **Media Management:** Business photos with primary/ordering support

### 4. **Booking System**
- **Booking Workflow:** Reserve services with date, time, duration
- **Status Tracking:** Pending → Confirmed → Completed/Cancelled/No-show
- **Customer Info:** Store customer details (name, email, phone)
- **Service Types:** Support for various service categories

### 5. **Review & Rating System**
- **User Reviews:** Rate businesses (1-5), add comments, upload images
- **Review Management:** Approval workflow (Approved/Pending/Rejected)
- **Like System:** Users can like/react to reviews
- **Business Ratings:** Automatic average rating calculation

### 6. **Advanced Features**
- **Favorites:** Users can bookmark favorite businesses
- **Notifications:** System notifications for reviews, bookings, promotions
- **Geolocation:** GPS coordinates (latitude/longitude) for businesses
- **Dark/Light Mode:** Theme switching capability
- **Responsive Design:** Mobile, tablet, and desktop support
- **Email Templates:** React Email for transactional emails

---

## 📁 Project Structure

```
namibiaserv-main/
├── prisma/
│   ├── schema.prisma           # Database models & relationships
│   └── migrations/             # Database schema versions
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── business/      # Business management APIs
│   │   │   ├── reviews/       # Review endpoints
│   │   │   ├── bookings/      # Booking endpoints
│   │   │   ├── promotions/    # Promotion APIs
│   │   │   └── admin/         # Admin operations
│   │   ├── (account-pages)/   # User account pages
│   │   ├── (home)/            # Home page components
│   │   ├── usersdashboard/    # User dashboard
│   │   ├── business/          # Business owner dashboard
│   │   ├── namibiaservices/   # Admin dashboard
│   │   ├── categories/        # Category browsing
│   │   ├── listings/          # Listings display
│   │   ├── businesses/        # Business directory
│   │   ├── promotions/        # Promotions page
│   │   ├── checkout/          # Booking checkout
│   │   ├── login/             # Authentication
│   │   ├── signup/            # User registration
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── AdminNav.tsx
│   │   ├── BusinessNav.tsx
│   │   ├── AuthProvider.tsx
│   │   ├── CarCard.tsx
│   │   ├── CardCategory*.tsx
│   │   └── ... 100+ components
│   ├── middleware.ts          # Authentication & routing middleware
│   ├── middleware/            # Middleware utilities
│   ├── routers/               # Route configurations
│   ├── utils/                 # Utility functions
│   ├── hooks/                 # React custom hooks
│   ├── types/                 # TypeScript type definitions
│   ├── lib/                   # Library functions
│   └── emails/                # Email templates
├── scripts/
│   ├── seed-categories.ts     # Database seeding script
│   └── setup-env-and-prisma.ps1 # Environment setup
├── public/                    # Static assets
│   ├── images/
│   │   ├── categories/
│   │   ├── hero/
│   │   ├── promotionhero/
│   │   └── LogosCouncil/
├── package.json               # Dependencies & scripts
├── prisma schema.prisma       # Prisma configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # TailwindCSS configuration
└── next.config.js             # Next.js configuration
```

---

## 🗄️ Database Schema (Prisma Models)

### Authentication & Users
- **User:** Profile with role (USER/BUSINESS/ADMIN), email, password, membership type
- **Account:** OAuth provider accounts (Facebook, Google, etc.)
- **Session:** Active user sessions
- **VerificationToken:** Email verification tokens

### Business & Services
- **Business:** Company profiles with details, location, status, ratings, multi-branch support
- **Category:** Hierarchical service categories and subcategories
- **BusinessHours:** Operating hours for each day of the week
- **BusinessPhoto:** Media gallery for businesses
- **Listing:** Service/property listings associated with businesses
- **Promotion:** Time-limited promotional campaigns

### Customer Interactions
- **Review:** User reviews with ratings, comments, images, approval status
- **ReviewLike:** Users can like reviews
- **Favorite:** Users' bookmarked businesses
- **Booking:** Service reservations with customer info and status tracking
- **Notification:** System notifications for users

### Enums & Status Types
```
UserRole: USER, BUSINESS, ADMIN
UserMembershipType: BASIC, PREMIUM
BusinessStatus: DRAFT, PENDING, PUBLISHED, SUSPENDED
PricingRange: BUDGET, MODERATE, PREMIUM, LUXURY
ReviewStatus: PENDING, APPROVED, REJECTED
BookingStatus: PENDING, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
NotificationType: REVIEW, BOOKING, SYSTEM, PROMOTIONAL
```

---

## 🔐 Authentication & Authorization

### Middleware (`src/middleware.ts`)
- **Purpose:** Route protection and role-based access control
- **Authentication:** NextAuth.js with JWT tokens
- **Public Routes:** Home, login, signup, business directory, about, blog, API auth
- **Protected Routes:**
  - `/usersdashboard/*` → USER or ADMIN
  - `/business/*` → BUSINESS or ADMIN
  - `/namibiaservices/*` → ADMIN only
  - `/api/user/*` → Authenticated users

### Authorization Flow
1. User logs in (email/password or OAuth)
2. JWT token is generated
3. Middleware validates token on protected routes
4. Role-based redirects to appropriate dashboard
5. Protected API routes check user role and permissions

---

## 🔌 API Routes Structure

### Authentication (`/api/auth`)
- NextAuth.js default providers
- Email/password authentication
- OAuth integration

### Business (`/api/business`, `/api/businesses`)
- Create/update business profiles
- Multi-branch management
- Business photo uploads
- Hours management
- Verification workflow

### Reviews (`/api/reviews`)
- Submit reviews and ratings
- Like/unlike reviews
- Manage review approval
- Delete reviews

### Bookings (`/api/bookings` - implied in schema)
- Create bookings
- Update booking status
- User booking history
- Business booking management

### Promotions (`/api/promotions`)
- Create promotional campaigns
- Update/delete promotions
- Retrieve active promotions

### Admin (`/api/admin`)
- System-wide operations
- User management
- Business verification
- Content moderation

---

## 🎨 Frontend Features

### Page Templates & Components
1. **Home Page** - Hero section, category showcase, featured businesses
2. **Listings Pages** - Grid/list view of services with filters
3. **Business Directory** - All registered businesses with search
4. **Category Pages** - Filtered browsing by service type
5. **Business Detail** - Full business profile with reviews, photos, booking
6. **Real Estate Listings** - Property listings with multiple views
7. **Stay Listings** - Accommodation bookings
8. **Checkout** - Booking confirmation and payment
9. **User Dashboard** - Bookings, reviews, favorites, profile
10. **Business Dashboard** - Analytics, listings, bookings, promotions
11. **Admin Dashboard** - System management and moderation

### UI Components (100+)
- Card components (CarCard, CardAuthor, CardCategory)
- Navigation (AdminNav, BusinessNav)
- Forms & Inputs (CreatableSelect, DatePicker)
- Interactive elements (Modal gallery, Filters)
- Authentication provider wrapper

---

## 📦 Key Dependencies

### Core Framework
- `next` 13.4.3 - React framework
- `react` 18.2.0 - UI library
- `typescript` - Type safety

### Authentication
- `next-auth` 4.23.1 - Authentication
- `@next-auth/prisma-adapter` 1.0.7 - Database adapter
- `bcryptjs` 2.4.3 - Password hashing

### Database & ORM
- `@prisma/client` 6.18.0 - Database ORM
- `prisma` 6.18.0 - Schema manager
- Uses PostgreSQL

### UI & Styling
- `@tailwindcss/*` - Tailwind plugins
- `@headlessui/react` - Unstyled components
- `@heroicons/react` - Icon library
- `lucide-react` - Additional icons
- `framer-motion` - Animations

### Maps & Location
- `react-leaflet` 4.2.1 - React wrapper for Leaflet
- `leaflet` 1.9.4 - Map library

### Forms & Selection
- `react-select` 5.10.2 - Select component
- `react-datepicker` 4.11.0 - Date picker
- `rc-slider` 10.1.1 - Slider component

### Email
- `@react-email/components` 1.0.1 - Email templates

### Utilities
- `lodash` 4.17.21 - Utility functions
- `react-hooks-global-state` 2.1.0 - Global state management
- `@supabase/supabase-js` 2.76.1 - Backend services
- `react-swipeable` 7.0.0 - Touch gestures

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables (.env.local)

### Installation & Setup
```bash
# Clone repository
git clone <repository-url>
cd namibiaserv-main

# Install dependencies
pnpm install

# Setup environment
# Copy .env.example to .env.local and configure:
# - DATABASE_URL
# - DIRECT_URL
# - NEXTAUTH_SECRET
# - OAuth provider keys (Google, Facebook, etc.)

# Setup Prisma
prisma generate
prisma migrate dev

# Seed database with categories
pnpm run db:seed

# Start development server
pnpm run dev
```

### Available Scripts
```bash
pnpm run dev       # Start development server (http://localhost:3000)
pnpm run build     # Build for production
pnpm run start     # Start production server
pnpm run lint      # Run ESLint
pnpm run db:seed   # Seed database categories
```

---

## 🔄 User Workflows

### Regular User Flow
1. Sign up / Login
2. Browse businesses and categories
3. View business details and reviews
4. Make booking/reservation
5. Leave review and rating
6. Manage bookings in dashboard
7. Add businesses to favorites

### Business Owner Flow
1. Sign up with BUSINESS role
2. Create business profile
3. Add business photos and hours
4. Create listings and promotions
5. Manage incoming bookings
6. View customer reviews
7. Access business analytics

### Admin Flow
1. Access `/namibiaservices` admin dashboard
2. Verify pending businesses
3. Feature/unfeature businesses
4. Moderate reviews
5. Manage categories
6. System-wide configurations

---

## 🔗 Integration Points

### NextAuth.js
- Handles authentication logic
- Supports email/password and OAuth
- JWT-based session management
- Role-based access control

### Prisma ORM
- Type-safe database queries
- Automatic migrations
- Schema versioning
- PostgreSQL connection

### React Email
- Transactional email templates
- Professional email formatting
- React component-based templates

### Leaflet Maps
- Business location display
- Geolocation search
- Interactive maps

---

## 📝 Environment Configuration

Required `.env.local` variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/namibiaserv
DIRECT_URL=postgresql://user:password@localhost:5432/namibiaserv
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-key>
# OAuth providers
GOOGLE_ID=<google-oauth-id>
GOOGLE_SECRET=<google-secret>
FACEBOOK_ID=<facebook-app-id>
FACEBOOK_SECRET=<facebook-app-secret>
```

---

## 🎯 Development Highlights

### Key Folders & Their Purpose
- **`/api`** - Backend API endpoints
- **`/components`** - Reusable React components
- **`/utils`** - Helper functions and utilities
- **`/types`** - TypeScript type definitions
- **`/hooks`** - Custom React hooks
- **`/middleware`** - Request/response middleware
- **`/emails`** - Email template components

### Design Patterns
- **Server Components** - Used in layouts and API routes
- **Client Components** - Interactive UI elements
- **Custom Hooks** - Reusable logic (e.g., authentication state)
- **Middleware** - Request validation and routing
- **API Routes** - RESTful endpoints

### Notable Features
- Multi-branch business support
- Hierarchical categorization
- Comprehensive booking system
- Review moderation workflow
- Global state management
- Responsive design across devices

---

## 📊 Version & Project Info

- **Package Name:** chisfis-nextjs
- **Version:** 0.2.2
- **Node Package Manager:** pnpm 8.15.4
- **Author:** Hamed Hasan (original template)
- **License:** Private/Commercial

---

## 🛠️ Maintenance & Deployment

### Database Migrations
```bash
# Create new migration
prisma migrate dev --name <migration-name>

# Deploy migration to production
prisma migrate deploy
```

### Building for Production
```bash
# Build the application
pnpm run build

# Start production server
pnpm run start
```

### Deployment Considerations
- Environment variables must be set on the server
- PostgreSQL database should be on a production database service
- NextAuth.js NEXTAUTH_SECRET must be a secure, random string
- Consider using a CDN for static assets
- Enable HTTPS in production

---

## 📞 Support & References

- **Next.js Docs:** https://nextjs.org
- **Prisma Docs:** https://prisma.io
- **NextAuth.js Docs:** https://next-auth.js.org
- **TailwindCSS Docs:** https://tailwindcss.com

---

**Last Updated:** January 16, 2026
**Project Status:** Active Development (v0.2.2)
