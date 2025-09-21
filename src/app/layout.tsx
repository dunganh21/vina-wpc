import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/Header';
import { CartProvider } from '@/lib/cart-context';
import { ToastProvider } from '@/lib/toast-context';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Inter_Tight } from 'next/font/google';
import '../styles/animations.css';
import './globals.css';

export const interTight = Inter_Tight({
  subsets: ['vietnamese'],
  weight: ['400', '600', '800'],
  display: 'swap',
  variable: '--font-secondary',
  preload: true,
});

export const inter = Inter({
  subsets: ['vietnamese'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-primary',
  preload: true,
});

export const metadata: Metadata = {
  title: 'VINA WPC - Gỗ nhựa bền đẹp, thân thiện môi trường',
  description:
    'Sản phẩm gỗ nhựa WPC chất lượng cao, bền vững từ tâm - nâng tầm cuộc sống',
  keywords: [
    'gỗ nhựa',
    'WPC',
    'vật liệu xây dựng',
    'thân thiện môi trường',
    'bền vững',
    'VINA WPC',
    'sàn gỗ nhựa',
    'ốp tường',
    'trang trí nội thất',
  ],
  authors: [{ name: 'VINA WPC' }],
  creator: 'VINA WPC',
  publisher: 'VINA WPC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'VINA WPC - Gỗ nhựa bền đẹp, thân thiện môi trường',
    description:
      'Sản phẩm gỗ nhựa WPC chất lượng cao, bền vững từ tâm - nâng tầm cuộc sống',
    url: 'https://vina-wpc.com',
    siteName: 'VINA WPC',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VINA WPC - Gỗ nhựa bền đẹp, thân thiện môi trường',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VINA WPC - Gỗ nhựa bền đẹp, thân thiện môi trường',
    description:
      'Sản phẩm gỗ nhựa WPC chất lượng cao, bền vững từ tâm - nâng tầm cuộc sống',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: 'favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      {
        url: 'favicon/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${interTight.variable} ${inter.variable} bg-white font-primary antialiased`}
        suppressHydrationWarning={true}
      >
        <ToastProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </ToastProvider>
        <Script id="netlify-identity" strategy="afterInteractive">
          {`
            if (location.hash.includes('invite_token')) {
               location.replace('/admin/' + location.hash);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
