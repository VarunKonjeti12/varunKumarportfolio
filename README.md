# Varun Kumar Konjeti - Premium Portfolio Website

A next-generation personal portfolio website with immersive 3D elements, smooth animations, and world-class UI/UX inspired by Singapore's design sensibilities.

## Features

- 🎨 Ultra-clean, minimal design with dark theme
- 🎭 Immersive 3D elements using Three.js and React Three Fiber
- ✨ Smooth animations with Framer Motion and GSAP
- 📱 Fully responsive design
- ⚡ Optimized performance
- ♿ Accessible and SEO-friendly

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Three.js / React Three Fiber
- Framer Motion
- GSAP

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables (see Contact Form Setup below)
# Create a .env.local file with your email configuration

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Contact Form Setup

The contact form requires email configuration to send messages. Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration for Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=varunkonjeti77@gmail.com
```

### Gmail Setup Instructions:

1. **Enable 2-Step Verification** on your Google account
2. **Generate an App Password**:
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Portfolio Contact Form"
   - Copy the generated 16-character password
3. **Use the App Password** in `SMTP_PASSWORD` (not your regular Gmail password)

### Other Email Providers:

- **Outlook/Hotmail**: Use `smtp-mail.outlook.com` on port `587`
- **Yahoo**: Use `smtp.mail.yahoo.com` on port `587`
- **Custom SMTP**: Update `SMTP_HOST` and `SMTP_PORT` accordingly

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts  # Contact form API endpoint
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/
│   ├── sections/       # Page sections (Hero, About, Skills, etc.)
│   ├── Navigation.tsx  # Navigation bar
│   ├── Footer.tsx      # Footer component
│   ├── CursorEffect.tsx # Custom cursor effect
│   └── Particles.tsx   # Background particles animation
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Sections

1. **Hero Section** - Full-screen immersive hero with 3D animated sphere, parallax effects, and animated text reveal
2. **About Section** - Personal introduction with 3D floating cube and key highlights
3. **Skills Section** - Technology stack displayed in glassmorphism cards with 3D hover effects
4. **Projects Section** - Showcase of featured projects with cinematic card reveals
5. **Experience Section** - Timeline view of professional experience, education, and training programs
6. **Contact Section** - Contact form with backend email functionality, 3D animated torus, and social links

## Key Features

- **3D Elements**: Interactive 3D objects using React Three Fiber
- **Smooth Animations**: Scroll-triggered animations with Framer Motion
- **Custom Cursor**: Cursor-following light effect with magnetic buttons
- **Particle Background**: Animated particle network in the background
- **Glassmorphism**: Modern glass-effect cards throughout
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Performance Optimized**: Lazy loading, optimized animations, and efficient rendering

## Customization

All content is easily customizable through the component files:
- Personal information: `components/sections/Hero.tsx` and `components/sections/Contact.tsx`
- Projects: `components/sections/Projects.tsx`
- Skills: `components/sections/Skills.tsx`
- Experience/Education: `components/sections/Experience.tsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

