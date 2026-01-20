import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUXE | Curated Luxury for the Discerning Individual',
  description:
    'Discover our curated collection of luxury essentials. Crafted with precision, designed for those who appreciate the extraordinary.',
  keywords: [
    'luxury',
    'fashion',
    'designer',
    'cashmere',
    'jewelry',
    'accessories',
    'premium',
  ],
  openGraph: {
    title: 'LUXE | Curated Luxury',
    description:
      'Discover our curated collection of luxury essentials.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LUXE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE | Curated Luxury',
    description:
      'Discover our curated collection of luxury essentials.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0a0a0a',
              color: '#fdfcfa',
              borderRadius: '0',
            },
            success: {
              iconTheme: {
                primary: '#d4a574',
                secondary: '#0a0a0a',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
