"use client";

import { Navbar } from "@/app/_components/Navbar";
import { Footer } from "@/app/_components/Footer";
import projectsData from "@/data/projectData.json";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Carousel } from "@/app/_components/Carousel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ProjectPage() {
  const { project } = useParams();
  const projData = projectsData.find((p) => p.slug === project);

  useGSAP(() => {
    gsap.from(".project-subt", {
      y: -20,
      opacity: 0,
      duration: 0.4,
    });
    gsap.from(".project-title", {
      y: -10,
      opacity: 0,
      duration: 0.4,
      delay: 0.2,
    });
    gsap.from(".diagArr", {
      y: 20,
      x: -20,
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
    });
    gsap.from(".other-content", {
      opacity: 0,
      duration: 0.4,
      delay: 0.9,
    });
  });

  if (!projData) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-10 px-10 md:px-20 mt-32">
        <div>
          <h4 className="project-subt text-md font-medium uppercase tracking-[2px]">
            project
          </h4>
          <div className="flex items-center gap-4">
            <h2 className="project-title text-4xl font-extrabold uppercase tracking-[4px]">
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
                  className="diagArr"
                />
              </Link>
            )}
          </div>
        </div>

        <div className="other-content">
          {projData.img && projData.img.length > 0 ? (
            <Carousel imgs={projData.img} />
          ) : (
            <p>No images available for this project.</p>
          )}
        </div>

        <p className="other-content text-lg font-normal w-5/6 md:w-1/2">
          {projData.desc}
        </p>

        <div className="other-content flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-[1px]">Tools Used</h3>
          <ul className="list-disc pl-8">
            {projData.tools.map((tool) => (
              <li key={tool.index}>{tool.name}</li>
            ))}
          </ul>
        </div>

        {projData.github && (
          <div className="other-content flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-[1px]">
              GitHub Repo
            </h3>
            <Link
              className="text-lg font-normal underline hover:no-underline"
              href={projData.github}
              target="_blank"
            >
              {projData.github}
            </Link>
          </div>
        )}

        {projData.hosted && (
          <div className="other-content flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-[1px]">
              Live Website
            </h3>
            <Link
              className="text-lg font-normal underline hover:no-underline"
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
