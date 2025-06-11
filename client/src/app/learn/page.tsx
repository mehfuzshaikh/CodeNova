'use client';
import ProtectedUserRoute from '@/components/shared/ProtectedUserRoute';
import Image from 'next/image';

const languages = [
  {
    title: 'Introduction to C++',
    description:
      'C++ is a high-level, general-purpose programming language created by Danish computer scientist Bjarne Stroustrup.',
    image: '/learn/cpp.png',
    link:"https://www.w3schools.com/cpp/",
  },
  {
    title: 'Introduction to Python',
    description:
      'Python is an interpreted, high-level and general-purpose programming language.',
    image: '/learn/python.png',
    link:"https://www.w3schools.com/python/",
  },
  {
    title: 'Introduction to JavaScript',
    description:
      'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.',
    image: '/learn/js.png',
    link:"https://www.w3schools.com/js/",
  },
  {
    title: 'Introduction to Java',
    description:
      'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
    image: '/learn/java.png',
    link:"https://www.w3schools.com/java/",
  },
  {
    title: 'Introduction to C',
    description:
      'C is a general-purpose, procedural computer programming language supporting structured programming.',
    image: '/learn/c.png',
    link:"https://www.w3schools.com/c/",
  },
];

export default function LearnPage() {
  return (
    <ProtectedUserRoute>
      <div className="w-full bg-gray-50 min-h-screen py-10">
        <section className="px-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Learn Programming Languages
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between hover:shadow-lg transition min-h-[380px]"
              >
                <h2 className="text-xl font-semibold text-center mb-2">
                  {lang.title}
                </h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {lang.description}
                </p>
                <Image
                  src={lang.image}
                  alt={lang.title}
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <a
                  href={lang.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-custom inline-block text-center"
                >
                  Learn
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProtectedUserRoute>
  );
}
