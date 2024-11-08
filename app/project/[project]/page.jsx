"use client";

import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";
import projectsData from "@/data/projectData.json";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Carousel } from "@/app/_components/Carousel";

export default function ProjectPage() {
  const { project } = useParams();

  const projData = projectsData.find((p) => p.slug === project);
  console.log(projData);

  if (!projData) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-10 px-20 mt-32">
        <div>
          <h4 className="text-md font-medium uppercase tracking-[2px]">
            project
          </h4>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-extrabold uppercase tracking-[4px]">
              {projData.title}
            </h2>
            {projData.hosted && (
              <Link
                href={projData.hosted}
                target="_blank"
                className="hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
              >
                <Image
                  src="/icons/rightUpArr.svg"
                  width={20}
                  height={20}
                  alt="View Live"
                />
              </Link>
            )}
          </div>
        </div>

        {/* <div className="flex justify-center items-center">
          <Image
            src={projData.img}
            alt="landing page of inked"
            width={1024}
            height={500}
            className="rounded-xl"
          />
        </div> */}

        {projData.img && projData.img.length > 0 ? (
          <Carousel imgs={projData.img} />
        ) : (
          <p>No images available for this project.</p>
        )}

        <p className="text-lg font-normal w-1/2">{projData.desc}</p>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-[1px]">Tools Used</h3>
          <ul className="list-disc pl-8">
            {projData.tools.map((tool) => (
              <li key={tool.index}>{tool.name}</li>
            ))}
          </ul>
        </div>

        {projData.github && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-[1px]">
              GitHub Repo
            </h3>
            <Link
              className="text-lg font-normal hover:text-primary-foreground/80"
              href={projData.github}
              target="_blank"
            >
              {projData.github}
            </Link>
          </div>
        )}

        {projData.hosted && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-[1px]">
              Live Website
            </h3>
            <Link
              className="text-lg font-normal hover:text-primary-foreground/80"
              href={projData.hosted}
              target="_blank"
            >
              {projData.hosted}
            </Link>
          </div>
        )}
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}
