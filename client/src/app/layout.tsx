import "../styles/globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Providers from "@/providers/Providers";
import DynamicNavbar from "@/components/shared/DynamicNavbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeNova',
  description: 'Practice coding and level up!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DynamicNavbar />
          <main>{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
