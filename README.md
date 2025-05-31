# BeefLink - Farm to Table Beef Marketplace

A pre-product launch website for a two-sided marketplace connecting farmers and consumers for farm-to-table beef products.

## Project Overview

BeefLink is a modern web application built to facilitate the connection between beef producers and consumers, focusing on quality, transparency, and direct farm-to-table relationships.

## Tech Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Authentication)
- Netlify (Hosting)

## Development Setup

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd steer-fresh-find

# Step 3: Install dependencies
npm i

# Step 4: Set up environment variables
# Create a .env file with the following variables:
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Step 5: Start the development server
npm run dev
```

## Features

- Waitlist system with Supabase database integration
- Modern, responsive UI built with shadcn-ui and Tailwind CSS
- Type-safe development with TypeScript
- Fast development and build times with Vite

## Deployment

This project is configured for deployment on Netlify. The deployment process is automated through the following steps:

1. Connect your GitHub repository to Netlify
2. Configure the following build settings in Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 (or higher)

3. Add the following environment variables in Netlify:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

## Database Structure

The application uses Supabase for data storage. The main tables include:

- `waitlist` - Stores user information for the pre-launch waitlist
  - email
  - name
  - role (farmer/consumer)
  - created_at
  - status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.
