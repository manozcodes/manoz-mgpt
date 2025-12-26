# MusicGPT - AI Music Generation Platform

A modern, real-time music generation platform built with Next.js, Typescript,featuring pixel-perfect design, smooth animations, and WebSocket-based progress synchronization.

## Packages.JSON

- Radix UI, Farmer Motion, Tailwind CSS, Socket.io

## Chosen Tech Stack

### Frontend Framework
- **Next.js 16.0** (App Router) - React framework with server-side rendering
- App Router for modern routing
- API Routes for backend endpoints
- Built-in optimizations (code splitting, image optimization)

### UI & Styling
- **React 19.2** - UI library
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Framer Motion 11.0** - Animation library for smooth transitions
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management

### State Management
- **Zustand 5.0** - Lightweight state management
- Centralized store for generation state
- Automatic reactivity for component updates
- Type-safe with TypeScript

### Real-Time Communication
- **Socket.IO 4.8** (Server & Client)
- WebSocket-based real-time updates
- Automatic reconnection handling
- Event-driven architecture

### Development Tools
- **TypeScript 5.0** - Type safety
- **ESLint** - Code linting
- **PostCSS** - CSS processing

### Design System
- **Custom Design Tokens** - Centralized colors, spacing, typography
- **Shared UI Components** - Reusable component library
- **Icon System** - SVG-based icon registry


### Architecture Patterns

**Separation of Concerns**:
- `/app` - Routing and API handlers
- `/components` - Feature-specific components
- `/shared-ui` - Reusable UI primitives
- `/store` - State management
- `/hooks` - Business logic
- `/server` - Backend services
- `/tokens` - Design system

**Component Composition**: Small, reusable components combine into larger features
**State Synchronization**: Zustand store ensures ProfileMenu and RecentGenerations stay in sync
**Real-Time Updates**: WebSocket events update store, triggering automatic UI updates


## How to Build & Run the Project

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manozcodes/manoz-musicgpt.git
   cd manoz-musicgpt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

### Development

**Start the development server** (includes Socket.IO server):
```bash
npm run dev
```

This command:
- Starts Next.js development server
- Initializes Socket.IO server on the same port
- Enables hot module replacement
- Opens the app at `http://localhost:3000`

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

The production server runs on `http://localhost:3000` (or the port specified in `PORT` environment variable).

### Environment Variables

Create a `.env.local` file (optional):
```env
PORT=3000
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Key Scripts

- `npm run dev` - Start development server with Socket.IO
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint


## Design Notes

### Animation Durations & Easing Curves

All animations were carefully extracted from the Figma prototype to match the original design specifications and crafted using CSS & Farmer Motion.


### Responsive Breakpoints

**Mobile**: `< 1100px`
- Sidebar: Hidden by default, slides in from left
- Content: Full width
- Animations: Simplified (reduced gradient effects)

**Desktop**: `>= 1100px`
- Sidebar: Always visible
- Content: Max width 808px, centered
- Animations: Full gradient effects enabled

## SEO Considerations

- Dynamic Metadata, OG Tags, Twitter Cards, Canonical URLs, Robots Meta, Sitemap Generation, Robots.txt, Structured Data, Semantic HTML

## Web Vitals

- SSR, Font Optimization, Code Splitting, Image Formats, Accessibility