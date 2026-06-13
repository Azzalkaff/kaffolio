import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import { ShieldCheck, Zap, Download, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    id: 'b-1',
    title: 'Secure Checkout',
    description: 'Transaksi 100% aman karena diproses oleh platform e-commerce global terpercaya.',
    icon: <ShieldCheck className="w-8 h-8 text-primary" />
  },
  {
    id: 'b-2',
    title: 'Instant Delivery',
    description: 'File digital atau akses akan langsung dikirim ke email Anda sesaat setelah pembayaran berhasil.',
    icon: <Zap className="w-8 h-8 text-primary" />
  },
  {
    id: 'b-3',
    title: 'Lifetime Updates',
    description: 'Beli sekali, dapatkan semua pembaruan versi produk secara gratis selamanya.',
    icon: <Download className="w-8 h-8 text-primary" />
  },
  {
    id: 'b-4',
    title: 'Priority Support',
    description: 'Kendala teknis? Kami siap membantu Anda memecahkan masalah melalui email.',
    icon: <Headphones className="w-8 h-8 text-primary" />
  }
];

/**
 * Komponen untuk menampilkan trust signals atau benefit belanja
 * 
 * @returns {JSX.Element} Bagian benefit
 */
export default function ShopBenefitsSection() {
  return (
    <div className="bg-muted/50 rounded-3xl p-8 md:p-12 border border-border/50">
      <FadeIn direction="up">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Buy From Us?</h2>
      </FadeIn>
      
      <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((benefit) => (
          <StaggerItem key={benefit.id} className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-background rounded-full shadow-sm border border-border/50">
              {benefit.icon}
            </div>
            <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
