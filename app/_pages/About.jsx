"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export const About = () => {
  useGSAP(() => {
    gsap.to(".about-star", {
      rotation: "-=90",
      duration: 5,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <section id="about">
      <div className="px-10 md:px-20 my-10">
        <div className="flex justify-between">
          <div className="flex flex-col items-start gap-8">
            <div className="flex items-center justify-center">
              <h1 className="uppercase text-3xl md:text-5xl font-extrabold tracking-[2px]">
                About Me
              </h1>
            </div>
            <div className="text-md md:text-xl font-light">
              <p className="mb-10 w-5/6 md:w-1/2">
                Hey there! I{"’"}m Amartya Chowdhury, a full-stack developer
                from <span className="font-medium">West Bengal, India</span>.
                Currently, I{"’"}m navigating the wild waters of B.Tech in{" "}
                <span className="font-medium">Computer Science</span> at{" "}
                <span className="font-medium">Asansol Engineering College</span>{" "}
                (2nd-year survivor!).
              </p>
            </div>

            <div className="text-md md:text-xl font-light flex flex-col items-end">
              <h3 className="uppercase text-xl md:text-3xl font-bold mb-4 tracking-[1px]">
                My Journey
              </h3>
              <p className="mb-6 text-right w-5/6 md:w-1/2">
                It all began in my first year with the{" "}
                <span className="font-medium">MERN stack</span>—my gateway to
                the world of web dev. Fast forward to now, and my skillset has
                grown to include{" "}
                <span className="font-medium">
                  Express, React.js, Next.js, MongoDB, TailwindCSS, Firebase,
                  Convex, GSAP...
                </span>{" "}
                and counting! Learning new tech is kind of my thing.
              </p>
            </div>

            <div className="text-md md:text-xl font-light">
              <h3 className="uppercase text-xl md:text-3xl font-bold mb-4 tracking-[1px]">
                Beyond Coding
              </h3>
              <p className="mb-6 w-5/6 md:w-1/2">
                When I{"’"}m not knee-deep in code, you might catch me tuning
                into my favorite playlists or pretending I am a poet. Coding is
                my main groove, but who knows? Someday I might surprise myself
                with a masterpiece!
              </p>
            </div>
            <Image
              src="/star.svg"
              className="star about-star"
              width={50}
              height={50}
              alt="star"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
