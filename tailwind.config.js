/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f0f10',
          1: '#141416',
          2: '#1c1c1f',
          3: '#242428',
          4: '#2e2e33',
        },
        accent: {
          DEFAULT: '#7c6ff7',
          hover: '#9589f9',
          muted: '#7c6ff720',
        },
        success: '#34d399',
        warning: '#fbbf24',
        danger: '#f87171',
        muted: '#52525b',
        subtle: '#a1a1aa',
        primary: '#f4f4f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}