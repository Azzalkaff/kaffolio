import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import SplashScreen from '@/components/shared/SplashScreen';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'Kaffolio - Portfolio',
  description: 'Ngga Perlu Diliat kalau ngga penasaran',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-primary pt-16 bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SplashScreen />
          <main className="w-full relative z-10 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
