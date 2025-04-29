/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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