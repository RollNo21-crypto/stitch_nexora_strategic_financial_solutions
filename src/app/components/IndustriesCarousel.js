"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CARDS = [
  {
    title: "Manufacturing",
    description:
      "Optimizing supply chains and capital structure for industrial resilience in a global market.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3p6Wh5yj2GEoQTaVV3NSBIgoAr3ywE5y4T9kMPGedS0LC19MfGwlKDOE3wUl9adyqBxjtCU2PAWq78cLxlnLbeQBHprr5zul03AqzqBXThH9GxopIEzklBDU_42k5xqIv22w5bCPa9NpMkX5YtSW3jv9ht-FYidnB2OEBNMDLcmkoA3dpZGgGsf6x4KInD-DkNUh9lDH4LV1mpyFK90roYG3KozgGGZHdWEKMqrdHje7fwNtlDH35UWka9hkGzj8amo7oxduX1rA",
  },
  {
    title: "Technology",
    description:
      "Strategic advisory for fast-scaling digital enterprises and complex SaaS revenue models.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ_PKv3wgs3ersW3Uo4FYMeLS_GcPYuJr6VReC2Iz9nncdw8yrbxlovUwLGvEcDA4Ll3eLb3Fu9pzYVtIx7q0-Wq_5iJlbvLxenyNJYaLV8waaB_lwC6E538ip2Sd3NGqrf7nx5wQIsWSCBsp3jkzLbqfSMZpuxHEo0vNnVGXMTIsqf613NvKkrfkn3cpABYzih40dCO04qi3v9BMyanNsxR1HonDStarV18q1ra2M3f5Tsdrgy3qxf7M5f5jyrsOkUT6TKM9xx4w",
  },
  {
    title: "Healthcare",
    description:
      "Navigating regulatory compliance and financial modeling for large-scale medical providers.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGk3Wd0Oyn2NvltVnNZycH9XlKQsTdQFIUlSSQLPMEKxZXJOA-JioXgqM2vBkBsIAgk6ZLRCjv96PWyqYXCbpyLEujjlqmmMwBtAc2o-4Ji9UyMF5NirAoSWsexaLNRa8gqi6MV7A-wtN2PtR5bpQfBIJgu-ejOaquQDAd0co03YDMAXnp7CslFgenKXFJbje-YLy9ZHWfnouwf2Iz1e1oOC_DHHIpUxz3jChSElwD3YvlSPuIomzVv9uD2dpa3UzbEyol5YSU00",
  },
  {
    title: "Real Estate",
    description:
      "Tax-efficient structures for commercial portfolios and residential developments.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0xNGBPzPT4WVNDH8HVHbdaZzfUGWRPTXhvDzQWvcWY9TWS1HkdB1T4MXdoOJRCEF7xjihVHJeRZxKjB4CW6JaVbOMfPW5hYeCnKoyXLk5xbgjp6JXoQDcw_nGcHkk-GdSEKBY7qtRsRE-cIDFPIggf7nrzDLXMX9WAXFanjWJ9ns_LY3Kgk_2Wi8wyK-6EZ0niwaSWZ8bgEw2HBHWHgwGBAB6bI3-uwLEs2ObkFAkV0X61B-WocZlXdGHdSYZgLIeHDOJDZq5nZ4",
  },
  {
    title: "Energy",
    description:
      "Financing strategies and risk mitigation for the transition to renewable resources.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB462AFOmmKatNDe5GJUSO3g3wtXhfVj7atd7YsBC11drvSxPj5Ef0aB_v0-s8CizGjWOaSXVu_XUq1EnQtIY9c4-Sz1UxTa2gmndr0-UzkzDb9VcGuy-U-dYsfPVQlwSjlaMBaEFdyOI-HZAcRFNRKE-VrVmvixZGMDG1JDaQ4TOpAO0wBzk_PQ2O_lFJVGwxx9wike2XcdRphI9gOtsE76WaSkxZQlN2ebMABGN09KM4ZsMk9aDrRaThTnN2c8Y2EybxQkhtxYwQ",
  },
  {
    title: "Financial Services",
    description:
      "End-to-end advisory for banks, asset managers, and insurance groups navigating macro volatility.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl35xu9xFH6GAmLh0jaoC_bQO6tluvQ-1RyV2maVVU1hdY9e2S8Z21AbdfNs7PzBLcr1K5JfwcSuEchgbRwpe2rAtJSA2u5eFFSVFQbeOpXRSkOAeX8Usi59KYsosBNDZXK4WrK5KMh2Eh46OHazAzZo7hVXQ5aRkvvpWwaJPPau8mlN5CyRyYlsV9nhqQ3-laWaF__kJvf0DfHe2UHXOhJaHp7liKYuTMLTyUhoO2rJESHFN2eWfYhOzTPW6-_3g3z4dYvF1_7u4",
  },
];

// Duplicate cards for seamless infinite scroll
const ALL_CARDS = [...CARDS, ...CARDS];

const CARD_WIDTH = 396; // 380px card + 16px gap
const LOOP_TOTAL = CARDS.length * CARD_WIDTH; // distance of one full set

export default function IndustriesCarousel() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const xRef = useRef(0); // current pixel offset

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start auto-scroll from 0
    tweenRef.current = gsap.to(xRef, {
      current: -LOOP_TOTAL,
      duration: 30,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        // Wrap: keep x between -LOOP_TOTAL and 0
        let x = xRef.current % -LOOP_TOTAL;
        if (x > 0) x -= LOOP_TOTAL;
        gsap.set(track, { x });
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const nudge = useCallback((direction) => {
    if (!tweenRef.current) return;

    // Temporarily slow down / speed the tween by adjusting timeScale
    // Then snap x by adjusting the target with a short tween
    const track = trackRef.current;
    const currentX = gsap.getProperty(track, "x");
    const targetX = currentX + direction * CARD_WIDTH;

    // Pause auto-loop briefly, animate to target, then resume
    tweenRef.current.pause();
    gsap.to(track, {
      x: targetX,
      duration: 0.55,
      ease: "power3.inOut",
      onUpdate: () => {
        // Keep xRef in sync so the loop formula stays correct on resume
        xRef.current = gsap.getProperty(track, "x");
      },
      onComplete: () => {
        tweenRef.current.resume();
      },
    });
  }, []);

  return (
    <section
      className="py-40 bg-surface-container-low border-y border-outline-variant/20 overflow-hidden"
      id="industries-section"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight split-animate-scroll">
          Industries We Serve
        </h2>
        <p className="font-body text-lg text-on-surface-variant mt-6 max-w-2xl mx-auto leading-relaxed split-animate-scroll">
          Architecting precision-engineered solutions across the global economic
          landscape, from industrial manufacturing to digital-first technology
          sectors.
        </p>
      </div>

      {/* Track */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: `${ALL_CARDS.length * CARD_WIDTH}px` }}
        >
          {ALL_CARDS.map((card, i) => (
            <div
              key={i}
              className="flex-none w-[380px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={card.img}
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-8">
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">
                  {card.title}
                </h3>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
                <div className="h-1 w-12 bg-primary/20 group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex justify-end gap-4">
        <button
          onClick={() => nudge(1)}
          aria-label="Previous"
          className="p-3 border border-outline-variant/30 rounded-full hover:bg-surface-container-highest transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform block">
            west
          </span>
        </button>
        <button
          onClick={() => nudge(-1)}
          aria-label="Next"
          className="p-3 border border-outline-variant/30 rounded-full hover:bg-surface-container-highest transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform block">
            east
          </span>
        </button>
      </div>
    </section>
  );
}
