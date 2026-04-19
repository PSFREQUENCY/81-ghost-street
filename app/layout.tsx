import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '81 GHOST STREET — Ghost of the Machines & Agents',
  description:
    'A neo-noir occult 3D thriller. Every machine in 81 has a ghost. Every agent leaves one behind. Built for Gamedev.js Jam 2026 — theme: Machines.',
  applicationName: '81 GHOST STREET',
  authors: [{ name: 'PHENOMENAL MARK' }],
  openGraph: {
    title: '81 GHOST STREET — Ghost of the Machines & Agents',
    description: 'Neo-noir 3D thriller. Commune with dead machines. Mint the Ghost Keys.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#05060a',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
