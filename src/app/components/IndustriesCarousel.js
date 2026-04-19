"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    title: "Manufacturing",
    icon: "factory",
    description: "Optimizing supply chains and capital structure for industrial resilience in a global market.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&fit=crop",
  },
  {
    title: "Technology",
    icon: "memory",
    description: "Strategic advisory for fast-scaling digital enterprises and complex SaaS revenue models.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&fit=crop",
  },
  {
    title: "Healthcare",
    icon: "health_and_safety",
    description: "Navigating regulatory compliance and financial modeling for large-scale medical providers.",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80&fit=crop",
  },
  {
    title: "Real Estate",
    icon: "apartment",
    description: "Tax-efficient structures for commercial portfolios and residential developments.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&fit=crop",
  },
  {
    title: "Energy",
    icon: "bolt",
    description: "Financing strategies and risk mitigation for the transition to renewable resources.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&fit=crop",
  },
  {
    title: "Financial Services",
    icon: "account_balance",
    description: "End-to-end advisory for banks, asset managers, and insurance groups navigating macro volatility.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&fit=crop",
  },
];

// ─── Premium Card (shared by desktop + mobile) ────────────────────────────────

function IndustryCard({ card, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{ background: "#00193c" }}
    >
      {/* Full-bleed image */}
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />

      {/* Gradient overlay — dark navy at bottom, fades up */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,25,60,0.25) 0%, rgba(0,25,60,0.7) 50%, rgba(0,25,60,0.97) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">

        {/* Top row: icon */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: 28 }}>
              {card.icon}
            </span>
          </div>
        </div>

        {/* Bottom content block */}
        <div className="mt-auto">
          <h3 className="text-white font-headline text-2xl font-bold tracking-tight mb-2">
            {card.title}
          </h3>
          <p className="text-white font-body text-base leading-relaxed opacity-85 max-w-[95%]">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop: GSAP Infinite Auto-scroll Ticker ────────────────────────────────

const ALL_CARDS = [...CARDS, ...CARDS];
const CARD_WIDTH = 360; // card width + gap
const LOOP_TOTAL = CARDS.length * CARD_WIDTH;

function DesktopCarousel() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const xRef = useRef(0);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    tweenRef.current = gsap.to(xRef, {
      current: -LOOP_TOTAL,
      duration: 32,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        let x = xRef.current % -LOOP_TOTAL;
        if (x > 0) x -= LOOP_TOTAL;
        gsap.set(track, { x });
      },
    });

    return () => tweenRef.current?.kill();
  }, []);

  const nudge = useCallback((direction) => {
    if (!tweenRef.current) return;
    const track = trackRef.current;
    const currentX = gsap.getProperty(track, "x");
    const targetX = currentX + direction * CARD_WIDTH;
    tweenRef.current.pause();
    gsap.to(track, {
      x: targetX,
      duration: 0.55,
      ease: "power3.inOut",
      onUpdate: () => {
        xRef.current = gsap.getProperty(track, "x");
      },
      onComplete: () => tweenRef.current.resume(),
    });
  }, []);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: `${ALL_CARDS.length * CARD_WIDTH}px` }}
        >
          {ALL_CARDS.map((card, i) => (
            <div key={i} className="flex-none" style={{ width: CARD_WIDTH - 16 }}>
              <IndustryCard card={card} className="h-[420px] group hover:scale-[1.01] transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

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
    </>
  );
}

// ─── Mobile: Framer Motion Sticky Stack ───────────────────────────────────────
//
//  ① Plain <div>  → position:sticky + z-index   (no transforms here)
//  ② motion.div   → scale only                  (no position here)
//  Container: plain block, explicit height, NO overflow:hidden

const STICKY_BASE = 60;
const STICKY_STEP = 26;
const CONTAINER_HEIGHT = CARDS.length * 600;

function MobileCard({ card, i, progress }) {
  const rangeStart = i / CARDS.length;
  const targetScale = Math.max(0.78, 1 - (CARDS.length - 1 - i) * 0.044);
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div
      style={{
        position: "sticky",
        top: STICKY_BASE + i * STICKY_STEP,
        zIndex: i + 1,
      }}
    >
      <motion.div style={{ scale, transformOrigin: "top center" }}>
        <IndustryCard card={card} className="h-[420px]" />
      </motion.div>
    </div>
  );
}

function MobileStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: CONTAINER_HEIGHT,
        padding: "0 16px",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {CARDS.map((card, i) => (
        <MobileCard
          key={card.title}
          card={card}
          i={i}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

// ─── Default Export ────────────────────────────────────────────────────────────

export default function IndustriesCarousel() {
  return (
    // NO overflow-hidden on section — breaks position:sticky on descendants
    <section
      className="bg-surface-container-low border-y border-outline-variant/20 pt-20"
      id="industries-section"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight split-animate-scroll">
          Industries We Serve
        </h2>
        <p className="font-body text-lg text-on-surface-variant mt-6 max-w-2xl mx-auto leading-relaxed split-animate-scroll">
          Architecting precision-engineered solutions across the global economic
          landscape, from industrial manufacturing to digital-first technology
          sectors.
        </p>
      </div>

      {/* Desktop: GSAP auto-scroll ticker */}
      <div className="hidden md:block pb-20">
        <DesktopCarousel />
      </div>

      {/* Mobile: sticky card stack */}
      <div className="block md:hidden pb-4">
        <p className="text-center text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-6 font-label">
          scroll to explore
        </p>
        <MobileStack />
        <div className="h-20" />
      </div>
    </section>
  );
}
