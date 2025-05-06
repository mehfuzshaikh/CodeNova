import "../styles/globals.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/shared/navbar/Navbar';
import { Toaster } from 'sonner';
import Providers from "@/providers/Providers";
import AuthLoader from "@/components/AuthLoader";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeChallenge Platform',
  description: 'Practice coding and level up!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthLoader/> 
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
