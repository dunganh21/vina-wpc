import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout';

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
      <body className={`${inter.variable} font-primary antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
