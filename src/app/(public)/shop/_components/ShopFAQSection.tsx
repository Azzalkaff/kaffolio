import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    id: 'faq-1',
    question: 'Bagaimana lisensi untuk aset digital yang saya beli?',
    answer: 'Sebagian besar produk kami menyertakan lisensi personal dan komersial dasar. Detail lisensi lengkap akan dijelaskan secara spesifik di masing-masing halaman produk di platform (Gumroad/Etsy) sebelum Anda melakukan pembayaran.'
  },
  {
    id: 'faq-2',
    question: 'Apakah ada kebijakan pengembalian dana (Refund)?',
    answer: 'Karena sifat produk digital yang dapat diunduh secara instan dan tidak dapat dikembalikan, kami umumnya tidak melayani pengembalian dana. Pengecualian hanya berlaku jika terdapat kesalahan teknis fatal pada file yang tidak dapat kami perbaiki.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara mendapatkan pembaruan produk di masa depan?',
    answer: 'Jika Anda membeli produk dengan jaminan Lifetime Updates, Anda akan menerima email notifikasi dari platform tempat Anda membeli (misalnya Gumroad) setiap kali ada versi baru, lengkap dengan tautan unduhan gratis.'
  }
];

/**
 * Komponen FAQ sederhana untuk halaman toko digital
 * 
 * @returns {JSX.Element} Bagian FAQ
 */
export default function ShopFAQSection() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <FadeIn direction="up">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Jawaban untuk pertanyaan yang sering ditanyakan sebelum membeli.</p>
        </div>
      </FadeIn>

      <StaggerContainer staggerChildren={0.15} className="space-y-6">
        {FAQS.map((faq) => (
          <StaggerItem key={faq.id}>
            <details className="group bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex gap-4 p-6 cursor-pointer list-none items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-card-foreground select-none">{faq.question}</h3>
                </div>
                <div className="flex-shrink-0 text-muted-foreground transition-transform duration-300 group-open:-rotate-180">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-0 ml-10 text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                {faq.answer}
              </div>
            </details>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
