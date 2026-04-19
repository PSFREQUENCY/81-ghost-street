import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Major Mono Display"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ghost: {
          ink: '#05060a',
          fog: '#0b0d14',
          bone: '#e8e6de',
          neon: '#c084fc',
          blood: '#f43f5e',
          rain: '#22d3ee',
          rust: '#f59e0b',
        },
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.72' },
          '50%': { opacity: '0.15' },
          '55%': { opacity: '0.85' },
        },
        crawl: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '10%, 90%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-8px)', opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 2.4s infinite',
        crawl: 'crawl 6s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
