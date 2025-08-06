import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Novella - E-Book Reader',
  description: 'Cross-platform e-book reading application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
} 