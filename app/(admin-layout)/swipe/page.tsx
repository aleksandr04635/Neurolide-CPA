"use client";
import React, { useState } from "react";

import { useSwipeable } from "react-swipeable";

//import "./styles.css";

type Props = {};

const Page = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const divs = ["Div 1", "Div 2", "Div 3", "Div 4", "Div 5"];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length);
    },

    onSwipedRight: () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + divs.length) % divs.length
      );
    },
  });

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full"
      {...handlers}
    >
      <div className="w-full flex flex-row items-center justify-between z-1 absolute px-2">
        <button
          className="bg-red-500 text-white p-1 rounded-lg"
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + divs.length) % divs.length
            )
          }
        >
          {"<"}
        </button>

        <button
          className="bg-green-500 text-white p-1 rounded-lg ml-4"
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % divs.length)
          }
        >
          {">"}
        </button>
      </div>
      {divs.map((div, index) => (
        <div
          key={index}
          className={`w-full h-full bg-blue-500 text-white text-center flex flex-col items-center justify-center ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          {div}
        </div>
      ))}
    </div>
  );
};

export default Page;
