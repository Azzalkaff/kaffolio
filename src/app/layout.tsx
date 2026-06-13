import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

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

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
