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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <div className="min-h-screen bg-surface font-body w-full overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-outline-variant/30 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <Link href="/" className="font-headline font-bold text-2xl tracking-tighter text-on-surface">
          Nex<span className="text-primary italic">ora</span>
        </Link>
        <Link
          href="/"
          className="bg-primary/10 text-primary px-5 py-2 rounded-full font-label text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-colors duration-300"
        >
          View Live Site
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 px-6 max-w-4xl mx-auto text-center reveal-section">
        <p className="text-primary font-label text-sm uppercase tracking-[0.2em] font-bold mb-6">
          Project Handover & Executive Analysis
        </p>
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface mb-8 leading-tight">
          Strategic Digital <br className="hidden md:block" /> Transformation
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          A comprehensive deep-dive into the custom technical architecture, psychological UX design methodology, and aggressive conversion rate optimization strategies deployed for the new Nexora web platform.
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-40 space-y-20 md:space-y-24">
        
        {/* Section 1: Architecture */}
        <section className="reveal-section group">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <span className="material-symbols-outlined text-xl md:text-2xl">memory</span>
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">1. Enterprise Engine Architecture</h2>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h3 className="text-lg md:text-xl font-bold mb-4">Powered by Next.js 15 & React</h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
              To achieve uncompromising performance, the platform was engineered entirely around <strong>Next.js 15</strong> with Server-Side Rendering (SSR). Moving away from slow, bloated visual builders and heavily templated CMS legacy software (like WordPress), this custom architecture guarantees top-tier Core Web Vitals, resulting in maximum Google search rankings and impregnable security.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">speed</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>Vercel Edge Delivery:</strong> The site infrastructure is decentralized. It is continuously deployed across Vercel's global CDN, serving cached content entirely from the edge node closest to the client's geographical location for near-instant rendering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">travel_explore</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>SEO & Discoverability Protocol:</strong> By writing code that pre-renders static assets natively, search engines parse exact HTML instantly. Furthermore, a dynamic <code>sitemap.xml</code> engine was implemented to automate Google crawling indexing effortlessly across any updates.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Aesthetics */}
        <section className="reveal-section group">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <span className="material-symbols-outlined text-xl md:text-2xl">account_balance</span>
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">2. Institutional Aesthetic Design</h2>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h3 className="text-lg md:text-xl font-bold mb-4">Commanding Authority Through Visual Trust</h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
              When dealing with B2B strategy and financial advisory, the immediate visual impression dictates credibility. We deliberately rejected flashy trend-based layouts in favor of an institutional, authoritative design language that mirrors top-tier blue-chip consulting firms.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">palette</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>Strategic Color Psychology:</strong> Anchored the brand in a deep Navy, Slate, and Pearl palette. Dark, desaturated foundational tones project inherent stability, wealth preservation, and uncompromising authority.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">text_fields</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>High-Contrast Typography:</strong> Font pairing was surgically addressed. Implementing a sophisticated serif typeface for headlines (Noto Serif) exudes tradition and prestige, while leveraging a sans-serif (Manrope) for body copy provides data legibility.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">vacuum</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>Visual Distillation:</strong> Stripped away distracting UI elements, arbitrary category pills, and generic statistics, forcing the user's attention exclusively onto your core value propositions and actionable CTAs.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Animations */}
        <section className="reveal-section group">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <span className="material-symbols-outlined text-xl md:text-2xl">animation</span>
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">3. High-Fidelity Interaction Design</h2>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h3 className="text-lg md:text-xl font-bold mb-4">Dynamic But Calculated Movement</h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
              A static website feels outdated; an overly animated one feels cheap. We engaged premium Javascript animation engines to introduce calculated, tactile motion that enhances—rather than detracts from—the professional severity of the content.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">view_carousel</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>GSAP Continuous Ticker (Desktop Engine):</strong> Rebuilt the standard service grid into an infinite, auto-scrolling horizontal carousel. This highly complex GSAP orchestration guarantees that clients view your entire range of cross-industry expertise passively, requiring zero user-input or clicking fatigue.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-[2px] text-lg md:text-xl shrink-0">layers</span>
                <span className="text-on-surface-variant text-sm md:text-base"><strong>Framer Motion Sticky Stack (Mobile Engine):</strong> Horizontal scrolling metrics drop radically on mobile device browsers. To remedy this, we deployed a highly advanced, Apple-caliber "sticky card stack". As mobile prospects scroll downwards, each industry sector stacks and perfectly overlaps the last, mimicking physical index cards.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Lead Gen */}
        <section className="reveal-section group">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary shrink-0">
              <span className="material-symbols-outlined text-xl md:text-2xl">trending_up</span>
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">4. Conversion Rate Optimization (CRO)</h2>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-500">
            <h3 className="text-lg md:text-xl font-bold mb-4">Frictionless Lead Generation Engine</h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Traffic is irrelevant without a mechanism to capture it. We completely re-engineered the user acquisition funnel to be as instantaneous and frictionless as possible. Every touchpoint on the interface has been optimized to push the client toward advisory engagement.
              <br /><br />
              Instead of forcing users to navigate to an isolated "Contact Us" sub-page and lose interest, all primary CTA buttons (including embedded 'Schedule Consultation' triggers directly inside individual service cards) launch a natively integrated, blurred-background <strong>Calendly Modal</strong>. This allows high-value prospects to view your availability and lock in a discovery call without ever leaving the psychological context of the pitch. Additionally, a globally persistent <strong>WhatsApp Quick-Launch widget</strong> ensures mobile users can reach your team in a single tap.
            </p>
          </div>
        </section>

        {/* Signature */}
        <div className="pt-16 pb-8 border-t border-outline-variant/20 text-center reveal-section">
          <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">
            Architected & Engineered By
          </p>
          <a 
            href="https://krishna77606.github.io/portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block font-headline text-xl md:text-2xl font-bold text-primary mt-4 tracking-tight hover:text-white transition-colors duration-300 relative group"
          >
            Krishnamurthy M Gokarnkar
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <p className="text-sm text-on-surface-variant mt-3 italic">
            Building the digital infrastructure for modern enterprises.
          </p>
        </div>

      </div>
    </div>
  );
}
