import { AddressSection } from '@/components/sections';
import CompanyInfo from '@/components/sections/CompanyInfo';
import { ContactSection } from '@/components/sections/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ - VINA WPC',
  description:
    'Liên hệ với VINA WPC để được tư vấn và hỗ trợ về sản phẩm gỗ nhựa composite chất lượng cao.',
  keywords: 'liên hệ, tư vấn, VINA WPC, gỗ nhựa composite, hỗ trợ khách hàng',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactSection />
      <CompanyInfo />
      <AddressSection />
    </main>
  );
}
