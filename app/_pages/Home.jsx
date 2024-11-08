"use client";

import { Navbar } from "@/app/_components/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export const Home = () => {
  useGSAP(() => {
    gsap.from(".home-intro", {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: "linear",
    });
    gsap.to(".home-star", {
      rotation: "+=90",
      duration: 5,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".scroll-down", {
      y: -5,
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });
  });

  return (
    <section id="home">
      <div className="flex flex-col justify-between h-auto md:h-[100dvh] pb-20">
        <Navbar />
        <div className="flex w-full flex-row-reverse px-20 md:mt-40 invisible md:visible">
          <Image
            src="/star.svg"
            alt="star"
            className="star home-star"
            width={290}
            height={290}
          />
        </div>
        <div className="w-full flex justify-between items-end px-10 md:px-20">
          <p className="home-intro w-[100%] md:w-[50%] tracking-[2px] leading-snug text-2xl md:text-4xl md:text-left font-extralight uppercase text-[#372F2D]">
            I am a{" "}
            <span className="font-normal text-[#732626]">
              Fullstack developer
            </span>{" "}
            skilled in{" "}
            <span className="font-normal text-[#732626]">next.js</span> and{" "}
            <span className="font-normal text-[#732626]">express</span> and i
            build <span className="font-normal text-[#732626]">websites</span>{" "}
            to solve problems{" "}
            <span className="font-normal text-[#732626]">efficiently</span>
          </p>
          <Image
            src="/scroll-down.svg"
            alt="scroll down"
            className="scroll-down invisible md:visible"
            width={45}
            height={80}
          />
        </div>
      </div>
    </section>
  );
};
