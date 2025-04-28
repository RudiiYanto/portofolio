<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useNavContext } from "../context/navContext";

const TOTAL_BLOCKS = 20; // jumlah kotak di progress bar
const UPDATE_INTERVAL = 50; // ms per update

const LoadingScreenFirstOpen: React.FC = () => {
  const { isLoading, setIsLoading } = useNavContext();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const id = setInterval(() => {
      setPercent((prev) => {
        const next = prev + Math.ceil(100 / TOTAL_BLOCKS);
        return next >= 100 ? 100 : next;
      });
    }, UPDATE_INTERVAL);

    if (percent >= 100) {
      clearInterval(id);
      setTimeout(() => setIsLoading(false), 300);
    }

    return () => clearInterval(id);
  }, [percent, isLoading, setIsLoading]);

  if (!isLoading) return null;

  const filledBlocks = Math.floor((percent / 100) * TOTAL_BLOCKS);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50">
      {/* Text and percentage container posisi di atas bar, rata tengah */}
      <div className="w-3/4 max-w-lg flex justify-between mb-4 font-mono text-white text-xl">
        <span>LOADING...</span>
        <span>{percent}%</span>
      </div>
      {/* Progress bar kotak-kotak */}
      <div className="w-3/4 max-w-lg h-8 border-2 border-white flex">
        {Array.from({ length: TOTAL_BLOCKS }).map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 m-[1px] ${
              idx < filledBlocks ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreenFirstOpen;
=======
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavContext } from "../context/navContext";

const LoadingScreenFirstOpen = () => {
  const { isLoading, setIsLoading } = useNavContext();
 
  // setting angka pada counter
  useEffect(() => {
    // counter value
    function counterValue() {
        let counter : any = document.querySelector(".counter");
        let currentValue = 0

        function updateCounter() {
            if(currentValue === 100) {
                return
            }
            
            currentValue += Math.floor(Math.random() * 10) + 1;

            if(currentValue > 100) {
                currentValue = 100
            }

            // mengisi counter element
            counter.textContent = currentValue;

            let delay = Math.floor(Math.random() * 200) + 50;

            setTimeout(updateCounter, delay)

        }

        updateCounter();
    }

    counterValue();

    gsap.to(".counter", {
        duration : 0.25,
        delay : 3.5,
        opacity : 0,
    })

    // gsap.to(".overlay", {
    //     duration
    // })

    gsap.to(".bar", 1.5,{
        delay : 3.5,
        height : 0,
        stagger: {
            amount : 1
        },
        onComplete: () => { 
            setIsLoading(false)
        }
       
    })



  }, [setIsLoading]);

  

  return (
    <div className={`container-loading ${isLoading ? "" : "hidden"}`}>
        <h1 className="counter fixed w-ful h-full flex justify-end items-end z-[9999] right-0 px-16 py-36 text-[80px] font-bold"></h1>
        <div className="overlay-loading flex h-screen w-screen fixed top-0 left-0 z-[1000]">
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
            <div className="bar h-[105vh] w-[10vw] bg-gradient-to-b from-secondary via-secondary to-variatif_secondary"></div>
        </div>
    </div>
    
  );
};

export default LoadingScreenFirstOpen;
>>>>>>> e699ee062ca53a49d1b4b3391bb1cfc4af9af421
