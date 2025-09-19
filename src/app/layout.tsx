import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/Header';
import { CartProvider } from '@/lib/cart-context';
import { ToastProvider } from '@/lib/toast-context';
import type { Metadata } from 'next';
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
      </body>
    </html>
  );
}
