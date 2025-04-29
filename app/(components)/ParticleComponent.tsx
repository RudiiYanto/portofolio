/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { log } from "node:console";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.



const ParticlesComponent = ({className, isActive = false, maxClicks = 10 }: {className? : string, isActive : boolean, maxClicks? : number}) => {


  const [init, setInit] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleParticleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
    } else {
      console.log("Batas klik tercapai!");
    }
  };
  
  const particlesLoaded = useCallback((container: any) => {
    if (container && container.interactivity) {
      container.interactivity.element.addEventListener("click", handleParticleClick);
    }
  }, [handleParticleClick]);

  

  const options : any = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "#1b1b1b",
      //   },
      // },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["repulse", "grab"],
          },
        },
        modes: {
          bubble: {
            distance: 100, // Radius gelembung
            duration: 2, // Durasi efek gelembung
            opacity: 0.8, // Opacity gelembung
            size: 15, // Ukuran gelembung
          },
          repulse: {
            distance: 110, // Radius dorongan
            duration: 1, // Durasi efek dorongan
          },
          grab: {
            distance: 170, // Radius tarikan
            lineLinked: {
              opacity: 1, // Opacity garis
            },
          }
        },
      },
      particles: {
        // color: {
        //   value: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFFF33"], // Warna variatif
        // },
        links: {
          color: ["#f0f0f0"],
          distance: 240,
          enable: true,
          opacity: 0.4,
          width: 1.1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: { min: 1, max: 3 },
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        opacity: {
          value: 1.0,
        },
        
        size: {
          value: { min: 5, max: 10 },
        },
      },
      detectRetina: true,
    }),
    [maxClicks, clickCount],
  );

  const handleClick = () => {
    if (clickCount < maxClicks) {
      setClickCount((prev) => prev + 1);
    } else {
      console.log("Max clicks reached");
    }
  };
  

  if (!isActive) return null;

  return (
    <div onClick={handleClick}>
      <Particles className={className} options={options} />
    </div>


  )
  
  
  
};

export default ParticlesComponent;