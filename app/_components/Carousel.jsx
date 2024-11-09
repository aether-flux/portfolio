"use client";

import Image from "next/image";
import { useState } from "react";

export const Carousel = ({ imgs }) => {
  const [curInd, setCurInd] = useState(0);

  const handleNext = () => {
    setCurInd((prevInd) => (prevInd + 1) % imgs.length);
  };

  const handlePrev = () => {
    setCurInd((prevInd) => {
      return prevInd === 0 ? imgs.length - 1 : prevInd - 1;
    });
  };

  if (!imgs || imgs.length === 0) return null;

  return (
    <>
      {/* <div className="relative w-full overflow-hidden">
        <div className="w-full flex justify-between md:justify-center items-center">
          <Image
            src={imgs[curInd]}
            alt={`Project Image ${curInd + 1}`}
            //   layout="fill"
            //   objectFit="cover"
            width={1024}
            height={500}
            className="rounded-2xl"
          />
        </div>

        {imgs.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary-foreground/10 p-4 rounded-full hover:bg-primary-foreground/20 transition-all duration-150"
            >
              <Image
                src="/icons/leftArr.svg"
                width={20}
                height={20}
                alt="previous image"
              />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary-foreground/10 p-4 rounded-full hover:bg-primary-foreground/20 transition-all duration-150"
            >
              <Image
                src="/icons/rightArr.svg"
                width={20}
                height={20}
                alt="next image"
              />
            </button>
          </>
        )}
      </div> */}

      <div className="relative flex items-center w-full px-16 md:px-20">
        {/* Navigation Buttons */}
        {imgs.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-2 top-1/2 -translate-y-1/2 bg-primary-foreground/10 p-4 rounded-full hover:bg-primary-foreground/20 transition-all duration-150"
            >
              <Image
                src="/icons/leftArr.svg"
                width={20}
                height={20}
                alt="previous image"
              />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-2 top-1/2 -translate-y-1/2 bg-primary-foreground/10 p-4 rounded-full hover:bg-primary-foreground/20 transition-all duration-150"
            >
              <Image
                src="/icons/rightArr.svg"
                width={20}
                height={20}
                alt="next image"
              />
            </button>
          </>
        )}

        {/* Main Image Container */}
        <div className="w-full flex justify-between md:justify-center items-center">
          <Image
            src={imgs[curInd]}
            alt={`Project Image ${curInd + 1}`}
            width={1024}
            height={500}
            className="rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};
