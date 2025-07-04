import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        // Define a cohesive palette
        background: {
          DEFAULT: '#ffffff', // Light mode background
          dark: '#1a1a1a', // Dark mode background
        },
        foreground: {
          DEFAULT: '#1a1a1a', // Light mode text
          dark: '#e0e0e0', // Dark mode text
        },
        primary: {
          DEFAULT: '#3b82f6', // Blue for buttons, accents
          dark: '#60a5fa', // Lighter blue for dark mode
        },
        secondary: {
          DEFAULT: '#8b5cf6', // Purple for gradients
          dark: '#a78bfa', // Lighter purple for dark mode
        },
        success: {
          DEFAULT: '#22c55e',
          dark: '#4ade80',
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#fbbf24',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#f87171',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};

module.exports = config;