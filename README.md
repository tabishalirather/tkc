# The Kashmir Chapter. (TKC) - Premium Kashmiri Products E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.14.0-2D3748)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)](https://postgresql.org/)

A modern, full-stack e-commerce platform built with Next.js 14, specializing in authentic Kashmiri products. Features a complete shopping experience with user authentication, shopping cart, order management, payment integration, and admin dashboard.

## 🌟 Features

- **User Authentication**: Secure login/register with NextAuth.js
- **Product Management**: Complete product catalog with categories, variants, and inventory tracking
- **Shopping Experience**: Cart, wishlist, product reviews, and ratings
- **Order Management**: Full order lifecycle from creation to delivery tracking
- **Payment Integration**: Secure payments with Razorpay
- **Admin Dashboard**: Complete admin panel for managing products, orders, customers, and coupons
- **Responsive Design**: Mobile-first design built with Tailwind CSS
- **User Profiles**: Account management, order history, and address book
- **Newsletter**: Email subscription system
- **Testimonials**: Customer feedback and reviews display
- **Advanced Features**: Product filtering, search, coupon system
- **SEO Optimized**: Server-side rendering and optimized for search engines

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack React framework | 14.2.3 |
| **TypeScript** | Type-safe JavaScript | 5.x |
| **Tailwind CSS** | Utility-first CSS framework | 3.4.1 |
| **Prisma** | Database ORM | 5.14.0 |
| **PostgreSQL** | Primary database | Latest |
| **NextAuth.js** | Authentication | 4.24.7 |
| **Razorpay** | Payment processing | 2.9.2 |
| **Zustand** | State management | 4.5.2 |
| **React Query** | Server state management | 5.40.0 |
| **bcryptjs** | Password hashing | 2.4.3 |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── about/              # About page
│   ├── account/            # User account pages
│   │   ├── orders/         # Order history
│   │   ├── profile/        # Profile management
│   │   └── wishlist/       # User wishlist
│   ├── admin/              # Admin dashboard
│   │   ├── customers/      # Customer management
│   │   ├── orders/         # Order management
│   │   └── products/       # Product management
│   ├── api/                # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/           # Authentication endpoints
│   │   ├── orders/         # Order processing
│   │   ├── payments/       # Payment handling
│   │   └── products/       # Product API
│   ├── auth/               # Authentication pages
│   ├── cart/               # Shopping cart
│   ├── category/           # Category pages
│   ├── checkout/           # Checkout process
│   ├── product/            # Product detail pages
│   └── shop/               # Product listing
├── components/             # Reusable React components
│   ├── admin/              # Admin-specific components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components
│   ├── product/            # Product components
│   └── ui/                 # UI components
├── lib/                    # Utility libraries
├── store/                  # Zustand stores
└── types/                  # TypeScript type definitions
```

## 📋 Prerequisites

- **Node.js** 18 or higher
- **PostgreSQL** database
- **npm** or **yarn** package manager
- **Razorpay** account (for payments)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd tkc
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the environment example file and fill in the required values:

```bash
cp .env.example .env.local
```

### 4. Set up PostgreSQL database

Create a new PostgreSQL database and update the `DATABASE_URL` in your `.env.local` file.

### 5. Run Prisma migrations

```bash
npx prisma db push
```

### 6. Seed the database

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/tkc_db` |
| `NEXTAUTH_URL` | NextAuth.js URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | `your-nextauth-secret-here` |
| `RAZORPAY_KEY_ID` | Razorpay API key ID | `rzp_test_xxxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | `your-razorpay-secret` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (optional) | `your-cloudinary-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional) | `your-cloudinary-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (optional) | `your-cloudinary-api-secret` |

## 🗄️ Database Setup

### Prisma Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed the database with initial data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Database Schema Overview

The application uses the following main models:
- **Users**: Customer and admin accounts
- **Products**: Product catalog with variants
- **Categories**: Product categorization
- **Orders**: Order management system
- **Payments**: Payment tracking
- **Cart & Wishlist**: Shopping features
- **Reviews**: Product reviews and ratings
- **Coupons**: Discount system

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured products |
| `/shop` | Product listing page |
| `/category/[slug]` | Category-specific products |
| `/product/[slug]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout process |
| `/auth/login` | User login |
| `/auth/register` | User registration |
| `/account` | User account dashboard |
| `/account/orders` | Order history |
| `/account/profile` | Profile management |
| `/account/wishlist` | User wishlist |
| `/admin` | Admin dashboard |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |
| `/admin/customers` | Customer management |
| `/admin/coupons` | Coupon management |
| `/about` | About page |
| `/contact` | Contact page |
| `/faq` | FAQ page |

## 🔌 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/*` | Various | Authentication endpoints |
| `/api/products` | GET, POST | Product CRUD operations |
| `/api/products/[slug]` | GET, PUT, DELETE | Single product operations |
| `/api/categories` | GET | Category listing |
| `/api/categories/[slug]` | GET | Category products |
| `/api/orders/create` | POST | Create new order |
| `/api/orders/[id]` | GET, PUT | Order operations |
| `/api/payments/verify` | POST | Payment verification |
| `/api/payments/webhook` | POST | Payment webhook |
| `/api/user/orders` | GET | User order history |
| `/api/user/profile` | GET, PUT | User profile |
| `/api/admin/*` | Various | Admin operations |
| `/api/newsletter/subscribe` | POST | Newsletter subscription |
| `/api/testimonials` | GET | Testimonials |

## 👤 Admin Access

### Default Admin Credentials

Use these credentials to access the admin dashboard at `/admin`:

- **Email**: `admin@tkc.com`
- **Password**: `Admin@123`

### Admin Features

- Dashboard with sales analytics
- Product management (CRUD operations)
- Order management and status updates
- Customer management
- Coupon creation and management
- Sales reports and statistics

## 💳 Payment Integration

### Razorpay Setup

1. Create a [Razorpay account](https://razorpay.com/)
2. Get your API keys from the dashboard
3. Add the keys to your `.env.local` file:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your-razorpay-secret
   ```

### Test Mode

The application supports Razorpay test mode for development. Use test card details:
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

## 🚀 Deployment

### Vercel Deployment

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- Database URL (use a cloud PostgreSQL service)
- NextAuth configuration
- Razorpay production keys
- Other service API keys

## 🔑 Default Credentials

### Admin Account
- **Email**: `admin@tkc.com`
- **Password**: `Admin@123`

*Note: Change these credentials after your first login in production.*

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push database schema
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for authentic Kashmiri products
