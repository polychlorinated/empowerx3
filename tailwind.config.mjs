/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      // Override Tailwind's default warm-gray stone with green-tinted
      // equivalents so every existing page aligns with the Core palette.
      stone: {
        50:  '#f6faf9',
        100: '#eef7f4',  // mist — light section backgrounds
        200: '#cfe3dc',  // line — light borders
        300: '#cfe7e0',  // mint — body text on dark
        400: '#9fc3ba',  // gloom — muted text on dark
        500: '#4a655e',  // mute — captions / fine print
        600: '#2f4a44',  // deep — body text on light
        700: '#1c443c',  // elevated dark cards / borders
        800: '#123530',  // dark card backgrounds
        900: '#0b2b26',  // ink — dark section backgrounds
        950: '#071c18',
      },
    },
    extend: {
      colors: {
        // ── Brand teal (Core Program accent) ───────────────────────
        brand: {
          50:  '#e6f4f0',
          100: '#ccebe1',
          200: '#99d7c3',
          300: '#6fe0c0',
          400: '#33af87',
          500: '#0d8a6e',
          600: '#077a62',  // primary — deep teal
          700: '#06624f',
          800: '#0b2b26',  // dark band background (ink)
          900: '#071c18',
          950: '#04231c',
        },
        // ── Gold/amber (Core Program CTA) ──────────────────────────
        gold: {
          50:  '#fef8ea',
          100: '#fdf0cf',
          200: '#fbe19e',
          300: '#f9d26d',
          400: '#f7c33c',
          500: '#f5b82e',  // primary — bright gold CTA
          600: '#b98300',  // amber — text/links on light
          700: '#93680a',
          800: '#6e4d0a',
          900: '#48330a',
        },
        // ── Charcoal (dark green-black) ────────────────────────────
        charcoal: {
          DEFAULT: '#0b2b26',
          50:  '#f6faf9',
          100: '#eef7f4',
          200: '#cfe3dc',
          300: '#cfe7e0',
          400: '#9fc3ba',
          500: '#6b8a81',
          600: '#4a655e',
          700: '#2f5b52',
          800: '#123530',
          900: '#0b2b26',
          950: '#071c18',
        },
        // ── Warm cream/light text (on dark) ────────────────────────
        cream: {
          50:  '#f6faf9',
          100: '#eaf7f3',  // heading text on dark
          200: '#eaf7f3',
          300: '#cfe7e0',  // body text on dark
          400: '#9fc3ba',  // muted text on dark
          500: '#6b8a81',  // fine print on dark
        },
        // ── Core Program palette (design mockup) ───────────────────
        core: {
          ink:      '#0b2b26',  // darkest green ink / dark band background
          deep:     '#2f4a44',  // body text on light backgrounds
          mute:     '#4a655e',  // muted text on light backgrounds
          mist:     '#eef7f4',  // light green section background
          line:     '#cfe3dc',  // light borders
          teal:     '#077a62',  // primary accent
          gold:     '#f5b82e',  // CTA accent
          nightline:'#2f5b52',  // borders on dark band
          foam:     '#eaf7f3',  // heading text on dark band
          mint:     '#cfe7e0',  // body text on dark band
          mintbright:'#6fe0c0', // small accent on dark band
          gloom:    '#9fc3ba',  // fine print on dark band
          amber:    '#b98300',  // highlighted card border
          amberbg:  '#fdf6e3',  // highlighted card background
          ambertext:'#8f6500',  // amber card labels
        },
      },
      fontFamily: {
        heading: ['Barlow Condensed', 'system-ui', 'sans-serif'],
        sans:    ['Barlow',           'DM Sans', 'system-ui', 'sans-serif'],
        body:    ['Barlow',           'DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #f5b82e 0%, #f7c33c 50%, #f5b82e 100%)',
        'brand-gradient': 'linear-gradient(135deg, #077a62 0%, #0d8a6e 100%)',
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
