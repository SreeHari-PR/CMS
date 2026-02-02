# Admin Content Management System

A modern Next.js application with MongoDB integration for managing and displaying content with JWT-based admin authentication.

## Features

- **Admin Authentication**: Secure JWT-based login system for administrators
- **Content Management**: API endpoints to fetch and update content
- **MongoDB Integration**: Persistent data storage with Mongoose ORM
- **Responsive UI**: Built with Tailwind CSS and Radix UI components
- **TypeScript**: Full type safety throughout the application
- **Modern Animations**: GSAP and Lenis smooth scroll integration

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Database**: [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://www.radix-ui.com)
- **Authentication**: [JWT](https://jwt.io) with bcryptjs password hashing
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [GSAP](https://greensock.com/gsap/) and [Lenis](https://lenis.steuernagel.dev)

## Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/
│   │   ├── login/         # Admin login endpoint
│   │   └── me/            # Current user info
│   └── content/
│       ├── get/           # Fetch content
│       └── update/        # Update content
├── admin/                  # Admin dashboard pages
│   ├── page.tsx
│   └── login/
│       └── page.tsx
├── (public)/              # Public pages
│   └── page.tsx
└── layout.tsx             # Root layout

components/               # Reusable React components
├── ui/                   # Radix UI-based components
├── footer.tsx
├── launch-offer-cta.tsx
└── logo-strip.tsx

lib/                      # Utilities and configurations
├── models/               # MongoDB/Mongoose models
├── mongodb/              # Database connection
└── utils.ts              # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### Development Server

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Admin login with email and password
- **GET** `/api/auth/me` - Get current authenticated user info

### Content Management
- **GET** `/api/content/get` - Fetch all content
- **POST** `/api/content/update` - Update content (requires authentication)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `ADMIN_EMAIL` | Admin account email |
| `ADMIN_PASSWORD` | Admin account password |

## Development

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Tailwind CSS** for styling with PostCSS
- **Radix UI** for accessible component primitives

## Deployment

### Deploy on Vercel

The recommended way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is private and proprietary.
