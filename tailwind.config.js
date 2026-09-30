/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0d',
        surface: {
          50: '#1c1c24',
          100: '#16161d',
          200: '#121217',
          300: '#0e0e12',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-highlight': 'rgba(244, 63, 94, 0.25)',
        },
        cream: {
          50: '#ffffff',
          100: '#fbf8f3',
          200: '#f0ebe1',
          300: '#dcd3c3',
          400: '#b8ada0',
          500: '#8c8275',
        },
        crimson: {
          light: '#fb7185',
          DEFAULT: '#e11d48',
          dark: '#9f1239',
          glow: 'rgba(225, 29, 72, 0.25)',
        },
        amber: {
          accent: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.2)',
        },
        emerald: {
          glow: 'rgba(16, 185, 129, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'glow-crimson': '0 0 35px -5px rgba(225, 29, 72, 0.3)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.3)',
        'glow-subtle': '0 0 25px -5px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
