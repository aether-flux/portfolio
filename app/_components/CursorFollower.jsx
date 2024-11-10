"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorFollower() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    const growCursor = () => {
      gsap.to(cursor, {
        scale: 3,
        backgroundColor: "rgb(226, 65, 65, 0.7)",
        border: "none",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const shrinkCursor = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "transparent",
        border: "2px solid #E24141",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const addEventListeners = () => {
      document.addEventListener("mousemove", moveCursor);
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener("mouseenter", growCursor);
        el.addEventListener("mouseleave", shrinkCursor);
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener("mouseenter", growCursor);
        el.removeEventListener("mouseleave", shrinkCursor);
      });
    };

    // Set cursor position to center
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="invisible md:visible fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[999999] border-2 border-[#E24141]"
      ></div>
      <div
        ref={cursorDotRef}
        className="invisible md:visible fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[999999] bg-primary-foreground"
      ></div>
    </>
  );
}
