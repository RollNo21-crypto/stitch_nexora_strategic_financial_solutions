import { useEffect, useRef, useState } from "react";

export default function CalendlyModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const widgetRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Initialize widget when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const startTime = Date.now();
      
      const initWidget = () => {
        if (window.Calendly && widgetRef.current) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/gokarnkark09/discovery-call-w',
            parentElement: widgetRef.current,
            prefill: {},
            utm: {}
          });
          
          // Poll for iframe presence and enforce a minimum duration for the premium loader
          const checkIframe = setInterval(() => {
            const hasIframe = widgetRef.current && widgetRef.current.querySelector('iframe');
            const elapsed = Date.now() - startTime;
            
            if (hasIframe && elapsed >= 1200) {
              setLoading(false);
              clearInterval(checkIframe);
            }
          }, 100);
          
          // Fallback safety timeout (longer to accommodate the minimum duration)
          setTimeout(() => {
            setLoading(false);
            clearInterval(checkIframe);
          }, 5000);
        } else {
          setTimeout(initWidget, 50);
        }
      };
      
      initWidget();
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(12,12,12,0.75)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-3xl bg-surface rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex flex-col"
        style={{ height: "min(750px, 92vh)" }}
      >
        {/* Header bar */}
        <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-surface-container-low">
          <div>
            <p className="font-headline font-bold text-primary text-base tracking-tight">
              Book a Discovery Call
            </p>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              30 min · Nexora Financial Advisory
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Calendly container */}
        <div className="flex-grow w-full overflow-hidden relative bg-white">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface animate-pulse">
              <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                SECURELY CONNECTING...
              </p>
            </div>
          )}
          <div
            ref={widgetRef}
            className="w-full h-full"
            style={{ minWidth: "320px", opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}
          />
        </div>
      </div>
    </div>
  );
}
