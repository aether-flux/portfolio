import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <nav className="w-full flex justify-between items-center py-6 px-16 bg-primary/10 backdrop-blur-2xl border-b-[1px] border-b-primary-foreground/10 fixed top-0 z-[99999]">
        <Link href="/#home">
          <Image
            src="/name.svg"
            width={180}
            height={50}
            alt="Amartya Chowdhury"
          />
        </Link>
        <div className="flex items-center gap-10">
          <Link
            className="relative font-light text-sm px-5 py-2 border-[1px] rounded-3xl border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
            href="/#home"
          >
            <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
              HOME
            </span>
            <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
          </Link>
          <Link
            className="relative font-light text-sm px-5 py-2 border-[1px] rounded-3xl border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
            href="/#work"
          >
            <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
              WORK
            </span>
            <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
          </Link>
          <Link
            className="relative font-light text-sm px-5 py-2 border-[1px] rounded-3xl border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
            href="/#skills"
          >
            <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
              SKILLS
            </span>
            <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
          </Link>
          <Link
            className="relative font-light text-sm px-5 py-2 border-[1px] rounded-3xl border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
            href="/#experience"
          >
            <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
              EXPERIENCE
            </span>
            <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
          </Link>
          <Link
            className="relative font-light text-sm px-5 py-2 border-[1px] rounded-3xl border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
            href="/#about"
          >
            <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
              ABOUT
            </span>
            <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
          </Link>
        </div>
      </nav>
    </>
  );
};
