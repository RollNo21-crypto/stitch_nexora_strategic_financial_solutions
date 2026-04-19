"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CaseStudy() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.toArray(".reveal-section");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body w-full overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed text-on-surface">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="font-headline font-bold text-2xl tracking-tighter text-on-surface">
          Nex<span className="text-primary italic">ora</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs font-label uppercase tracking-widest text-on-surface-variant/70">
            Developer Handover Report
          </span>
          <Link
            href="/"
            className="bg-primary hover:bg-white text-on-primary hover:text-primary px-6 py-2.5 rounded-full font-label text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow hover:shadow-lg hover:-translate-y-0.5"
          >
            Open Live Build
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-48 pb-24 px-6 max-w-5xl mx-auto text-center reveal-section">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <p className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">
            Project Architecture Analysis
          </p>
        </div>
        
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
          The Nexora Digital <br className="hidden md:block" /> Substructure.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-light">
          A definitive developer briefing detailing the enterprise-grade technical stack, the psychological UI/UX frameworks, SEO protocols, and aggressive conversion rate optimization strategies engineered for the Nexora financial platform.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-40 space-y-32">
        
        {/* Section 1: Architecture & Performance */}
        <section className="reveal-section group">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
             <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">memory</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3 tracking-tight">I. Enterprise Engine & Infrastructure</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Rebuilding from the ground up to eradicate the latency and vulnerability of legacy CMS template ecosystems.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">speed</span>
              <h3 className="text-xl font-bold mb-3">React & Next.js 15 (SSR)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                The platform is engineered on <strong>Next.js 15</strong>, leveraging Server-Side Rendering. Unlike traditional apps that force the user's browser to build the page, SSR pre-compiles the interface on the server. This guarantees near-instantaneous First Contentful Paint (FCP) metrics, drastically reducing bounce rates for high-net-worth mobile traffic.
              </p>
            </div>
            
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">public</span>
              <h3 className="text-xl font-bold mb-3">Vercel Global Edge CDN</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                The application circumvents traditional monolithic hosting. It is distributed across <strong>Vercel's global Edge Network</strong>. Whether a client loads the site in New York or London, they are served cached, optimized assets from the nearest physical server node, ensuring zero-latency geographic delivery.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30 md:col-span-2 flex flex-col md:flex-row gap-8 items-start">
              <span className="material-symbols-outlined text-primary text-4xl shrink-0">search_check</span>
              <div>
                <h3 className="text-xl font-bold mb-3">SEO Protocol & Indexing Strategy</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Search engines ruthlessly penalize slow JavaScript single-page applications. By utilizing Next.js static generation, Google's crawlers parse raw, optimized HTML instantly upon pinging the server. We also engineered a highly dynamic <code>sitemap.xml</code> configuration algorithm—meaning every new insight or service endpoint added to the codebase automatically pings Google Search Console for immediate SERP indexing without manual intervention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Aesthetics & UX */}
        <section className="reveal-section group">
           <div className="flex flex-col md:flex-row gap-6 mb-10">
             <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">brush</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3 tracking-tight">II. Psychological Design & UX</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Engineering "Institutional Trust" through meticulous color theory, typography pairing, and visual distillation.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group/card">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-700 group-hover/card:scale-150"></div>
              <h3 className="text-xl font-bold mb-4 relative z-10">Color Theory: The "Wealth Preservation" Palette</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8 relative z-10 max-w-2xl">
                B2B financial advisory requires the projection of immense stability. We rejected trend-heavy vibrant gradients, anchoring the foundational theme in an ultra-premium dark mode.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="p-4 rounded-xl bg-[#00193c] border border-white/10 flex flex-col items-center justify-center aspect-square shadow-inner gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00193c] shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
                  <span className="text-xs font-label uppercase tracking-widest text-white/70">Deep Navy</span>
                  <span className="text-[10px] text-white/40">#00193C</span>
                </div>
                <div className="p-4 rounded-xl bg-[#98a4a5] border border-white/10 flex flex-col items-center justify-center aspect-square shadow-inner gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#98a4a5] shadow-[0_0_15px_rgba(0,0,0,0.2)]"></div>
                  <span className="text-xs font-label uppercase tracking-widest text-black/70">Slate Dust</span>
                  <span className="text-[10px] text-black/40">#98A4A5</span>
                </div>
                <div className="p-4 rounded-xl bg-[#1a2b3c] border border-white/10 flex flex-col items-center justify-center aspect-square shadow-inner gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1a2b3c] shadow-[0_0_15px_rgba(0,0,0,0.5)]"></div>
                  <span className="text-xs font-label uppercase tracking-widest text-white/70">Onyx Blue</span>
                  <span className="text-[10px] text-white/40">#1A2B3C</span>
                </div>
                <div className="p-4 rounded-xl bg-[#ffffff] border border-white/10 flex flex-col items-center justify-center aspect-square shadow-inner gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffffff] shadow-[0_0_15px_rgba(0,0,0,0.1)]"></div>
                  <span className="text-xs font-label uppercase tracking-widest text-black/70">Pearl White</span>
                  <span className="text-[10px] text-black/40">#FFFFFF</span>
                </div>
              </div>
            </div>

             <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow duration-500">
              <h3 className="text-xl font-bold mb-4">Editorial Typography Pairing</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Typography dictates how data is digested. We implemented a sophisticated dual-font strategy:
              </p>
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-surface border border-outline-variant/20 rounded-2xl">
                  <p className="font-headline text-3xl font-bold text-black mb-2">Noto Serif (Headlines)</p>
                  <p className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Traditional • Authoritative • Prestigious</p>
                  <p className="mt-4 text-on-surface-variant/80 text-sm">Forces the reader to slow down and assign high intellectual weight to section titles and core value propositions.</p>
                </div>
                <div className="p-6 bg-surface border border-outline-variant/20 rounded-2xl">
                  <p className="font-body text-3xl font-medium text-black mb-2">Manrope (Body / Data)</p>
                  <p className="text-sm text-primary uppercase tracking-widest font-bold">Geometric • Legible • Modern</p>
                  <p className="mt-4 text-on-surface-variant/80 text-sm">Designed specifically for aggressive readability on high-density device screens. Prevents eye-fatigue when parsing dense financial paragraphs.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-shadow duration-500">
              <h3 className="text-xl font-bold mb-4">Visual Distillation (Removing the Noise)</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Cheap designs rely on "more." Premium designs rely on "less." We aggressively stripped away arbitrary category pills, generic percentage statistics, and superfluous divider lines. By utilizing negative whitespace as a structural element, we force the user's retina exactly where we want it: on the copywriting and the CTA buttons. This "Apple-esque" minimalism commands a higher perceived brand valuation.
              </p>
            </div>

            <div className="bg-surface-container-low border border-primary/20 rounded-3xl p-8 md:p-10 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <h3 className="text-xl font-bold mb-4">Architected Strictly From Scratch</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Before writing a single line of React code, the entire User Interface and User Experience was blueprinted from scratch. We did not rely on generic, pre-defined templates or standard UI kits. Every layout decision was custom-tailored to align flawlessly with the client's brand identity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://stitch.withgoogle.com/projects/6675819724976788688" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-outline-variant/30 rounded-lg text-sm font-label uppercase tracking-widest text-on-surface hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">design_services</span>
                  Project Blueprint
                </a>
                <a 
                  href="https://stitch.withgoogle.com/preview/6675819724976788688?node-id=9aeee4265d9443a8adb0da65b3fd6221" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg text-sm font-label uppercase tracking-widest hover:bg-primary-fixed-dim transition-all shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-lg">web</span>
                  Interactive Prototype
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Animations */}
        <section className="reveal-section group">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
             <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">animation</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3 tracking-tight">III. Kinetic High-Fidelity Interactivity</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Utilizing mathematics and scroll-triggers to create calculate, tactile motion that enhances severity rather than diminishing it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30 flex flex-col h-full">
              <div className="mb-6 py-2 px-4 inline-flex rounded-lg bg-white/5 border border-white/10 w-max text-xs font-mono text-primary">import gsap from "gsap"</div>
              <h3 className="text-2xl font-bold mb-4">GSAP Desktop Engine</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                A standard service grid forces a user to actively click through pages to see what you offer. We eliminated user-fatigue by building a custom <strong>GSAP Infinite Ticker</strong> for the "Industries We Serve" component. 
                <br /><br />
                This mathematics-driven carousel runs at 60 FPS, automatically scrolling your entire cross-industry expertise across the user's peripheral vision. It ensures maximum data exposure automatically. Furthermore, every component explicitly monitors scroll-depth to calculate elegant fade-up reveals, ensuring the site "builds itself" as the user explores.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30 flex flex-col h-full">
               <div className="mb-6 py-2 px-4 inline-flex rounded-lg bg-white/5 border border-white/10 w-max text-xs font-mono text-primary">import motion from "framer-motion"</div>
              <h3 className="text-2xl font-bold mb-4">Framer Motion Mobile Stack</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                The GSAP ticker is brilliant on desktop, but horizontal scrolling metrics drop radically on mobile browsers. Users hate swiping sideways.
                <br /><br />
                To solve this, we engaged <code>framer-motion</code> and custom CSS to deploy an Apple-caliber <strong>"Sticky Card Stack"</strong> for mobile viewports only. As the user performs a standard vertical scroll, each industry sector locks into place at the top of the screen and subsequent cards gracefully scale down and overlap the previous ones, mimicking physical index cards shifting on a desk. It is a wildly engaging UX that keeps thumbs scrolling down toward the final CTA.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Conversion & Lead Gen */}
        <section className="reveal-section group">
          <div className="flex flex-col md:flex-row gap-6 mb-10">
             <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">filter_alt</span>
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3 tracking-tight">IV. CRO (Conversion Rate Optimization)</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                Traffic holds zero value without a mathematical mechanism to capture and convert it.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[300px]">calendar_month</span>
            </div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">The Frictionless Funnel</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Legacy sites force users to click away to an isolated "Contact Us" sub-page to fill out a 15-field form. By the time they get there, intent has dropped by 60%.
                </p>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  We engineered a zero-friction funnel. Every major section boundary (Hero, Service Array, Footer) includes an aggressive, primary-colored CTA button. More importantly, we injected glassmorphic "Schedule Consultation" triggers directly into the individual industry cards.
                </p>
              </div>
              
              <div className="space-y-6">
                 <div className="p-6 bg-surface border border-outline-variant/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-black mb-2">Native Calendly Integration</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Clicking a CTA does not redirect the user. Instead, it triggers a React state-driven Modal that blurs the background (`backdrop-blur-md`) and immutably locks the scrollbar hook. The Calendly widget paints directly in the foreground. High-value prospects can view real-time availability and lock in a discovery call without ever leaving the psychological context of the sales pitch.
                  </p>
                </div>
                <div className="p-6 bg-surface border border-outline-variant/20 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-[#25D366]"></div>
                  <h4 className="text-lg font-bold text-black mb-2">WhatsApp Quick-Launch Floater</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    B2B communication is shifting rapidly to instant messaging. A dynamic, globally persistent WhatsApp widget monitors the user's scroll depth and gracefully slides into the viewport. It implements a CSS heartbeat animation to capture peripheral attention, offering a one-tap pipeline to your sales team's phone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature */}
        <div className="pt-24 pb-12 border-t border-outline-variant/20 text-center reveal-section">
          <p className="font-label text-sm uppercase tracking-[0.3em] text-on-surface-variant/70 mb-6">
            Architected, Designed, & Engineered By
          </p>
          <a 
            href="https://krishna77606.github.io/portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block font-headline text-3xl md:text-5xl font-black text-primary tracking-tighter transition-colors duration-500 relative group"
          >
            Krishnamurthy M Gokarnkar
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </a>
          <p className="text-lg text-on-surface-variant mt-6 italic font-light tracking-wide max-w-xl mx-auto">
            "Engineering the digital prestige and technical infrastructure for modern financial enterprises."
          </p>
        </div>

      </div>
    </div>
  );
}
