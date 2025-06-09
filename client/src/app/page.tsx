'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
        CodeNova
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-lg sm:text-2xl md:text-3xl text-gray-700 max-w-3xl">
        Sharpen your coding skills and benchmark yourself
      </p>

      {/* Call to Action Button */}
      <div className="pt-7">
        <Link href="/auth/signup" passHref>
          <Button
            className="bg-black text-white px-6 py-3 sm:py-5 sm:px-8 text-sm sm:text-base font-semibold rounded-md shadow-md transition-all duration-300 border border-transparent 
            hover:bg-blue-600 hover:shadow-blue-400/50 hover:shadow-lg hover:border-blue-300"
          >
            Join CodeNova Now
            {/* Let’s Get Started */}
          </Button>
        </Link>
      </div>

      <section className="w-full overflow-hidden py-6 bg-blue-50 border-t border-blue-200">
        <div className="whitespace-nowrap animate-scroll flex items-center gap-12">
          <img src="/logos/react.svg" alt="React" className="h-10" />
          <img src="/logos/typescript.svg" alt="TypeScript" className="h-10" />
          <img src="/logos/nodejs.svg" alt="Node.js" className="h-10" />
          <img src="/logos/mongodb.svg" alt="MongoDB" className="h-10" />
          <img src="/logo.png" alt="CodeNova" className="h-10" />
          {/* repeat logos to ensure loop effect */}
          <img src="/logos/react.svg" alt="React" className="h-10" />
          <img src="/logos/typescript.svg" alt="TypeScript" className="h-10" />
          <img src="/logos/nodejs.svg" alt="Node.js" className="h-10" />
          <img src="/logos/mongodb.svg" alt="MongoDB" className="h-10" />
          <img src="/logo.png" alt="CodeNova" className="h-10" />
        </div>
      </section>
    </section>
  );
}
