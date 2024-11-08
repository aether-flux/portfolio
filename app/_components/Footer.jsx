import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary-foreground">
      <div className="flex flex-col gap-10 md:gap-20 p-10 md:p-20">
        <div className="flex gap-16 md:gap-40">
          <div>
            <h1 className="w-1/2 md:w-1/3 uppercase text-2xl md:text-6xl mb-1 md:mb-2 font-extrabold text-[#E24141]">
              let{"'"}s work together
            </h1>
            <h3 className="text-lg md:text-2xl font-medium text-[#D0A1A1]">
              amartya96@proton.me
            </h3>
          </div>
          <div className="flex flex-col gap-2 md:gap-6">
            <Link
              className="text-lg md:text-2xl font-bold text-[#EDD4D4]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-lg md:text-2xl font-bold text-[#EDD4D4]"
              href="/"
            >
              About
            </Link>
            <Link
              className="text-lg md:text-2xl font-bold text-[#EDD4D4]"
              href="/"
            >
              Work
            </Link>
          </div>
        </div>
        <div className="flex items-end md:items-center gap-10 md:gap-32">
          <p className="text-[#D0A0A0] text-lg md:text-xl font-semibold uppercase">
            Amartya Chowdhury
          </p>
          <div className="flex gap-10 md:gap-20">
            <a
              target="_blank"
              href="https://github.com/widewipe"
              className="text-[#D0A0A0] text-md md:text-xl font-medium"
            >
              Github
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/amartya-chowdhury"
              className="text-[#D0A0A0] text-md md:text-xl font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
