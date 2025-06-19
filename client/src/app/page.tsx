import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="mt-35 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">
        CodeNova
      </h1>

      <p className="mt-4 text-lg sm:text-2xl md:text-3xl text-gray-700 max-w-3xl">
        Sharpen your coding skills and benchmark yourself
      </p>

      <div className="mt-7">
        <Link href="/auth/signup" passHref>
          <Button
            className="bg-black text-white px-6 py-3 sm:py-6 sm:px-3 text-sm sm:text-base font-semibold rounded-md shadow-md transition-all duration-300 border border-transparent 
            hover:bg-blue-600 hover:shadow-blue-400/50 hover:shadow-lg hover:border-blue-300"
          >
            Join CodeNova Now
          </Button>
        </Link>
      </div>

      <section className="w-full overflow-hidden py-6 mt-7">
        <div className="whitespace-nowrap animate-scroll flex items-center gap-30">
          
          <Image src="/tech_logo/html.png" alt="HTML" height={100} width={100} />
          <Image src="/tech_logo/css.png" alt="CSS" height={60} width={60} />
          <Image src="/tech_logo/js.png" alt="Javascript" height={80} width={80} />
          <Image src="/tech_logo/ts.png" alt="Typescript" height={60} width={60} />
          <Image src="/tech_logo/nodejs2.png" alt="Nodejs" height={90} width={90} />
          <Image src="/tech_logo/mongodb.png" alt="MongoDb" height={90} width={90} />
          <Image src="/tech_logo/react.png" alt="React" height={60} width={60} />
          <Image src="/tech_logo/redux.png" alt="Redux" height={90} width={90} />
          <Image src="/tech_logo/next.png" alt="Next" height={120} width={120} />
          
          <Image src="/tech_logo/html.png" alt="HTML" height={100} width={100} />
          <Image src="/tech_logo/css.png" alt="CSS" height={60} width={60} />
          <Image src="/tech_logo/js.png" alt="Javascript" height={80} width={80} />
          <Image src="/tech_logo/ts.png" alt="Typescript" height={60} width={60} />
          <Image src="/tech_logo/nodejs2.png" alt="Nodejs" height={90} width={90} />
          <Image src="/tech_logo/mongodb.png" alt="MongoDb" height={90} width={90} />
          <Image src="/tech_logo/react.png" alt="React" height={60} width={60} />
          <Image src="/tech_logo/redux.png" alt="Redux" height={90} width={90} />
          <Image src="/tech_logo/next.png" alt="Next" height={120} width={120} />
          
        </div>
      </section>
      {/* Glow Divider */}
      <div className="w-screen h-24 bg-gradient-to-b from-white via-blue-400 to-[#0c0f1a]"></div>

      <section className="bg-[#0c0f1a] text-white px-6 md:px-20 py-16 font-['Playfair_Display'] w-screen">
        <div className="max-w-5xl mx-auto text-left space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight">
            Coding is the language of the future and your gateway to limitless
            possibilities.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Whether you&apos;re just starting out or looking to master advanced
            concepts, building strong coding skills empowers you to create,
            innovate, and solve real-world problems. At{" "}
            <span className="text-blue-400 font-medium">CodeNova</span>, we turn
            that journey into an experience: practice real-world challenges,
            track your growth, and join a community of passionate developers.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            From landing top tech jobs to bringing your ideas to life,{" "}
            <span className="text-blue-400 font-medium">CodeNova</span> helps
            you level up — one line at a time. Start your journey today and
            become the developer you aspire to be.
          </p>
        </div>
      </section>

      <div className="w-screen h-24 bg-gradient-to-t from-white via-blue-400 to-[#0c0f1a]"></div>

      <section className="bg-white py-20 px-6 md:px-20 text-gray-900">

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-center mb-16">
          The Developer Skills Platform
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Interactive Coding Workspace
            </h3>
            <p className="text-lg text-gray-700">
              Dive into real-world problems with a powerful coding workspace.
              Read detailed prompts, write code, test instantly, and get
              real-time feedback - all in one place.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/homePageImages/problempageUI.png"
              alt="Coding Challenges"
              className="w-full rounded-lg shadow-md"
              height={800}
              width={1000}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <Image
              src="/homePageImages/submit.png"
              alt="Progress Tracking"
              className="w-full rounded-lg shadow-md"
              height={800}
              width={1000}
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Submit & Analyze Your Code
            </h3>
            <p className="text-lg text-gray-700">
              Go beyond just submitting. Run your solution against all test
              cases, and get instant results with execution time and complexity
              analysis to fine-tune your code.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 pt-20">
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Track Every Attempt
            </h3>
            <p className="text-lg text-gray-700">
              Review all your submissions for every problem - successes and
              failures alike. Analyze your journey, learn from mistakes, and
              monitor your improvement over time.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/homePageImages/submission.png"
              alt="Coding Challenges"
              className="w-full rounded-lg shadow-md"
              height={800}
              width={1000}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <Image
              src="/homePageImages/profile.png"
              alt="Progress Tracking"
              className="w-full rounded-lg shadow-md"
              height={800}
              width={1000}
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Your Coding Journey, All in One Place
            </h3>
            <p className="text-lg text-gray-700">
              Access your complete profile with rank, solved problems by
              difficulty, submission stats, and earned badges. Track progress,
              update info, and showcase your growth.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 pt-20">
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-700">
              Visualize Your Consistency
            </h3>
            <p className="text-lg text-gray-700">
              See your coding activity come to life! The submission heatmap
              displays your daily commitment and consistency over the past year
              - one box at a time.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/homePageImages/heatmap.png"
              alt="Coding Challenges"
              className="w-full rounded-lg shadow-md"
              height={800}
              width={1000}
            />
          </div>
        </div>
      </section>
      <footer className="w-screen bg-[#0c0f1a] text-gray-400 text-sm py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="CodeNova Logo" width={30} height={30} />
            <span className="text-white text-base font-semibold">CodeNova</span>
          </div>

          <p className="text-center">
            © CodeNova {new Date().getFullYear()} | All Rights Reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
