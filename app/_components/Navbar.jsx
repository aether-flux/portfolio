"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const Navbar = () => {
  // navbar display according to screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // menu icon animation
  const [isOpen, setIsOpen] = useState(false);
  const navref = useRef(null);
  const line1 = useRef(null);
  const line2 = useRef(null);

  // Animation function for viewBox
  function animateViewBox(element, fromValues, toValues, duration) {
    const [fromX, fromY, fromWidth, fromHeight] = fromValues;
    const [toX, toY, toWidth, toHeight] = toValues;
    const startTime = performance.now();

    function animate(time) {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const currentX = fromX + (toX - fromX) * progress;
      const currentY = fromY + (toY - fromY) * progress;
      const currentWidth = fromWidth + (toWidth - fromWidth) * progress;
      const currentHeight = fromHeight + (toHeight - fromHeight) * progress;

      element.setAttribute(
        "viewBox",
        `${currentX} ${currentY} ${currentWidth} ${currentHeight}`
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Animate attributes
  function animateAttribute(element, attribute, from, to, duration) {
    const startTime = performance.now();

    function animate(time) {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = from + (to - from) * progress;

      element.setAttribute(attribute, currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Function to handle toggle
  const toggleViewBox = () => {
    const navmenu = navref.current;
    const line1Elem = line1.current;
    const line2Elem = line2.current;

    // Toggle state based on previous state
    setIsOpen((prevState) => {
      const newState = !prevState;

      if (!newState) {
        // Animate back to the menu-icon viewBox
        animateViewBox(navmenu, [0, 0, 19, 18], [0, 0, 22, 12], 500);

        // Animate attributes of line1
        animateAttribute(line1Elem, "x1", 1.29289, 0, 500);
        animateAttribute(line1Elem, "x2", 16.8492, 22, 500);
        animateAttribute(line1Elem, "y1", 17.2929, 1, 500);
        animateAttribute(line1Elem, "y2", 1.73654, 1, 500);

        // Animate attributes of line2
        animateAttribute(line2Elem, "x1", 2.70711, 0, 500);
        animateAttribute(line2Elem, "x2", 18.2635, 22, 500);
        animateAttribute(line2Elem, "y1", 1.29289, 11, 500);
        animateAttribute(line2Elem, "y2", 16.8492, 11, 500);
      } else {
        // Animate to the expanded viewBox
        animateViewBox(navmenu, [0, 0, 22, 12], [0, 0, 19, 18], 500);

        // Animate attributes of line1
        animateAttribute(line1Elem, "x1", 0, 1.29289, 500);
        animateAttribute(line1Elem, "x2", 22, 16.8492, 500);
        animateAttribute(line1Elem, "y1", 1, 17.2929, 500);
        animateAttribute(line1Elem, "y2", 1, 1.73654, 500);

        // Animate attributes of line2
        animateAttribute(line2Elem, "x1", 0, 2.70711, 500);
        animateAttribute(line2Elem, "x2", 22, 18.2635, 500);
        animateAttribute(line2Elem, "y1", 11, 1.29289, 500);
        animateAttribute(line2Elem, "y2", 11, 16.8492, 500);
      }

      return newState;
    });
  };

  return (
    <>
      <nav
        className={`w-[100dvw] md:w-full flex justify-between items-center py-6 px-6 md:px-16 ${
          isOpen ? "bg-primary/40" : "bg-primary/10"
        } backdrop-blur-2xl border-b-[1px] border-b-primary-foreground/10 fixed top-0 z-[99999]`}
      >
        <Link href="/#home">
          <Image
            src="/name.svg"
            width={180}
            height={50}
            alt="Amartya Chowdhury"
            className="min-w-[180px] min-h-[50px]"
          />
        </Link>

        <div className="flex-grow flex justify-end">
          {isMobile ? (
            <div>
              <svg
                className="nav-menu cursor-pointer hover:scale-[1.1] transition-all duration-200"
                ref={navref}
                onClick={toggleViewBox}
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  className={`line1 ${isOpen ? "line1-open" : ""}`}
                  ref={line1}
                  x1="0"
                  y1="1"
                  x2="22"
                  y2="1"
                  stroke="#FF8484"
                  strokeWidth="2"
                />
                <line
                  className={`line2 ${isOpen ? "line2-open" : ""}`}
                  ref={line2}
                  x1="0"
                  y1="11"
                  x2="22"
                  y2="11"
                  stroke="#FF8484"
                  strokeWidth="2"
                />
              </svg>
            </div>
          ) : (
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
          )}
        </div>
      </nav>

      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[-1500px]"
        } h-[100dvh] w-[75dvw] rounded-xl flex flex-col justify-center items-center gap-y-8 py-36 px-10 transform absolute bg-red-500/10 backdrop-blur-xl z-[999] transition-transform duration-300`}
      >
        <Link
          className="relative text-center font-light text-sm px-10 py-5 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/#home"
        >
          <span className="relative z-[3000] font-medium group-hover:text-primary transition-colors duration-300">
            HOME
          </span>
          <div className="absolute z-[1000] inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
        <Link
          className="relative text-center font-light text-sm px-10 py-5 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/#work"
        >
          <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
            WORK
          </span>
          <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
        <Link
          className="relative text-center font-light text-sm px-10 py-5 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/#skills"
        >
          <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
            SKILLS
          </span>
          <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
        <Link
          className="relative text-center font-light text-sm px-10 py-5 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/#experience"
        >
          <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
            EXPERIENCE
          </span>
          <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
        <Link
          className="relative text-center font-light text-sm px-10 py-5 border-[1px] rounded-full border-primary-foreground text-primary-foreground overflow-hidden group hover:scale-[1.2] transition-all duration-200 ease-in-out"
          href="/#about"
        >
          <span className="relative z-10 font-medium group-hover:text-primary transition-colors duration-300">
            ABOUT
          </span>
          <div className="absolute z-0 inset-0 bg-primary-foreground rounded-full transform scale-x-0 scale-y-0 origin-bottom group-hover:scale-x-[2] group-hover:scale-y-[2] transition-all duration-300 ease-in"></div>
        </Link>
      </div>
    </>
  );
};
