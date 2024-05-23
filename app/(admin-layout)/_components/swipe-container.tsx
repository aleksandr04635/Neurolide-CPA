"use client";
import React, { useState } from "react";

import { useSwipeable } from "react-swipeable";

//import "./styles.css";

type Props = { list: React.ReactNode[] };

const SwipeContainer = ({ list }: Props) => {
  console.log("list form  SwipeContainer: ", list);
  const [currentIndex, setCurrentIndex] = useState(0);

  const divs = ["Div 1", "Div 2", "Div 3", "Div 4", "Div 5"];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
    },

    onSwipedRight: () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + list.length) % list.length
      );
    },
  });
  if (list && list.length > 0) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full h-full px-2"
        {...handlers}
      >
        {/* {divs.map((div, index) => (
        <div
          key={index}
          className={`w-full h-full bg-blue-500 text-white text-center flex flex-col items-center justify-center ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          {div}
        </div>
      ))} */}
        {list.map((div, index) => (
          <div
            key={index}
            className={` w-full h-full  text-center flex flex-col items-center justify-center px-1 ${
              index === currentIndex ? "block" : "hidden"
            }
          `}
          >
            {div}
          </div>
        ))}
        <div className="w-full flex flex-row items-center justify-between absolute ">
          {/* <button
            className="bg-red-500 text-white p-1 rounded-lg"
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + list.length) % list.length
              )
            }
          >
            {"<"}
          </button>

          <button
            className="bg-green-500 text-white p-1 rounded-lg ml-4"
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length)
            }
          >
            {">"}
          </button> */}
          <button
            className="bg-transparent  p-1"
            onClick={() =>
              setCurrentIndex(
                (prevIndex) => (prevIndex - 1 + list.length) % list.length
              )
            }
          >
            <svg
              width="7"
              height="32"
              viewBox="0 0 7 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L1 16L6 31"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            className="bg-transparent p-1 "
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length)
            }
          >
            <svg
              width="7"
              height="32"
              viewBox="0 0 7 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.999999 31L6 16L1 1"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default SwipeContainer;
