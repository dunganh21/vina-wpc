import { Footer } from '@/components/layout';
import { Header } from '@/components/layout/Header';
import { CartProvider } from '@/lib/cart-context';
import { ToastProvider } from '@/lib/toast-context';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/animations.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
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
      <body className={`${inter.variable} bg-white font-primary antialiased`}>
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
