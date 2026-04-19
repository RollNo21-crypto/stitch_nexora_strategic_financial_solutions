"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IndustriesCarousel from "./components/IndustriesCarousel";
import CalendlyModal from "./components/CalendlyModal";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      // Prevent animations breaking in React StrictMode due to double execution.
      let refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

      // Utility to split text into words while preserving HTML elements
      function splitTextNodesToWords(element) {
        if (element.classList.contains("split-done")) {
          return element.querySelectorAll(".word");
        }

        function processNode(node) {
          if (node.nodeType === 3) { // TEXT_NODE
            const text = node.textContent;
            if (!text.trim()) return node;

            const wrapper = document.createDocumentFragment();
            const tokens = text.split(/(\s+)/);
            tokens.forEach((token) => {
              if (!token) return;
              if (/\s+/.test(token)) {
                wrapper.appendChild(document.createTextNode(token));
              } else {
                const span = document.createElement("span");
                span.className = "word inline-block";
                span.textContent = token;
                wrapper.appendChild(span);
              }
            });
            return wrapper;
          } else if (node.nodeType === 1) { // ELEMENT_NODE
            Array.from(node.childNodes).forEach((child) => {
              const newChild = processNode(child);
              if (newChild !== child) {
                node.replaceChild(newChild, child);
              }
            });
          }
          return node;
        }

        Array.from(element.childNodes).forEach((child) => {
          const newChild = processNode(child);
          if (newChild !== child) {
            element.replaceChild(newChild, child);
          }
        });

        element.classList.add("split-done");
        return element.querySelectorAll(".word");
      }

      // 1. Maintain Experience Banner Animation
      const splitElements = gsap.utils.toArray(".split-animate");
      splitElements.forEach((el) => {
        const chars = splitTextNodesToWords(el);
        gsap.fromTo(
          chars,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el.closest("section") || el,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      });

      // 2. Maintain Practice Section Slide Up
      const practiceSection = document.getElementById("practice-section");
      if (practiceSection) {
        gsap.fromTo(
          practiceSection,
          { y: 150, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: practiceSection,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // 3. Industries section is handled by IndustriesCarousel component

      // 4. Integrating Insight: Superimpose + Scroll Animation
      const integratingSection = document.getElementById("integrating-section");
      if (integratingSection) {
        gsap.fromTo(
          integratingSection,
          { y: 150, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: integratingSection,
              start: "top bottom",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Letter-by-letter scroll
      const scrollTextElements = gsap.utils.toArray(".split-animate-scroll");
      scrollTextElements.forEach((el) => {
        const chars = splitTextNodesToWords(el);
        gsap.fromTo(
          chars,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // 5. Footer Animations
      const footer = document.querySelector("footer");
      const footerCols = gsap.utils.toArray(".footer-cols > div");
      const nexoraHuge = document.querySelector(".nexora-huge");

      if (footer && footerCols.length > 0) {
        gsap.from(footerCols, {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
          },
        });
      }

      if (nexoraHuge && footer) {
        gsap.fromTo(
          nexoraHuge,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 75%",
            },
          }
        );
      }

      return () => clearTimeout(refreshTimer);
    },
    { scope: container }
  );

  return (
    <>
      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
      <main ref={container}>
        {/* TopNavBar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl shadow-sm border border-outline-variant/30 transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-center px-4 py-3 md:px-8 md:py-4">
            <div className="text-lg md:text-xl font-bold tracking-[0.15em] md:tracking-[0.2em] text-primary font-headline uppercase">
              NEXORA
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a
                className="text-xs font-bold text-on-surface hover:text-primary transition-colors tracking-widest uppercase"
                href="#"
              >
                SERVICES
              </a>
              <a
                className="text-xs font-bold text-on-surface hover:text-primary transition-colors tracking-widest uppercase"
                href="#"
              >
                INDUSTRIES
              </a>
              <a
                className="text-xs font-bold text-on-surface hover:text-primary transition-colors tracking-widest uppercase"
                href="#"
              >
                ABOUT
              </a>
            </div>
            <div className="flex items-center">
              <a
                className="bg-primary text-on-primary px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold font-label tracking-wider md:tracking-widest uppercase hover:bg-primary-fixed-dim hover:text-primary transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                onClick={() => setCalendlyOpen(true)}
              >
                <span className="sm:hidden">BOOK A CALL</span>
                <span className="hidden sm:inline">BOOK A CALL WITH US</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-32 md:pt-40 md:pb-40 px-6 relative max-w-7xl mx-auto min-h-[90vh] lg:min-h-0 flex flex-col justify-center">

          {/* Mobile Background Image (Hidden on Desktop) */}
          <div className="absolute inset-0 lg:hidden z-0 overflow-hidden rounded-b-[2rem] shadow-sm">
            <img
              alt="Abstract upward view of modern corporate architecture"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzRlx8gQO1k19Ty0TgfhCVaGA1jOsK0UlPrCGeqZtE4zItsOHqpE-G6zRafSFdhjZ31aa6SeyEy93yMRspauawLJChVU2DGYExJ3-VfnQyprdoy0K33BQImgGzPleMAukP9nVLwYusGj0wodZw1ZJStktS54hDn8UI7gY3HpnP_CV0Kc0LWN-vQ3jpnkUhjIWF-6qkW5uEhSdF----jHMtUv_VwDN7o2kgg9srwTHyTPwQeyvZyzRcNO3pHL5RGux7aNwAiM8tsDg"
            />
            {/* Frosted readability overlay */}
            <div className="absolute inset-0 bg-surface/85 md:bg-surface/75 backdrop-blur-[4px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
            <div className="lg:col-span-6 relative z-10 text-center lg:text-left">
              <h1 className="font-headline text-5xl md:text-7xl lg:text-[5rem] font-bold text-primary tracking-tight leading-[1.1]">
                Clarity in Numbers.
                <br />
                Confidence in Decisions.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto lg:mx-0 font-body leading-relaxed">
                We provide precision-engineered advisory and rigorous reporting for the global enterprise.
                Architecting the structural integrity behind every strategic move.
              </p>
              <div className="mt-12 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
                <button
                  onClick={() => setCalendlyOpen(true)}
                  className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label font-bold tracking-[0.15em] uppercase hover:bg-primary-fixed-dim transition-all duration-300 w-full lg:w-auto shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                >
                  Book A Discovery Call
                </button>
              </div>
            </div>

            {/* Desktop Side Image (Hidden on Mobile) */}
            <div className="hidden lg:block lg:col-span-6 relative">
              <div className="aspect-[4/5] rounded-DEFAULT bg-surface-container-low overflow-hidden relative shadow-[0_24px_40px_-12px_rgba(25,28,30,0.15)] group">
                <img
                  alt="Abstract upward view of modern corporate architecture with glass and steel reflecting clear skies"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzRlx8gQO1k19Ty0TgfhCVaGA1jOsK0UlPrCGeqZtE4zItsOHqpE-G6zRafSFdhjZ31aa6SeyEy93yMRspauawLJChVU2DGYExJ3-VfnQyprdoy0K33BQImgGzPleMAukP9nVLwYusGj0wodZw1ZJStktS54hDn8UI7gY3HpnP_CV0Kc0LWN-vQ3jpnkUhjIWF-6qkW5uEhSdF----jHMtUv_VwDN7o2kgg9srwTHyTPwQeyvZyzRcNO3pHL5RGux7aNwAiM8tsDg"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/40 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-6 right-6">
            <div className="border-t border-outline-variant/30 mb-6 max-w-7xl mx-auto"></div>
            <button
              onClick={() => document.getElementById("experience-section")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full flex justify-between items-center text-on-surface-variant max-w-7xl mx-auto group cursor-pointer"
            >
              <span className="font-body text-[10px] uppercase tracking-[0.15em] font-semibold group-hover:text-primary transition-colors">
                Scroll to Explore
              </span>
              <span className="material-symbols-outlined text-lg animate-bounce group-hover:text-primary transition-colors">
                south
              </span>
            </button>
          </div>
        </section>

        {/* Experience Banner */}
        <section
          className="py-24 bg-surface-container-low relative border-y border-outline-variant/20"
          id="experience-section"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold tracking-tight split-animate">
              Experience in Practice
            </h2>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant mt-6 max-w-3xl mx-auto leading-relaxed split-animate">
              Over <span className="font-headline font-bold text-primary">15 years</span> of
              professional excellence, providing structural integrity to the
              financial frameworks of industry leaders.
            </p>
          </div>
        </section>

        {/* Areas of Practice */}
        <section
          className="py-32 px-6 max-w-7xl mx-auto relative z-10 bg-surface"
          id="practice-section"
        >
          <div className="mb-20 text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Areas of Practice
            </h2>
            <p className="font-body text-lg text-on-surface-variant mt-4 max-w-xl leading-relaxed mx-auto">
              Precision-engineered solutions across five core disciplines,
              designed for absolute clarity and structural integrity.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(180px,auto)]"
            id="bento-grid-container"
          >
            {/* Block 1: Accounting */}
            <div className="md:col-span-12 lg:col-span-8 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
              <div className="h-48 md:h-64 relative overflow-hidden">
                <img
                  alt="Accounting & Reporting"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl35xu9xFH6GAmLh0jaoC_bQO6tluvQ-1RyV2maVVU1hdY9e2S8Z21AbdfNs7PzBLcr1K5JfwcSuEchgbRwpe2rAtJSA2u5eFFSVFQbeOpXRSkOAeX8Usi59KYsosBNDZXK4WrK5KMh2Eh46OHazAzZo7hVXQ5aRkvvpWwaJPPau8mlN5CyRyYlsV9nhqQ3-laWaF__kJvf0DfHe2UHXOhJaHp7liKYuTMLTyUhoO2rJESHFN2eWfYhOzTPW6-_3g3z4dYvF1_7u4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    account_balance
                  </span>
                  <div className="h-[2px] w-8 bg-on-primary/30"></div>
                </div>
                <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                  Accounting & Reporting
                </h3>
                <p className="font-body text-on-primary/80 text-sm md:text-base leading-relaxed flex-grow max-w-2xl">
                  Establishing rigorous, transparent financial records. We
                  architect reporting systems that provide absolute clarity,
                  ensuring compliance and actionable insights for stakeholders
                  through precision data modeling.
                </p>

              </div>
            </div>
            {/* Block 2: Audit */}
            <div className="md:col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
              <div className="h-48 relative overflow-hidden">
                <img
                  alt="Audit & Assurance"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT6vmpEZ2oolLxX6N5PHRfRYFcoSm-FvsrcpFR14L3ESkRkejYMR0bdC-yJoc281-JVrokjt4REXVGoU0M5uPf0PWjzIreBhP2sUyz9KPlHiOAAEL_UjWkAAs-UaPa6Ba5ne72ULAzK6Zh8g_47ORO6bhOLDbYQnkqs8CFE42LxDyVrecwhp2ZMuVtF02KWxL4I3uZhwqlZEgB6T9WmgwFJUn6dV8khFaqev90s7NS5Yk30OqmT_R9qIO9rPPTpMNAMI7u174uH7A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    verified_user
                  </span>
                  <div className="h-[2px] w-8 bg-on-primary/30"></div>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">
                  Audit & Assurance
                </h3>
                <p className="font-body text-on-primary/80 text-sm leading-relaxed flex-grow">
                  Independent, unyielding verification of your financial posture,
                  building unshakable trust with investors and regulators.
                </p>

              </div>
            </div>
            {/* Block 3: Taxation */}
            <div className="md:col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
              <div className="h-48 relative overflow-hidden">
                <img
                  alt="Taxation planning and compliance"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1HnKLyFk58J_eFu9Lc6XCDFiXuibloMhEnw03D7fF1Vy4FTZsZBcqNjU9G9h4YarOkWbCnWA_d-w4Aj5M4C2A9jwUEX4THLjo0Xt_PRLZoaruAqhQk_aKouQiA1sXSMpIxvOgmvefHj2P8Co7Ow8FU58SkMZ8-G10JE-qUmaBBuDi6USLit1pbqNpUudHsb39QHgpf3YoC9YDTlo2h1_PPUA-L4MJfVo5SkWDNgTzGCM9yV3IyNHs6jYXUn86cqoOGR6LdtJmHk4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    receipt_long
                  </span>
                  <div className="h-[2px] w-8 bg-on-primary/30"></div>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4 text-white">
                  Taxation
                </h3>
                <p className="font-body text-on-primary/80 text-sm leading-relaxed flex-grow">
                  Strategic corporate and individual planning combined with global
                  compliance. Navigating direct tax structures and cross-border transactions.
                </p>

              </div>
            </div>
            {/* Block 4: Financial Advisory */}
            <div className="md:col-span-12 lg:col-span-8 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
              <div className="h-48 md:h-64 relative overflow-hidden">
                <img
                  alt="Professional financial advisory setting"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9gwQ9yua1-TjEEsYFw56ItRnAdE0hgUqVMRWn0wW2RX1ShdlsPYlAAPy7GBHV4ZFqYTAcufAsLMkYARoQCs8krdTNFXpzWbt8ebUIbTc--3aWlt52_J3QmgRMUBz_0wmKEM8D1dQ-aCfyhAG015VagAgwLyDlg9f7oHofpe8ao4Im_JgmPpPKR-OEx3rsZftvSpQ1y_acT3jVyNRCu767eW_QJ-dVbAK9Q5vVsBZYJc7MB1tdtcjiXapjSzAGQiNpXM9C_0lns3c"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    trending_up
                  </span>
                  <div className="h-[2px] w-8 bg-on-primary/30"></div>
                </div>
                <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-white">
                  Financial Advisory
                </h3>
                <p className="font-body text-on-primary/80 text-sm md:text-base leading-relaxed flex-grow max-w-2xl">
                  From M&A structuring to capital allocation, our advisory
                  services act as the blueprint for sustainable corporate growth.
                </p>

              </div>
            </div>
          </div>
        </section>

        <IndustriesCarousel />

        {/* Our Approach (Asymmetrical Image Text) */}
        <section
          className="py-40 px-6 bg-surface relative"
          id="integrating-section"
        >
          {/* Section header */}
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-2xl mx-auto split-animate-scroll">
              The Nexora Approach
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
            <div className="md:col-span-5 md:col-start-2 order-2 md:order-1 relative group">
              <div className="aspect-[3/4] bg-surface-container-highest rounded-lg overflow-hidden shadow-[0_32px_60px_-16px_rgba(25,28,30,0.15)]">
                <img
                  alt="Two corporate professionals in a modern glass office"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1HnKLyFk58J_eFu9Lc6XCDFiXuibloMhEnw03D7fF1Vy4FTZsZBcqNjU9G9h4YarOkWbCnWA_d-w4Aj5M4C2A9jwUEX4THLjo0Xt_PRLZoaruAqhQk_aKouQiA1sXSMpIxvOgmvefHj2P8Co7Ow8FU58SkMZ8-G10JE-qUmaBBuDi6USLit1pbqNpUudHsb39QHgpf3YoC9YDTlo2h1_PPUA-L4MJfVo5SkWDNgTzGCM9yV3IyNHs6jYXUn86cqoOGR6LdtJmHk4"
                />
              </div>
            </div>
            <div className="md:col-span-6 order-1 md:order-2">
              <h3
                className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-[1.15] tracking-tight split-animate-scroll"
                id="approach-headline"
              >
                Integrating Insight with Execution
              </h3>
              <p
                className="font-body text-lg text-on-surface-variant mt-10 leading-relaxed split-animate-scroll"
                id="approach-paragraph"
              >
                Our approach moves beyond basic compliance. We view your financial
                data as the structural foundation of your enterprise. By
                integrating deep advisory insight with practical, flawless
                execution, we ensure that every ledger, audit, and tax strategy
                directly supports your overarching architectural vision for
                growth.
              </p>
              <div className="mt-14 overflow-hidden">
                <button
                  onClick={() => setCalendlyOpen(true)}
                  className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label font-bold tracking-[0.15em] uppercase hover:bg-primary-fixed-dim transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                >
                  Schedule a Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0c0c0c] text-[#e0e3e5] pt-24 pb-12 font-body selection:bg-surface-variant selection:text-primary overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            {/* Main Footer Content */}
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-20 footer-cols">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                <p className="text-xs font-bold tracking-widest text-white mb-2">QUICK LINKS</p>
                <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Home</a>
                <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#" onClick={(e) => { e.preventDefault(); setCalendlyOpen(true); }}>Schedule A Call</a>
                <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Our Services</a>
                <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Contact Us</a>
              </div>
              
              {/* Spacers - hidden on mobile */}
              <div className="hidden lg:block"></div>
              <div className="hidden lg:block"></div>
              
              {/* Social Links */}
              <div className="flex flex-col md:items-end">
                <p className="text-xs font-bold tracking-widest text-white mb-4 md:mb-6">CONNECT WITH US</p>
                
                {/* Desktop List Mode */}
                <div className="hidden md:flex flex-col space-y-4 items-end">
                  <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Instagram</a>
                  <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Youtube</a>
                  <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Linkedin</a>
                  <a className="text-base text-[#e0e3e5]/70 hover:text-white transition-colors" href="#">Facebook</a>
                </div>

                {/* Mobile Icon Mode */}
                <div className="flex md:hidden items-center gap-6">
                  {/* Instagram icon */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* LinkedIn icon */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {/* Youtube icon */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  {/* Facebook icon */}
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.915 1.782-4.502 4.38-4.502 1.244 0 2.316.092 2.628.134v3.046l-1.802.001c-1.414 0-1.688.672-1.688 1.658v2.174h3.372l-.439 3.403h-2.933v8.74h6.113c.733 0 1.325-.593 1.325-1.325v-21.352c0-.732-.592-1.323-1.325-1.323z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Bottom Branding & Details */}
            <div className="border-t border-white/10 pt-16 flex flex-col items-start w-full footer-bottom">
              <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10">
                {/* Left: Address */}
                <div className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
                  <p className="font-bold text-white mb-2">
                    Nexora Global Headquarters
                  </p>
                  One Financial Plaza, Floor 42
                  <br />
                  Financial District, New York, NY 10004
                </div>

                {/* Right: Legal & Copyright Stack */}
                <div className="flex flex-col items-start md:items-end gap-6 text-on-surface-variant">
                  <a
                    className="text-xs uppercase tracking-widest font-semibold hover:text-white transition-colors"
                    href="#"
                  >
                    Terms & Policies
                  </a>
                  <div className="text-sm md:text-right leading-relaxed">
                    <p>Copyright © 2024 Nexora Financial Advisory.</p>
                    <p>All rights reserved.</p>
                  </div>
                </div>
              </div>
              {/* Massive Architectural Brand Name */}
              <div className="w-full text-center">
                <h2
                  className="text-[12vw] md:text-[15vw] font-black tracking-[-0.05em] leading-[0.8] uppercase select-none pointer-events-none font-headline text-white nexora-huge"
                >
                  NEXORA
                </h2>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
