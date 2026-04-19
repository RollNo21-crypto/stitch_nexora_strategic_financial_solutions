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
      <section className="pt-48 pb-32 md:pt-64 md:pb-40 px-6 relative max-w-7xl mx-auto min-h-[90vh] lg:min-h-0 flex flex-col justify-center">

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
              We deliver high-end financial advisory and rigorous reporting
              tailored for complex enterprises. Our architectural approach to
              data ensures structural integrity in every strategic move you
              make.
            </p>
            <div className="mt-12 flex flex-col lg:flex-row items-center justify-center lg:justify-start space-y-6 lg:space-y-0 lg:space-x-8">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label font-semibold tracking-wide hover:bg-primary-fixed-dim transition-colors duration-300 w-full lg:w-auto">
                Explore Our Services
              </button>
              <a
                className="text-primary font-label font-semibold flex items-center justify-center hover:text-on-primary-fixed-variant transition-colors group w-full lg:w-auto cursor-pointer"
                onClick={() => setCalendlyOpen(true)}
              >
                Book A Call With Us
                <span className="material-symbols-outlined ml-2 text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
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
              <div className="mt-8">
                <button className="w-max px-8 py-3 bg-on-primary text-primary font-label font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-primary-fixed-dim hover:text-on-primary transition-all rounded-lg">
                  Detailed Disclosure
                </button>
              </div>
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
              <div className="mt-8">
                <button className="w-full py-3 bg-on-primary text-primary font-label font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-primary-fixed-dim hover:text-on-primary transition-all rounded-lg">
                  Compliance First
                </button>
              </div>
            </div>
          </div>
          {/* Block 3: Taxation */}
          <div className="md:col-span-12 lg:col-span-8 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
            <div className="h-48 md:h-64 relative overflow-hidden">
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
              <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                Taxation
              </h3>
              <p className="font-body text-on-primary/80 text-sm md:text-base leading-relaxed flex-grow max-w-2xl">
                Strategic corporate and individual planning combined with global
                compliance. Navigating direct tax structures and indirect
                obligations like GST, VAT, and cross-border transactions.
              </p>
              <div className="mt-8">
                <button className="w-max px-8 py-3 bg-on-primary text-primary font-label font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-primary-fixed-dim hover:text-on-primary transition-all rounded-lg">
                  Explore Tax Solutions
                </button>
              </div>
            </div>
          </div>
          {/* Block 4: Financial Advisory */}
          <div className="md:col-span-12 lg:col-span-4 bg-primary text-on-primary rounded-xl shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group min-h-[400px]">
            <div className="h-48 relative overflow-hidden">
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
              <h3 className="font-headline text-2xl font-bold mb-4">
                Financial Advisory
              </h3>
              <p className="font-body text-on-primary/80 text-sm leading-relaxed flex-grow">
                From M&A structuring to capital allocation, our advisory
                services act as the blueprint for sustainable corporate growth.
              </p>
              <div className="mt-8">
                <button className="w-full py-3 bg-on-primary text-primary font-label font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-primary-fixed-dim hover:text-on-primary transition-all rounded-lg">
                  Consult Our Experts
                </button>
              </div>
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
            <div className="mt-14 reveal-item">
              <button
                onClick={() => setCalendlyOpen(true)}
                className="bg-surface-container-low text-primary px-8 py-4 rounded-lg border border-outline-variant/30 font-label font-semibold hover:bg-surface-container-highest transition-colors duration-300">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 footer-cols">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Home
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Schedule A Call
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Our Services
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Contact Us
              </a>
            </div>
            {/* Spacer/Empty Columns */}
            <div></div>
            <div></div>
            {/* Social Links */}
            <div className="flex flex-col space-y-4 md:items-end">
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Instagram
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Youtube
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Linkedin
              </a>
              <a
                className="text-lg font-medium hover:text-white transition-colors"
                href="#"
              >
                Facebook
              </a>
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
