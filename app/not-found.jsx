import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <nav className="w-screen flex justify-center py-5 md:py-10 mb-5 md:mb-10">
        <Link href="/">
          <Image src="/name.svg" width={200} height={53.85} alt="Logo" />
        </Link>
      </nav>

      <div className="flex flex-col items-center justify-center w-screen">
        <h1 className="uppercase text-6xl font-extrabold tracking-[2px]">
          404
        </h1>

        <Image
          src="/star.svg"
          width={200}
          height={200}
          alt="Star icon"
          className="mt-6"
        />

        <h3 className="uppercase text-3xl font-semibold mt-6">uh-oh!</h3>

        <p className="text-lg mt-3 w-[55%] text-center">
          The page you{"’"}re looking for was not found.
        </p>

        <Link
          className="relative text-center font-light text-sm px-10 py-3 mt-10 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/"
        >
          <span className="relative z-[3000] font-medium group-hover:text-primary transition-colors duration-300">
            RETURN HOME
          </span>
          <div className="absolute z-[1000] inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
