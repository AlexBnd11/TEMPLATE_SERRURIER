/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F4C542', // Or doré rassurant
          dark: '#D6A52F',
          light: '#FFE08A',
        },
        dark: {
          DEFAULT: '#052548', // Bleu nuit légèrement plus clair
          light: '#0a3562',
          lighter: '#0f4278',
        },
        gray: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        hero: ['Lora', 'Georgia', 'serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};

