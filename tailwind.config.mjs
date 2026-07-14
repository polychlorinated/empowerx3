/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // ── Deep forest greens ──────────────────────────────────────
        brand: {
          50:  '#f2f7f2',
          100: '#d6ebd6',
          200: '#a8d0a8',
          300: '#74ae74',
          400: '#4a8c4a',
          500: '#2d6b2d',  // primary — rich forest
          600: '#1a5018',
          700: '#103810',
          800: '#082408',
          900: '#041404',
          950: '#020a02',
        },
        // ── Warm gold / amber (pulled from favicon gradient) ────────
        gold: {
          100: '#fdf5dc',
          200: '#fae9a8',
          300: '#f5d870',
          400: '#e8c04a',
          500: '#d4a843',  // primary — matches logo
          600: '#b88820',
          700: '#9a6e0a',
          800: '#7a5205',
          900: '#5a3a02',
        },
        // ── Warmer, lighter stone (20% lighter than default) ────────
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#8a827b',
          600: '#716961',
          700: '#5c534b',
          800: '#4d463e',   // was #292524 → ~20% lighter
          850: '#433d35',
          900: '#3d372f',   // was #1c1917 → ~20% lighter
          950: '#24211c',   // was #0c0a09 → ~20% lighter
        },
        // ── Warm cream (text on dark) ───────────────────────────────
        cream: {
          50:  '#fdfcf4',
          100: '#f8f5e8',
          200: '#ede8d0',
          300: '#d0cab0',
          400: '#afa890',
          500: '#8a8370',
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'system-ui', 'sans-serif'],
        sans:    ['DM Sans',          'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #d4a843 0%, #f5d870 50%, #d4a843 100%)',
        'brand-gradient': 'linear-gradient(135deg, #2d6b2d 0%, #1a5018 100%)',
      },
      // Portal-specific utilities
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
