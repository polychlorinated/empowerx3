/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ── Updated brand colors ─────────────────────────────────────
        brand: {
          50:  '#eef0ee',
          100: '#dce0dc',
          200: '#b9c1b9',
          300: '#96a296',
          400: '#738373',
          500: '#6b7767',  // primary — muted sage green
          600: '#545e53',
          700: '#3d453c',
          800: '#262e27',
          900: '#101610',
          950: '#080b08',
        },
        // ── Updated gold/amber ──────────────────────────────────────
        gold: {
          50:  '#faf8f2',
          100: '#f5f0e4',
          200: '#ebe1c9',
          300: '#e1d1a8',
          400: '#d7c187',
          500: '#bfa36b',  // primary — warm antique gold
          600: '#a08656',
          700: '#816a41',
          800: '#614f31',
          900: '#413321',
        },
        // ── Charcoal background ────────────────────────────────────
        charcoal: {
          DEFAULT: '#1e1915',
          50:  '#f5f3f1',
          100: '#ebe7e4',
          200: '#d7d1cc',
          300: '#b8b1ac',
          400: '#938a81',
          500: '#746b60',
          600: '#5e5145',
          700: '#4a3f31',
          800: '#3d3328',
          900: '#1e1915',
        },
        // ── Warm cream/light text ──────────────────────────────────
        cream: {
          50:  '#fdfcf4',
          100: '#fbfaf5',  // light text color
          200: '#f7f4ed',
          300: '#efe7dc',
          400: '#d6cbbf',
          500: '#bda996',
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'system-ui', 'sans-serif'],
        sans:    ['DM Sans',          'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #bfa36b 0%, #d7c187 50%, #bfa36b 100%)',
        'brand-gradient': 'linear-gradient(135deg, #6b7767 0%, #545e53 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
