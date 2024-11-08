"use client";

import Image from "next/image";
import { useState } from "react";

export const WorkBlock = ({ title, desc, img }) => {
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [showImg, setShowImg] = useState(false);

  const handleMouseMove = (e) => {
    setImgPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setShowImg(true);
  };

  const handleMouseLeave = () => {
    setShowImg(false);
  };

  return (
    <div
      className="relative group overflow-hidden px-10 md:px-20 py-4 cursor-pointer border-b-[1px] border-b-primary-foreground/10"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-primary-foreground transition-all duration-300 ease-in-out transform scale-y-0 origin-bottom group-hover:scale-y-100"></div>

      <div className="relative z-10">
        <h2 className="uppercase text-2xl md:text-4xl tracking-[2px] mb-3 group-hover:text-primary">
          {title}
        </h2>
        <p className="text-md md:text-xl font-light mb-2 group-hover:text-primary">
          {desc}
        </p>
      </div>

      {showImg && (
        <Image
          src={img}
          alt={`${title} display image`}
          width={307}
          height={150}
          style={{
            position: "fixed",
            left: imgPos.x,
            top: imgPos.y,
            transform: "translate(-50%, -50%)",
            transformOrigin: "center",
            pointerEvents: "none",
          }}
          className="rounded-md transition-transform scale-0 group-hover:scale-100 duration-500 ease-in-out z-[50]"
        />
      )}
    </div>
  );
};
