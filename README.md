# Unfiltered by Silas – Newsletter Landing Page

This project is a modern, branded landing page for the "Unfiltered by Silas" newsletter. Built with React and Vite, it is designed to capture email signups, showcase Silas's creative brand, and provide a seamless, mobile-first user experience.

## Features
- **Custom AJAX Newsletter Signup**: Integrated with MailerLite, including a honeypot field for spam protection.
- **Modern Responsive Design**: Uses Space Grotesk and Clash Display fonts, glassmorphism effects, and a minimalist dark theme.
- **Mobile-First**: Fully responsive, optimized for all devices and viewports.
- **SEO Optimized**: Includes meta tags, Open Graph, Twitter Card, and JSON-LD structured data.
- **Quote of the Day**: Fetches and displays a random inspirational quote.
- **SPA Routing**: Uses React Router for smooth navigation and a custom success page.
- **Deployment Ready**: Works on Netlify, Vercel, and other static hosts (with proper SPA routing support).

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MailerLite](https://www.mailerlite.com/) (AJAX API)
- [Framer Motion](https://www.framer.com/motion/) (for subtle animations)
- [React Router](https://reactrouter.com/)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

## Customization
- Update branding, colors, and copy in `src/components/UnfilteredLandingPage.jsx` and `UnfilteredLandingPage.css`.
- Fonts are loaded via Google Fonts in `index.html`.
- SEO and meta tags are in `index.html`.

## Deployment
- For Netlify: Add a `_redirects` file for SPA routing.
- For Vercel: Add a `vercel.json` rewrite rule.

## License
MIT
