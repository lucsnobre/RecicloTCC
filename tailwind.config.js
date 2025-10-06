/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais do RECICLO
        primary: {
          50: '#e6f7f0',
          100: '#c1ebd9',
          200: '#97dfc0',
          300: '#6dd3a6',
          400: '#4ec993',
          500: '#2fbf80', // Verde principal
          600: '#27a66f',
          700: '#1e8a5b',
          800: '#166e47',
          900: '#0d5235',
        },
        secondary: {
          50: '#e8f5ff',
          100: '#c5e6ff',
          200: '#9ed7ff',
          300: '#76c7ff',
          400: '#58baff',
          500: '#3aadff', // Azul sustentável
          600: '#2e97e6',
          700: '#217dbd',
          800: '#156394',
          900: '#084a6b',
        },
        eco: {
          green: '#4ade80',
          blue: '#60a5fa',
          yellow: '#fbbf24',
          orange: '#fb923c',
          brown: '#92400e',
        },
        gamification: {
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          gold: '#ffd700',
          platinum: '#e5e4e2',
          diamond: '#b9f2ff',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'eco-pattern': "url('/src/assets/patterns/eco-pattern.svg')",
        'leaf-pattern': "url('/src/assets/patterns/leaf-pattern.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
