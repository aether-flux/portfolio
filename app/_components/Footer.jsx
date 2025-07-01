import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary-foreground">
      <div className="flex flex-col gap-5 md:gap-20 py-10 px-4 md:p-20">
        <div className="flex gap-10 md:gap-40">
          <div>
            <h1 className="w-1/2 md:w-1/3 uppercase text-lg md:text-6xl mb-1 md:mb-2 font-extrabold text-[#E24141] tracking-[1px] md:tracking-[2px] leading-snug md:leading-tight">
              let{"'"}s work together
            </h1>
            <Link href="mailto:amartya96@proton.me">
              <h3 className="text-sm md:text-2xl font-medium text-[#D0A1A1] hover:text-[#D0A0A0]/70">
                amartya96@proton.me
              </h3>
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:gap-4">
            <Link
              className="text-md md:text-2xl font-semibold md:font-bold text-[#EDD4D4] hover:text-primary/60"
              href="/#home"
            >
              Home
            </Link>
            <Link
              className="text-md md:text-2xl font-semibold md:font-bold text-[#EDD4D4] hover:text-primary/60"
              href="/#work"
            >
              Work
            </Link>
            <Link
              className="text-md md:text-2xl font-semibold md:font-bold text-[#EDD4D4] hover:text-primary/60"
              href="/#skills"
            >
              Skills
            </Link>
            <Link
              className="text-md md:text-2xl font-semibold md:font-bold text-[#EDD4D4] hover:text-primary/60"
              href="/#experience"
            >
              Experience
            </Link>
            <Link
              className="text-md md:text-2xl font-semibold md:font-bold text-[#EDD4D4] hover:text-primary/60"
              href="/#about"
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex items-end md:items-center gap-5 md:gap-32">
          <p className="text-[#D0A0A0] text-lg md:text-xl font-semibold uppercase">
            Amartya Chowdhury
          </p>
          <div className="flex gap-3 md:gap-20">
            <a
              target="_blank"
              href="https://github.com/aether-flux"
              className="hover:text-primary/70 text-primary text-md md:text-xl font-medium"
            >
              GitHub
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/amartya-chowdhury"
              className="hover:text-primary/70 text-primary text-md md:text-xl font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
